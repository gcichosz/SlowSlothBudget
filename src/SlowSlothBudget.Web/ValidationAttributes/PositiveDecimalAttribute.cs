using System;
using System.ComponentModel.DataAnnotations;

namespace SlowSlothBudget.Web.ValidationAttributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class PositiveDecimalAttribute : ValidationAttribute
    {
        public PositiveDecimalAttribute() : base("The Amount field has to be a positive number")
        {
        }

        public override bool IsValid(object value)
        {
            if (value == null)
            {
                return false;
            }

            var number = value as decimal? ?? 0;
            return number > 0;
        }
    }
}