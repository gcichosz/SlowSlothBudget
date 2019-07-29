using System.Collections.Generic;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Options;

namespace SlowSlothBudget.Web.DAL
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly IMongoCollection<Expense> _collection;

        public CategoriesRepository(IOptions<MongoDbOptions> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _collection = database.GetCollection<Expense>(options.Value.CollectionName);
        }

        public IEnumerable<Category> FindUserCategories(string userId)
        {
            var userExpenses = _collection.Aggregate().Match(e => e.OwnerUserId == userId);
            var userCategories = userExpenses.Group("{_id: \"$category\"}").Project("{_id:0, name: \"$_id\"}").ToList();
            var categories = new List<Category>();
            foreach (var category in userCategories)
            {
                categories.Add(BsonSerializer.Deserialize<Category>(category));
            }

            return categories;
        }
    }
}