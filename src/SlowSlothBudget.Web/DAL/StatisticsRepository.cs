using System;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Options;

namespace SlowSlothBudget.Web.DAL
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly IMongoCollection<Expense> _collection;

        public StatisticsRepository(IOptions<MongoDbOptions> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _collection = database.GetCollection<Expense>(options.Value.CollectionName);
        }

        public IEnumerable<CategoryStatistics> CalculateUserLastYearAverages(string userId)
        {
            var userLastYearExpenses = _collection.Aggregate()
                .Match(e => e.OwnerUserId == userId && e.Date > DateTime.UtcNow.Date.AddYears(-1));
            var expensesWithDecimalAmountAndEnumMonth = userLastYearExpenses.Project(
                "{_id:0, category:1, amount: {$convert: {input: \"$amount\", to: \"decimal\"}}, month: {$month: \"$date\"}}");
            var expensesSummedByMonthAndCategory =
                expensesWithDecimalAmountAndEnumMonth.Group(
                    "{_id: {month: \"$month\", category: \"$category\"}, amount: {$sum: \"$amount\"}}");
            var expensesSummedByCategory =
                expensesSummedByMonthAndCategory.Group("{_id: \"$_id.category\", amount: {$sum: \"$amount\"}}");
            var userLastYearAverageExpensesByCategory =
                expensesSummedByCategory.Project(
                    "{_id:0, name: \"$_id\", amount: {$convert: {input: {$divide: [\"$amount\", 12]}, to: \"string\"}}}").ToList();
            var userLastYearAverageCategoryStatistics = new List<CategoryStatistics>();
            foreach (var category in userLastYearAverageExpensesByCategory)
            {
                userLastYearAverageCategoryStatistics.Add(BsonSerializer.Deserialize<CategoryStatistics>(category));
            }

            return userLastYearAverageCategoryStatistics;
        }
    }
}