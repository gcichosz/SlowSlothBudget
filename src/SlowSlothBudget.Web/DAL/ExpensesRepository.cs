using Microsoft.Extensions.Options;
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
            var client = new MongoClient(options.Value.Server);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _collection = database.GetCollection<Expense>(options.Value.CollectionName);
        }

        public Expense Create(Expense expense)
        {
            _collection.InsertOne(expense);
            return expense;
        }
    }
}