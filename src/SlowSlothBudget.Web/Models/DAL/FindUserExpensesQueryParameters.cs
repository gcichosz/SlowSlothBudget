namespace SlowSlothBudget.Web.Models.DAL
{
    public class FindUserExpensesQueryParameters
    {
        public string UserId { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public int Offset { get; set; }
        public int Limit { get; set; }
    }
}