using System.Collections.Generic;
using SlowSlothBudget.Web.Models;

namespace SlowSlothBudget.Web.DAL
{
    public interface IStatisticsRepository
    {
        IEnumerable<CategoryStatistics> CalculateUserLastYearAverages(string userId);
    }
}