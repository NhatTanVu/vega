using System.ComponentModel.DataAnnotations;

namespace vega.Models
{
    public class Filter
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
    }
}