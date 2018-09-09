using System;
using MongoDB.Bson;
using NUnit.Framework;
using SlowSlothBudget.Web.Mappers;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Test.Mappers
{
    [TestFixture]
    public class MapperTests
    {
        private static readonly DateTime SampleLocalDate = DateTime.Now;
        private static readonly DateTime SampleUniversalDate = SampleLocalDate.ToUniversalTime();

        private const decimal SampleAmount = 1.23m;
        private const string SampleCategory = "sample_category";
        private const string SampleDescription = "sample description";
        private const string SampleIdStringified = "d3524543d93f446081d1acad";
        private const string SampleUserId = "sample_user_id";

        private readonly ObjectId _nullObjectId = new ObjectId();

        private readonly ExpenseDto _expenseDtoSample = new ExpenseDto
        {
            Id = SampleIdStringified,
            Amount = SampleAmount,
            Date = SampleLocalDate,
            Category = SampleCategory,
            Description = SampleDescription
        };

        private readonly Expense _expenseSample = new Expense
        {
            Id = new ObjectId(SampleIdStringified),
            Amount = SampleAmount,
            Date = SampleUniversalDate,
            Category = SampleCategory,
            Description = SampleDescription
        };

        private readonly ExpenseDto _mappedExpenseDtoSample = new ExpenseDto
        {
            Id = SampleIdStringified,
            Amount = SampleAmount,
            Date = SampleLocalDate,
            Category = SampleCategory,
            Description = SampleDescription
        };

        private readonly Expense _mappedExpenseSample = new Expense
        {
            Id = new ObjectId(),
            Amount = SampleAmount,
            Date = SampleUniversalDate,
            Category = SampleCategory,
            Description = SampleDescription,
            OwnerUserId = SampleUserId
        };

        [Test]
        public void Should_NotMapId_When_MappedFromExpenseDto()
        {
            var expensesMapper = new ExpensesMapper();

            var actualExpense = expensesMapper.Map(_expenseDtoSample, SampleUserId);

            Assert.AreEqual(_nullObjectId, actualExpense.Id);
        }

        [Test]
        public void Should_MapSimplePropertiesToExpenseCorrectly_When_MappedFromExpenseDto()
        {
            var expensesMapper = new ExpensesMapper();

            var actualExpense = expensesMapper.Map(_expenseDtoSample, SampleUserId);

            Assert.AreEqual(_mappedExpenseSample.Amount, actualExpense.Amount);
            Assert.AreEqual(_mappedExpenseSample.Category, actualExpense.Category);
            Assert.AreEqual(_mappedExpenseSample.Description, actualExpense.Description);
        }

        [Test]
        public void Should_MapSimplePropertiesToExpenseDtoCorrectly_When_MappedFromExpense()
        {
            var expensesMapper = new ExpensesMapper();

            var actualExpenseDto = expensesMapper.Map(_expenseSample);

            Assert.AreEqual(_mappedExpenseDtoSample.Id, actualExpenseDto.Id);
            Assert.AreEqual(_mappedExpenseDtoSample.Amount, actualExpenseDto.Amount);
            Assert.AreEqual(_mappedExpenseDtoSample.Category, actualExpenseDto.Category);
            Assert.AreEqual(_mappedExpenseDtoSample.Description, actualExpenseDto.Description);
        }

        [Test]
        public void Should_FillOwnerUserIdProperty_When_MappedFromExpenseDto()
        {
            var expensesMapper = new ExpensesMapper();

            var actualExpense = expensesMapper.Map(_expenseDtoSample, SampleUserId);

            Assert.AreEqual(_mappedExpenseSample.OwnerUserId, actualExpense.OwnerUserId);
        }

        [Test]
        public void Should_MapDateToUniversalTime_When_MappedFromExpenseDto()
        {
            var expensesMapper = new ExpensesMapper();

            var actualExpense = expensesMapper.Map(_expenseDtoSample, SampleUserId);

            Assert.AreEqual(_mappedExpenseSample.Date, actualExpense.Date);
        }

        [Test]
        public void Should_MapDateToLocalTime_When_MappedFromExpense()
        {
            var expensesMapper = new ExpensesMapper();

            var actualExpense = expensesMapper.Map(_expenseSample);

            Assert.AreEqual(_mappedExpenseDtoSample.Date, actualExpense.Date);
        }
    }
}