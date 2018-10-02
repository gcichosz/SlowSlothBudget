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
        private readonly IExpensesMapper _expensesMapper;

        public ExpensesController(IExpensesRepository expensesRepository, IExpensesMapper expensesMapper)
        {
            _expensesRepository = expensesRepository;
            _expensesMapper = expensesMapper;
        }

        [HttpPost]
        public IActionResult CreateExpense(ExpenseDto expenseDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdExpense = _expensesRepository.Create(_expensesMapper.Map(expenseDto, userId));
            return CreatedAtAction(nameof(GetExpense), new {id = createdExpense.Id.ToString()},
                _expensesMapper.Map(createdExpense));
        }

        [HttpGet]
        public IActionResult GetExpenses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var userExpenses = _expensesRepository.FindAllUserExpensesOrderedByDateDesc(userId);
            return Ok(_expensesMapper.Map(userExpenses));
        }

        [HttpGet("{id}")]
        public IActionResult GetExpense(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}