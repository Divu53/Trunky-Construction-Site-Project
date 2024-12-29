const { where, Op } = require("sequelize");
const models = require("../../models/index");

class ProjectRepository {
  constructor() {
    this.model = models.Projects;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async getById(id) {
    return await this.model.findByPk(id);
  }

  async updateById(id, data) {
    return await this.model.update(data, {
      where: {
        id: id,
      },
    });
  }

  async delete(id) {
    await this.model.destroy({
      where: {
        id: id,
      },
    });
  }

  async getAll(payload) {
    const { userId, search = "", limit = 10, page = 1 } = payload;

    const offest = (page - 1) * limit;

    const projects = await this.model.findAndCountAll({
      where: {
        userId: userId,
        [Op.or]: {
          projectName: {
            [Op.iLike]: `%${search}%`,
          },
        },
      },
      limit: limit,
      offest: offest,
    });

    return projects;
  }

  async getProjectDetails(projectId) {
    const project = await this.model.findByPk(projectId, {
      include: [
        {
          model: models.Items,
        },
        {
          model: models.Photos,
        },
      ],
    });

    return project;
  }
}

module.exports = new ProjectRepository();
