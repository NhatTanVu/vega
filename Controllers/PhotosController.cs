using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository photoRepository;
        private readonly IPhotoService photoService;
        public PhotosController(IHostingEnvironment host, IVehicleRepository repository, IPhotoRepository photoRepository,
            IMapper mapper, IOptionsSnapshot<PhotoSettings> options, IPhotoService photoService)
        {
            this.photoService = photoService;
            this.photoRepository = photoRepository;
            this.photoSettings = options.Value;
            this.mapper = mapper;
            this.repository = repository;
            this.host = host;
        }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
    {
        var vehicle = await repository.GetAsync(vehicleId, includeRelated: false);
        if (vehicle == null)
            return NotFound();

        if (file == null) return BadRequest("Null file");
        if (file.Length == 0) return BadRequest("Empty file");
        if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
        if (!photoSettings.IsSuported(file.FileName)) return BadRequest("Invalid file type");

        var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
        var photo = await photoService.UploadPhoto(vehicle, file, uploadsFolderPath);
        return Ok(mapper.Map<Photo, PhotoResource>(photo));
    }

    [HttpGet]
    public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
    {
        var photos = await photoRepository.GetPhotos(vehicleId);
        return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
    }
}
}