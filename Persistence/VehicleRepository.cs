using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Extensions;
using vega.Models;

namespace vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);
            else
                return await context.Vehicles
                    .Include(v => v.Model)
                        .ThenInclude(m => m.Make)
                    .Include(v => v.Features)
                        .ThenInclude(vf => vf.Feature)
                    .FirstOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Vehicles.Remove(vehicle);
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery queryObject)
        {
            var query = context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .AsQueryable();
            if (queryObject.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObject.MakeId.Value);
            if (queryObject.ModelId.HasValue)
                query = query.Where(v => v.Model.Id == queryObject.ModelId.Value);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>() {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName,
                ["id"] = v => v.Id
            };

            query = query.ApplyOrdering<Vehicle>(queryObject, columnsMap);

            return await query.ToListAsync();
        }
    }
}