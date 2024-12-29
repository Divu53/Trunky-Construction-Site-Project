const { where, Op } = require("sequelize");
const models = require("../../models/index");
const { isEthereumAddress } = require("validator");

class ItemRepository {
  constructor() {
    this.model = models.Items;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async getByitemId(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    return await this.model.update(data, {
      where: {
        id: id,
      },
    });
  }

  async delete(id) {
    return await this.model.destroy({
      where: {
        id: id,
      },
    });
  }

  async getAll(payload) {
    const { projectId, search = "", limit = 10, page = 1 } = payload;

    const offest = (page - 1) * limit;

    const items = await this.model.findAndCountAll({
      where: {
        projectId: projectId,
        [Op.or]: {
          itemName: {
            [Op.iLike]: `%${search}%`,
          },
        },
      },
      limit: limit,
      offest: offest,
    });

    return items;
  }
}

module.exports = new ItemRepository();
