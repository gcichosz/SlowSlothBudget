using System.Collections.Generic;
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

        public Expense Create(Expense expense)
        {
            _collection.InsertOne(expense);
            return expense;
        }

        public IEnumerable<Expense> FindAllUserExpensesOrderedByDateDesc(string userId)
        {
            return _collection.Find(e => e.OwnerUserId == userId).SortByDescending(e => e.Date).ToList();
        }

        public bool DeleteExpense(string expenseId, string userId)
        {
            return _collection.DeleteOne(e => e.Id == new ObjectId(expenseId)).DeletedCount == 1;
        }
    }
}