using System.Collections.Generic;
using System.Linq;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Mappers
{
    public class StatisticsMapper : IStatisticsMapper
    {
        public IEnumerable<CategoryStatisticsDto> Map(IEnumerable<CategoryStatistics> categories)
        {
            return categories.Select(Map).ToList();
        }

        private static CategoryStatisticsDto Map(CategoryStatistics category)
        {
            return new CategoryStatisticsDto
            {
                Name = category.Name,
                Amount = category.Amount
            };
        }
    }
}