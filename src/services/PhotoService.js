const Errors = require("../helpers/error");
const PhotoRepository = require("../repositiory/PhotoRepository");
const ProjectRepository = require("../repositiory/ProjectRepository");

class PhotoService {
  async upload(payload) {
    try {
      const project = await ProjectRepository.getById(payload.projectId);

      if (!project) {
        throw Errors.notFoundError("project Not found");
      }

      const files = payload.photos.map((photo) => {
        return {
          projectId: project.id,
          url: photo.filename,
          fileType: photo.mimetype,
          fileSize: photo.size,
        };
      });

      await PhotoRepository.blukCreate(files);

      return null;
    } catch (error) {
      console.log();
      throw new Errors(error.statusCode, error.message);
    }
  }
  async getAll(payload) {
    try {
      const photo = await PhotoRepository.getAll(payload);

      const formatedPhotos = photo.map((value) => {
        return {
          ...value.dataValues,
          url:
            `http://localhost:${process.env.PORT}/public/photos/` + value.url,
        };
      });

      return formatedPhotos;
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode, error.message);
    }
  }
}

module.exports = new PhotoService();
