using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.Mvc;
using SignalRDemo.Models;

namespace SignalRDemo.Controllers
{
    public abstract class LiteDbController<TEntity> : Controller where TEntity : ILiteDbModel
    {
        protected readonly LiteDatabase Db;

        protected readonly LiteCollection<TEntity> Collection;
        
        protected LiteDbController(string collectionName = null)
        {
            // Open database (or create if not exits)
            Db = new LiteDatabase($"Filename={GetType().Assembly.GetName().Name}.db;Mode=Exclusive");
            
            string effectiveCollectionName = collectionName ?? typeof(TEntity).Name;
            
            // Get employees collection
            Collection = Db.GetCollection<TEntity>(effectiveCollectionName);
        }
        
        [Route("")]
        [HttpGet]
        public virtual async Task<IActionResult> GetListAsync()
        {
            await Task.Delay(TimeSpan.FromSeconds(3));
            
            // return list of employees
            return Json(Collection.FindAll().ToList());
        }
        
        [Route("")]
        [HttpPost]
        public virtual IActionResult UpsertAsync([FromBody] TEntity record)
        {
            // upsert
            bool inserted = Collection.Upsert(record);
            
            //invoke subscribed events
            if (inserted)
            {
                OnInserted?.Invoke(this, record);
            }
            else
            {
                OnUpdated?.Invoke(this, record);
            }

            // return id of saved record
            return Json(new {record.Id});
        }
        
        [Route("")]
        [HttpDelete]
        public virtual IActionResult ResetAsync()
        {
            // delete all
            Collection.Delete(x => x.Id > 0);
            
            //invoke subscribed events
            OnReset?.Invoke(this, EventArgs.Empty);
            
            //return ok
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }

        protected event EventHandler<TEntity> OnUpdated;
        protected event EventHandler<TEntity> OnInserted;
        protected event EventHandler OnReset;
    }
}