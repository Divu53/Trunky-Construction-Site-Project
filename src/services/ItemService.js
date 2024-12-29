const Errors = require("../helpers/error");
const ItemRepository = require("../repositiory/ItemRepository");
const ProjectRepository = require("../repositiory/ProjectRepository");

class ItemService {
  async add(payload) {
    try {
      const project = await ProjectRepository.getById(payload.projectId);

      if (!project) {
        throw Errors.notFoundError("project not found");
      }

      const item = await ItemRepository.create({
        projectId: payload.projectId,
        itemName: payload.itemName,
        description: payload.description,
        quantity: payload.quantity,
        unitCost: payload.unitCost,
        totalCost: payload.quantity * payload.unitCost,
      });

      return item;
    } catch (error) {
      console.log(error);
      throw Errors(error.statusCode, error.message);
    }
  }

  async update(payload) {
    try {
      const project = await ProjectRepository.getById(payload.projectId);

      if (!project) {
        throw Errors.notFoundError("project not found");
      }

      const item = await ItemRepository.getByitemId(payload.itemId);

      if (!item) {
        throw Errors.notFoundError("item not found");
      }

      let totalCost = null;
      if (payload.quantity) {
        totalCost = payload.quantity * item.unitCost;
      }

      if (payload.unitCost) {
        totalCost = payload.unitCost * item.quantity;
      }

      if (payload.quantity && payload.unitCost) {
        totalCost = payload.quantity * payload.unitCost;
      }
      await ItemRepository.update(item.id, {
        itemName: payload.itemName ?? item.itemName,
        description: payload.description ?? item.description,
        quantity: payload.quantity ?? item.quantity,
        unitCost: payload.unitCost ?? item.unitCost,
        totalCost,
      });

      return null;
    } catch (error) {
      console.log(error);
      throw Errors(error.statusCode, error.message);
    }
  }

  async delete(projectId, itemId) {
    try {
      const project = await ProjectRepository.getById(projectId);

      if (!project) {
        throw Errors.notFoundError("project not found");
      }

      const item = await ItemRepository.getByitemId(itemId);

      if (!item) {
        throw Errors.notFoundError("item not found");
      }

      await ItemRepository.delete(itemId);

      return null;
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async getAll(payload) {
    try {
      const project = await ProjectRepository.getById(payload.projectId);

      if (!project) {
        throw Errors.notFoundError("project not found");
      }

      const items = await ItemRepository.getAll(payload);

      return items;
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode, error.message);
    }
  }
}

module.exports = new ItemService();
