using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SlowSlothBudget.Web.DAL;
using SlowSlothBudget.Web.Mappers;
using SlowSlothBudget.Web.Models.DAL;
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
            // BART: would probably use extensions here to get claims that are used frequently.
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // BART: code duplicated a lot, would move to action filters, however all this is under authorization attribute, meaning that if userId is null there is something wrong with auth server or transform logic, probably cleaner to delete this check as it seems unnecessary.
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdExpense = _expensesRepository.CreateExpense(_expensesMapper.Map(expenseDto, userId));
            return CreatedAtAction(nameof(GetExpense), new {id = createdExpense.Id.ToString()},
                _expensesMapper.Map(createdExpense));
        }

        [HttpGet]
        public IActionResult GetExpenses(string category, string description, int offset, int limit)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var userExpenses = _expensesRepository.FindUserExpensesOrderedByDateDesc(new FindUserExpensesQueryParameters
            {
                UserId = userId,
                Category = category,
                Description = description,
                Offset = offset,
                Limit = limit
            }, out var totalUserExpensesNumber);

            //BART: any reason this is passed in header instead of just an aggregate object? like
            /*
             * Total: int
             * Expenses: List<Expenses>
             */
            Response.Headers.Add("X-Total-Count", totalUserExpensesNumber.ToString());
            return Ok(_expensesMapper.Map(userExpenses));
        }

        [HttpGet("{id}")]
        public IActionResult GetExpense(string id)
        {
            throw new System.NotImplementedException();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExpense(ExpenseDto expenseDto)
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

            if (_expensesRepository.UpdateExpense(_expensesMapper.Map(expenseDto, userId)))
            {
                return NoContent();
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExpense(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (_expensesRepository.DeleteExpense(id, userId))
            {
                return NoContent();
            }

            return NotFound();
        }
    }
}