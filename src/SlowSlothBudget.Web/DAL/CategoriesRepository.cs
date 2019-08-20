using System.Collections.Generic;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Options;

namespace SlowSlothBudget.Web.DAL
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly IMongoCollection<Category> _collection;

        public CategoriesRepository(IOptions<MongoDbOptions> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _collection = database.GetCollection<Category>(options.Value.CategoriesCollectionName);
        }

        public IEnumerable<Category> FindUserCategories(string userId)
        {
            return _collection.Find(c => c.OwnerUserId == userId).SortBy(c => c.Name).ToList();
        }
    }
}