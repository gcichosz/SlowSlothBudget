using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SlowSlothBudget.Web.Models
{
    [BsonIgnoreExtraElements]
    public class Category
    {
        public ObjectId Id { get; set; }

        public string Name { get; set; }

        public int Order { get; set; }

        public string OwnerUserId { get; set; }
    }
}