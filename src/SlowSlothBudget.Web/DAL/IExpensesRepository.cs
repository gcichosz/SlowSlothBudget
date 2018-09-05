using SlowSlothBudget.Web.Models;

namespace SlowSlothBudget.Web.DAL
{
    public interface IExpensesRepository
    {
        Expense Create(Expense expense);
    }
}