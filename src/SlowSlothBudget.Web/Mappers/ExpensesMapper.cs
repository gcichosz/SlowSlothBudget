using System.Collections.Generic;
using System.Linq;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Mappers
{
    public class ExpensesMapper : IExpensesMapper
    {
        public Expense Map(ExpenseDto expenseDto, string userId)
        {
            return new Expense
            {
                Amount = expenseDto.Amount,
                Date = expenseDto.Date.ToUniversalTime(),
                Category = expenseDto.Category,
                Description = expenseDto.Description,
                OwnerUserId = userId
            };
        }

        public ExpenseDto Map(Expense expense)
        {
            return new ExpenseDto
            {
                Id = expense.Id.ToString(),
                Amount = expense.Amount,
                Date = expense.Date.ToLocalTime(),
                Category = expense.Category,
                Description = expense.Description,
            };
        }

        public IEnumerable<ExpenseDto> Map(IEnumerable<Expense> expenses)
        {
            return expenses.Select(Map).ToList();
        }
    }
}