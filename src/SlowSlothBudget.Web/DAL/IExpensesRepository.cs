using System.Collections.Generic;
using SlowSlothBudget.Web.Models;

namespace SlowSlothBudget.Web.DAL
{
    public interface IExpensesRepository
    {
        Expense CreateExpense(Expense expense);
        IEnumerable<Expense> FindAllUserExpensesOrderedByDateDesc(string userId);
        bool DeleteExpense(string expenseId, string userId);
        bool UpdateExpense(Expense expense);
    }
}