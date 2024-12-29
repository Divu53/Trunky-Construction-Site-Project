const Errors = require("../helpers/error");
const ProjectRepository = require("../repositiory/ProjectRepository");

class ProjectService {
  async create(payload) {
    try {
      const project = await ProjectRepository.create({
        projectName: payload.projectName,
        startDate: payload.startDate,
        userId: payload.userId,
        expectedCompletionDate: payload.expectedCompletionDate,
        description: payload.description,
      });

      return project;
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async update(payload) {
    try {
      const project = await ProjectRepository.getById(payload.id);

      if (!project) {
        throw Errors.notFoundError("project not found");
      }

      await ProjectRepository.updateById(payload.id, {
        projectName: payload.projectName ?? project.projectName,
        startDate: payload.startDate ?? project.startDate,
        expectedCompletionDate:
          payload.expectedCompletionDate ?? project.expectedCompletionDate,
        description: payload.description ?? project.description,
      });

      return null;
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async delete(id) {
    try {
      const project = await ProjectRepository.getById(id);

      if (!project) {
        throw Errors.notFoundError("project not found");
      }

      await ProjectRepository.delete(id);

      return null;
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async getAll(payload) {
    try {
      const projects = await ProjectRepository.getAll(payload);

      return projects;
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode, error.message);
    }
  }
  async getProjectDetails(projectId) {
    try {
      const project = await ProjectRepository.getProjectDetails(projectId);

      const projectOverallCost = project?.Items?.reduce((prev, curr) => {
        return prev + Number(curr.totalCost);
      }, 0);

      const obj = {
        ...project.dataValues,
        Photos: project.Photos.map((photo) => {
          return {
            ...photo.dataValues,
            url:
              `http://localhost:${process.env.PORT}/public/photos/` + photo.url,
          };
        }),
        projectOverallCost,
      };

      return obj;
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode, error.message);
    }
  }
}

module.exports = new ProjectService();
