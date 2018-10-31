using System.Collections.Generic;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Mappers
{
    public interface IStatisticsMapper
    {
        IEnumerable<CategoryStatisticsDto> Map(IEnumerable<CategoryStatistics> categories);
    }
}