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
        private static readonly DateTime SampleDate = new DateTime();
        
        private const decimal SampleAmount = 1.23m;
        private const string SampleCategory = "sample_category";
        private const string SampleDescription = "sample description";
        private const string SampleIdStringified = "d3524543d93f446081d1acad";
        private const string SampleUserId = "sample_user_id";

        private readonly ObjectId _nullObjectId = new ObjectId();


        private readonly Expense _mappedExpenseSample = new Expense
        {
            Id = new ObjectId(),
            Amount = SampleAmount,
            Date = SampleDate,
            Category = SampleCategory,
            Description = SampleDescription,
            OwnerUserId = SampleUserId
        };

        private readonly ExpenseDto _expenseDtoSample = new ExpenseDto
        {
            Id = SampleIdStringified,
            Amount = SampleAmount,
            Date = SampleDate,
            Category = SampleCategory,
            Description = SampleDescription
        };

        private readonly Expense _expenseSample = new Expense
        {
            Id = new ObjectId(SampleIdStringified),
            Amount = SampleAmount,
            Date = SampleDate,
            Category = SampleCategory,
            Description = SampleDescription
        };

        private readonly ExpenseDto _mappedExpenseDtoSample = new ExpenseDto
        {
            Id = SampleIdStringified,
            Amount = SampleAmount,
            Date = SampleDate,
            Category = SampleCategory,
            Description = SampleDescription
        };

        [Test]
        public void Should_NotMapId_When_MappedFromExpenseDto()
        {
            var actualExpense = Mapper.Map(_expenseDtoSample, SampleUserId);
            
            Assert.AreEqual(actualExpense.Id, _nullObjectId);
        }

        [Test]
        public void Should_MapToExpenseCorrectly_When_MappedFromExpenseDto()
        {
            var actualExpense = Mapper.Map(_expenseDtoSample, SampleUserId);
            
            Assert.AreEqual(_mappedExpenseSample.Amount, actualExpense.Amount);
            Assert.AreEqual(_mappedExpenseSample.Date, actualExpense.Date);
            Assert.AreEqual(_mappedExpenseSample.Category, actualExpense.Category);
            Assert.AreEqual(_mappedExpenseSample.Description, actualExpense.Description);
        }

        [Test]
        public void Should_MapToExpenseDtoCorrectly_When_MappedFromExpense()
        {
            var actualExpenseDto = Mapper.Map(_expenseSample);
            
            Assert.AreEqual(_mappedExpenseDtoSample.Id, actualExpenseDto.Id);
            Assert.AreEqual(_mappedExpenseDtoSample.Amount, actualExpenseDto.Amount);
            Assert.AreEqual(_mappedExpenseDtoSample.Date, actualExpenseDto.Date);
            Assert.AreEqual(_mappedExpenseDtoSample.Category, actualExpenseDto.Category);
            Assert.AreEqual(_mappedExpenseDtoSample.Description, actualExpenseDto.Description);
        }

        [Test]
        public void Should_FillOwnerUserIdProperty_When_MappedFromExpenseDto()
        {
            var actualExpense = Mapper.Map(_expenseDtoSample, SampleUserId);
            
            Assert.AreEqual(_mappedExpenseSample.OwnerUserId, SampleUserId);
        }
    }
}