
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FunctionApp
{
    public static class HttpTriggerFunction
    {
        [FunctionName("CheckoutEndPoint")]
        public static async Task Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequest req,
            [CosmosDB(databaseName: "salesdb",
            collectionName: "salescollection",
            CreateIfNotExists = true,
            CollectionThroughput = 1000,
            PartitionKey = "/sku",
            ConnectionStringSetting = "CosmosDBConnection")]
            IAsyncCollector<dynamic> outputDocuments,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            await outputDocuments.AddAsync(data);
        }
    }
}
