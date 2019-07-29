using System.Collections.Generic;
using System.Linq;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Mappers
{
    public class CategoriesMapper : ICategoriesMapper
    {
        public IEnumerable<CategoryDto> Map(IEnumerable<Category> categories)
        {
            return categories.Select(Map).ToList();
        }

        private static CategoryDto Map(Category category)
        {
            return new CategoryDto
            {
                Name = category.Name,
                Order = category.Order
            };
        }
    }
}