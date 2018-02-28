using System.Linq;
using LiteDB;
using Microsoft.AspNetCore.Mvc;
using SignalRDemo.Models;

namespace SignalRDemo.Controllers
{
    public abstract class LiteDbController<TCollection> : Controller where TCollection : ILiteDbModel
    {
        protected readonly LiteDatabase Db;

        protected readonly LiteCollection<TCollection> Collection;
        
        protected LiteDbController(string collectionName = null)
        {
            // Open database (or create if not exits)
            Db = new LiteDatabase($"Filename={GetType().Assembly.GetName().Name}.db;Mode=Exclusive");
            
            string effectiveCollectionName = collectionName ?? typeof(TCollection).Name;
            
            // Get employees collection
            Collection = Db.GetCollection<TCollection>(effectiveCollectionName);
        }
        
        [Route("")]
        [HttpGet]
        public virtual IActionResult GetList()
        {
            // return list of employees
            return Json(Collection.FindAll().ToList());
        }
        
        [Route("")]
        [HttpPost]
        public virtual IActionResult Upsert([FromBody]TCollection record)
        {
            // upsert
            Collection.Upsert(record);
                
            // return id of saved record
            return Json(new {record.Id});
        }
        
        [Route("")]
        [HttpDelete]
        public virtual IActionResult Reset()
        {
            // delete all
            Collection.Delete(x => x.Id > 0);
                
            //return ok
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}