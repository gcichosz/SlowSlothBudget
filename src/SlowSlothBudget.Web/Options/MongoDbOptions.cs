namespace SlowSlothBudget.Web.Options
{
    public class MongoDbOptions
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string ExpensesCollectionName { get; set; }
        public string CategoriesCollectionName { get; set; }
    }
}