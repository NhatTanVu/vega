using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega.Core.Models;

namespace vega.Core
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoStorage photoStorage;
        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage photoStorage)
        {
            this.photoStorage = photoStorage;
            this.unitOfWork = unitOfWork;
        }
        public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile formFile, string uploadsFolderPath)
        {
            string fileName = await this.photoStorage.StorePhoto(uploadsFolderPath, formFile);
            var photo = new Photo() { FileName = fileName };
            vehicle.Photos.Add(photo);
            await this.unitOfWork.CompleteAsync();

            return photo;
        }
    }
}