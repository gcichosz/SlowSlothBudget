using System;
using MongoDB.Bson;

namespace SlowSlothBudget.Web.Models
{
    public class Expense
    {
        public ObjectId Id { get; set; }
        
        public decimal Amount { get; set; }

        public DateTime Date { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

        public string OwnerUserId { get; set; }
    }
}