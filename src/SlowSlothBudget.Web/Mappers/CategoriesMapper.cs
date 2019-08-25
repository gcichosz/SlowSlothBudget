using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
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

        public IEnumerable<Category> Map(IEnumerable<CategoryDto> categoriesDto, string userId)
        {
            return categoriesDto.Select(c => Map(c, userId)).ToList();
        }

        private static CategoryDto Map(Category category)
        {
            return new CategoryDto
            {
                Id = category.Id.ToString(),
                Name = category.Name,
                Order = category.Order
            };
        }

        private static Category Map(CategoryDto categoryDto, string userId)
        {
            return new Category
            {
                Id = string.IsNullOrEmpty(categoryDto.Id) ? new ObjectId() : new ObjectId(categoryDto.Id),
                Name = categoryDto.Name,
                Order = categoryDto.Order,
                OwnerUserId = userId
            };
        }
    }
}