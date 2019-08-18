using System.Threading.Tasks;
using vega.Models;

namespace vega.Core
{
    public interface IModelRepository
    {
        Task<Model> GetAsync(int modelId);
    }
}