using System.Collections.Generic;
using SlowSlothBudget.Web.Models;

namespace SlowSlothBudget.Web.DAL
{
    public interface IExpensesRepository
    {
        Expense Create(Expense expense);
        IEnumerable<Expense> FindAllUserExpensesOrderedByDateDesc(string userId);
        bool DeleteExpense(string expenseId, string userId);
    }
}