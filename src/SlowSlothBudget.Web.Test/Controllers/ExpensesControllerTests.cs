using System;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Moq;
using NUnit.Framework;
using SlowSlothBudget.Web.Controllers;
using SlowSlothBudget.Web.DAL;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Test.Controllers
{
    [TestFixture]
    public class ExpensesControllerTests
    {
        private static readonly DateTime SampleLocalDate = DateTime.Now;
        private static readonly DateTime SampleUniversalDate = SampleLocalDate.ToUniversalTime();

        private const string SampleNameIdentifier = "sample_name_identified";
        private const decimal SampleAmount = 1.23m;
        private const string SampleCategory = "sample_category";
        private const string SampleDescription = "sample description";
        private const string SampleIdStringified = "d3524543d93f446081d1acad";
        private const string ExpenseApiGetActionName = "GetExpense";
        private const string RouteIdParameterName = "id";

        private readonly ControllerContext _controllerContextWithoutNameIdentifierClaim = new ControllerContext
            {HttpContext = new DefaultHttpContext {User = new ClaimsPrincipal()}};

        private readonly ControllerContext _controllerContextWithNameIdentifierClaim = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, SampleNameIdentifier),
                }))
            }
        };

        private readonly Expense _sampleExpense = new Expense
        {
            Id = new ObjectId(SampleIdStringified),
            Amount = SampleAmount,
            Date = SampleUniversalDate,
            Category = SampleCategory,
            Description = SampleDescription
        };

        [Test]
        public void Should_ReturnUnauthorized_When_CreateExpenseWithoutNameIdentifierClaim()
        {
            var expensesController = new ExpensesController(new Mock<IExpensesRepository>().Object)
            {
                ControllerContext = _controllerContextWithoutNameIdentifierClaim
            };

            var actualResult = expensesController.CreateExpense(new ExpenseDto());
            var unauthorizedResult = actualResult as UnauthorizedResult;

            Assert.IsNotNull(unauthorizedResult);
            Assert.AreEqual((int) HttpStatusCode.Unauthorized, unauthorizedResult.StatusCode);
        }

        [Test]
        public void Should_ReturnCreated_When_CreateExpenseSuccessfully()
        {
            var expensesRepository = new Mock<IExpensesRepository>();
            expensesRepository.Setup(r => r.Create(It.IsAny<Expense>())).Returns(new Expense());
            var expensesController = new ExpensesController(expensesRepository.Object)
            {
                ControllerContext = _controllerContextWithNameIdentifierClaim
            };

            var actualResult = expensesController.CreateExpense(new ExpenseDto());
            var createdResult = actualResult as CreatedAtActionResult;

            Assert.IsNotNull(createdResult);
            Assert.AreEqual((int) HttpStatusCode.Created, createdResult.StatusCode);
        }

        [Test]
        public void Should_ReturnCreatedExpense_When_CreateExpenseSuccessfully()
        {
            var expensesRepository = new Mock<IExpensesRepository>();
            expensesRepository.Setup(r => r.Create(It.IsAny<Expense>())).Returns(_sampleExpense);
            var expensesController = new ExpensesController(expensesRepository.Object)
            {
                ControllerContext = _controllerContextWithNameIdentifierClaim
            };

            var actualResult = expensesController.CreateExpense(new ExpenseDto());
            var createdResult = actualResult as CreatedAtActionResult;
            var createdExpense = createdResult?.Value as ExpenseDto;

            Assert.IsNotNull(createdExpense);
            Assert.AreEqual(SampleIdStringified, createdExpense.Id);
            Assert.AreEqual(SampleAmount, createdExpense.Amount);
            Assert.AreEqual(SampleLocalDate, createdExpense.Date);
            Assert.AreEqual(SampleCategory, createdExpense.Category);
            Assert.AreEqual(SampleDescription, createdExpense.Description);
        }

        [Test]
        public void Should_UseCorrectCreatedActionLocationParameters_When_CreateExpenseSuccessfully()
        {
            var expensesRepository = new Mock<IExpensesRepository>();
            expensesRepository.Setup(r => r.Create(It.IsAny<Expense>())).Returns(_sampleExpense);
            var expensesController = new ExpensesController(expensesRepository.Object)
            {
                ControllerContext = _controllerContextWithNameIdentifierClaim
            };

            var actualResult = expensesController.CreateExpense(new ExpenseDto());
            var createdResult = actualResult as CreatedAtActionResult;

            Assert.IsNotNull(createdResult);
            Assert.AreEqual(ExpenseApiGetActionName, createdResult.ActionName);
            Assert.AreEqual(SampleIdStringified, createdResult.RouteValues[RouteIdParameterName]);
        }
    }
}