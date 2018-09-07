using System;

namespace SlowSlothBudget.Web.Models.Dtos
{
    public class ExpenseDto
    {
        public string Id { get; set; }
        
        public decimal Amount { get; set; }

        public DateTime Date { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

    }
}