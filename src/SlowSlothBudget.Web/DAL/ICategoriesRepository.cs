using System.Collections.Generic;
using SlowSlothBudget.Web.Models;

namespace SlowSlothBudget.Web.DAL
{
    public interface ICategoriesRepository
    {
        IEnumerable<Category> FindUserCategories(string userId);
    }
}