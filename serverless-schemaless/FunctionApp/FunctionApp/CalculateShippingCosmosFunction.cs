using System.Collections.Generic;
using Microsoft.Azure.Documents;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace FunctionApp
{
    public static class CalculateTaxCosmosFunction
    {
        [FunctionName("CalculateShippingCosmosFunction")]
        public static void Run([CosmosDBTrigger(
            databaseName: "salesdb",
            collectionName: "salescollection",
            ConnectionStringSetting = "CosmosDBConnection",
            LeaseCollectionName = "leases",
            CreateLeaseCollectionIfNotExists = true)]IReadOnlyList<Document> documents,
            ILogger log)
        {
            if (documents != null && documents.Count > 0)
            {
                foreach (var document in documents)
                {
                    if (((dynamic)document).requires_shipping)
                        log.LogWarning("Invoked shipping function");
                    else
                        log.LogWarning("No shipping!!!!");
                }
            }
        }
    }
}
