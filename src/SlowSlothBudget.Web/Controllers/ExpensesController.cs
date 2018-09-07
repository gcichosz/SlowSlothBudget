using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SlowSlothBudget.Web.DAL;
using SlowSlothBudget.Web.Mappers;
using SlowSlothBudget.Web.Models.Dtos;

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
        public IActionResult CreateExpense(ExpenseDto expenseDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var createdExpense = _expensesRepository.Create(Mapper.Map(expenseDto, userId));
            return CreatedAtAction(nameof(GetExpense), new {id = createdExpense.Id.ToString()},
                Mapper.Map(createdExpense));
        }

        [HttpGet]
        public IActionResult GetExpense(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}