using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Models;
using vega.Core;
using System.Collections.Generic;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IModelRepository modelRepository;

        public VehiclesController(IMapper mapper, IVehicleRepository vehicleRepository,
            IModelRepository modelRepository, IUnitOfWork unitOfWork)
        {
            this.modelRepository = modelRepository;
            this.unitOfWork = unitOfWork;
            this.vehicleRepository = vehicleRepository;
            this.mapper = mapper;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var model = await modelRepository.GetAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("ModelId", "Invalid modelId.");
                return BadRequest(ModelState);
            }

            var vehicle = await vehicleRepository.GetAsync(id);

            if (vehicle == null)
                return NotFound();

            mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdated = DateTime.Now;
            await unitOfWork.CompleteAsync();

            vehicle = await vehicleRepository.GetAsync(id);
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var model = await modelRepository.GetAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("ModelId", "Invalid modelId.");
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdated = DateTime.Now;

            vehicleRepository.Add(vehicle);
            await unitOfWork.CompleteAsync();

            vehicle = await vehicleRepository.GetAsync(vehicle.Id);

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetAsync(id, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            vehicleRepository.Remove(vehicle);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetAsync(id);

            if (vehicle == null)
                return NotFound();

            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        public async Task<IEnumerable<VehicleResource>> GetVehicles()
        {
            var vehicles = await vehicleRepository.GetVehicles();

            return mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleResource>>(vehicles);
        }
    }
}