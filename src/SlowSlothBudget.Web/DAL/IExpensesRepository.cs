using System.Collections.Generic;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.DAL;

namespace SlowSlothBudget.Web.DAL
{
    public interface IExpensesRepository
    {
        Expense CreateExpense(Expense expense);
        IEnumerable<Expense> FindUserExpensesOrderedByDateDesc(FindUserExpensesQueryParameters queryParameters);
        bool DeleteExpense(string expenseId, string userId);
        bool UpdateExpense(Expense expense);
    }
}