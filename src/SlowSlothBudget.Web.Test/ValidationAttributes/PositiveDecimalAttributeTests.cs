using NUnit.Framework;
using SlowSlothBudget.Web.ValidationAttributes;

namespace SlowSlothBudget.Web.Test.ValidationAttributes
{
    [TestFixture]
    public class PositiveDecimalAttributeTests
    {
        [Test]
        public void Should_ReturnFalse_When_ValueEmpty()
        {
            var actualValidationResult = new PositiveDecimalAttribute().IsValid(null);

            Assert.IsFalse(actualValidationResult);
        }

        [Test]
        public void Should_ReturnFalse_When_NonDecimalValue()
        {
            var actualValidationResult = new PositiveDecimalAttribute().IsValid(1.23);

            Assert.IsFalse(actualValidationResult);
        }

        [Test]
        public void Should_ReturnFalse_When_NegativeDecimalValue()
        {
            var actualValidationResult = new PositiveDecimalAttribute().IsValid(-1.23m);

            Assert.IsFalse(actualValidationResult);
        }

        [Test]
        public void Should_ReturnFalse_When_ZeroDecimalValue()
        {
            var actualValidationResult = new PositiveDecimalAttribute().IsValid(0m);

            Assert.IsFalse(actualValidationResult);
        }

        [Test]
        public void Should_ReturnTrue_When_PositiveDecimalValue()
        {
            var actualValidationResult = new PositiveDecimalAttribute().IsValid(1.23m);

            Assert.IsTrue(actualValidationResult);
        }
    }
}