using System.Collections.Generic;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Models.Dtos;

namespace SlowSlothBudget.Web.Mappers
{
    public interface ICategoriesMapper
    {
        IEnumerable<CategoryDto> Map(IEnumerable<Category> categories);
        IEnumerable<Category> Map(IEnumerable<CategoryDto> categoriesDto, string userId);
    }
}