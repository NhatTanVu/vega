using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    public interface IModelRepository
    {
        Task<Model> GetAsync(int modelId);
    }
}