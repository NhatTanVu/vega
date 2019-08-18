using System.Threading.Tasks;
using vega.Core;
using vega.Models;

namespace vega.Persistence
{
    public class ModelRepository : IModelRepository
    {
        private readonly VegaDbContext context;
        public ModelRepository(VegaDbContext context)
        {
            this.context = context;

        }
        public async Task<Model> GetAsync(int modelId)
        {
            return await context.Models.FindAsync(modelId);
        }
    }
}