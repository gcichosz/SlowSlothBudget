using System.Collections.Generic;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Options;

namespace SlowSlothBudget.Web.DAL
{
    public class ExpensesRepository : IExpensesRepository
    {
        private readonly IMongoCollection<Expense> _collection;

        public ExpensesRepository(IOptions<MongoDbOptions> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _collection = database.GetCollection<Expense>(options.Value.CollectionName);
        }

        public Expense CreateExpense(Expense expense)
        {
            _collection.InsertOne(expense);
            return expense;
        }

        public IEnumerable<Expense> FindUserExpensesOrderedByDateDesc(string userId, string category,
            string description)
        {
            var filterBuilder = Builders<Expense>.Filter;
            var filter = filterBuilder.Eq(e => e.OwnerUserId, userId);
            if (!string.IsNullOrEmpty(category))
            {
                filter = filter & filterBuilder.Regex(e => e.Category,
                             new BsonRegularExpression(new Regex($"{category}", RegexOptions.IgnoreCase)));
            }

            if (!string.IsNullOrEmpty(description))
            {
                filter = filter & filterBuilder.Regex(e => e.Description,
                             new BsonRegularExpression(new Regex($"{description}", RegexOptions.IgnoreCase)));
            }

            return _collection.Find(filter).SortByDescending(e => e.Date).ToList();
        }

        public bool DeleteExpense(string expenseId, string userId)
        {
            return _collection.DeleteOne(e => e.Id == new ObjectId(expenseId)).DeletedCount == 1;
        }

        public bool UpdateExpense(Expense expense)
        {
            return _collection.UpdateOne(e => e.Id == expense.Id,
                           Builders<Expense>.Update.Set(e => e.Amount, expense.Amount).Set(e => e.Date, expense.Date)
                               .Set(e => e.Category, expense.Category).Set(e => e.Description, expense.Description))
                       .ModifiedCount == 1;
        }
    }
}