using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SlowSlothBudget.Web.DAL;
using SlowSlothBudget.Web.Models;

namespace SlowSlothBudget.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpensesRepository _expensesRepository;

        public ExpensesController(IExpensesRepository expensesRepository)
        {
            _expensesRepository = expensesRepository;
        }

        [HttpPost]
        public IActionResult CreateExpense(Expense expense)
        {
            var createdExpense = _expensesRepository.Create(expense);
            return CreatedAtAction(nameof(GetExpense), new {id = createdExpense.Id.ToString()}, createdExpense);
        }

        [HttpGet]
        public IActionResult GetExpense(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}