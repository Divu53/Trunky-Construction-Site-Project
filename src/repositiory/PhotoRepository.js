const models = require("../../models/index");

class PhotoRepository {
  constructor() {
    this.model = models.Photos;
  }

  async blukCreate(data) {
    return await this.model.bulkCreate(data);
  }
  async getAll(payload) {
    const { projectId } = payload;
    const photos = await this.model.findAll({
      where: {
        projectId: projectId,
      },
    });

    return photos;
  }
}

module.exports = new PhotoRepository();
