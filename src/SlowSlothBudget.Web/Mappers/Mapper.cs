using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Mappers
{
    public static class Mapper
    {
        public static Expense Map(ExpenseDto expenseDto)
        {
            return new Expense
            {
                Amount = expenseDto.Amount,
                Date = expenseDto.Date,
                Category = expenseDto.Category,
                Description = expenseDto.Description
            };
        }

        public static ExpenseDto Map(Expense expense)
        {
            return new ExpenseDto
            {
                Id = expense.Id.ToString(),
                Amount = expense.Amount,
                Date = expense.Date,
                Category = expense.Category,
                Description = expense.Description,
            };
        }
    }
}