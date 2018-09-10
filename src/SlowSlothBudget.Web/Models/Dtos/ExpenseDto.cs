using System;
using System.ComponentModel.DataAnnotations;
using SlowSlothBudget.Web.ValidationAttributes;

namespace SlowSlothBudget.Web.Models.Dtos
{
    public class ExpenseDto
    {
        public string Id { get; set; }

        [Required] [PositiveDecimal] public decimal Amount { get; set; }

        [Required] public DateTime Date { get; set; }

        [Required] public string Category { get; set; }

        public string Description { get; set; }
    }
}