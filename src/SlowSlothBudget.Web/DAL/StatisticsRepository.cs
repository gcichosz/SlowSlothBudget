using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using SlowSlothBudget.Web.Models;
using SlowSlothBudget.Web.Options;

namespace SlowSlothBudget.Web.DAL
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly IMongoCollection<Expense> _expensesCollection;
        private readonly ICategoriesRepository _categoriesRepository;

        public StatisticsRepository(IOptions<MongoDbOptions> options, ICategoriesRepository categoriesRepository)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _expensesCollection = database.GetCollection<Expense>(options.Value.ExpensesCollectionName);
            _categoriesRepository = categoriesRepository;
        }

        public IEnumerable<CategoryStatistics> CalculateUserLastYearAverages(string userId)
        {
            var userLastYearExpenses = _expensesCollection.Aggregate()
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
                        "{_id:0, name: \"$_id\", amount: {$convert: {input: {$divide: [\"$amount\", 12]}, to: \"string\"}}}")
                    .ToList();
            var userLastYearAverageCategoryStatistics = new List<CategoryStatistics>();
            foreach (var category in userLastYearAverageExpensesByCategory)
            {
                userLastYearAverageCategoryStatistics.Add(BsonSerializer.Deserialize<CategoryStatistics>(category));
            }

            var userCategories = _categoriesRepository.FindUserCategories(userId);
            return userLastYearAverageCategoryStatistics
                .Join(userCategories, s => s.Name, c => c.Name,
                    (categoryStatistics, category) => new
                        {categoryStatistics.Name, categoryStatistics.Amount, category.Order}).OrderBy(s => s.Order)
                .Select(s => new CategoryStatistics
                {
                    Name = s.Name,
                    Amount = s.Amount
                });
        }
    }
}