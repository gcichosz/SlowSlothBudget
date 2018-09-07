using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Mappers
{
    public static class Mapper
    {
        public static Expense Map(ExpenseDto expenseDto, string userId)
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

        public static ExpenseDto Map(Expense expense)
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
    }
}