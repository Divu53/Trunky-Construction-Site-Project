const Errors = require("../helpers/error");
const ItemService = require("../services/ItemService");
const validator = require("validator");

const addItem = async (req, res) => {
  try {
    const payload = {
      projectId: req.params.id ?? null,
      itemName: req.body.itemName ?? null,
      description: req.body.description ?? null,
      quantity: req.body.quantity ?? null,
      unitCost: req.body.unitCost ?? null,
    };

    if (!payload.projectId) {
      throw Errors.badRequestError("project id is required");
    }
    if (!payload.itemName) {
      throw Errors.badRequestError("itemName is required");
    }
    if (
      !payload.quantity ||
      !validator.isNumeric(payload.quantity?.toString())
    ) {
      throw Errors.badRequestError("please provide valid quantity");
    }
    if (!payload.unitCost || !validator.isFloat(payload.unitCost?.toString())) {
      throw Errors.badRequestError("please provide valid unitCost");
    }

    const response = await ItemService.add(payload);

    return res.status(201).json({
      status: true,
      message: "item Added successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ status: false, message: error.message, data: null });
  }
};

const updateItem = async (req, res) => {
  try {
    const payload = {
      itemId: req.params.itemId ?? null,
      projectId: req.params.id ?? null,
      itemName: req.body.itemName ?? null,
      description: req.body.description ?? null,
      quantity: req.body.quantity ?? null,
      unitCost: req.body.unitCost ?? null,
    };

    if (!payload.itemId) {
      throw Errors.badRequestError("itemid id is required");
    }

    if (!payload.projectId) {
      throw Errors.badRequestError("project id is required");
    }
    if (
      payload.quantity &&
      !validator.isNumeric(payload.quantity?.toString())
    ) {
      throw Errors.badRequestError("please provide valid quantity");
    }
    if (payload.unitCost && !validator.isFloat(payload.unitCost?.toString())) {
      throw Errors.badRequestError("please provide valid unitCost");
    }

    const response = await ItemService.update(payload);

    return res.status(200).json({
      status: true,
      message: "item update successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ status: false, message: error.message, data: null });
  }
};

const deleteItem = async (req, res) => {
  try {
    const projectId = req.params.id ?? null;

    if (!projectId) {
      throw Errors.badRequestError("projectId is required");
    }
    const itemId = req.params.itemId ?? null;

    if (!itemId) {
      throw Errors.badRequestError("itemId is required");
    }

    const response = await ItemService.delete(projectId, itemId);
    return res.status(201).json({
      status: true,
      message: "delete item Successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllItems = async (req, res) => {
  try {
    const payload = {
      projectId: req.params.id,
      search: req.query.search ?? "",
      limit: req.query.limit ?? 10,
      page: req.query.page ?? 1,
    };

    const response = await ItemService.getAll(payload);

    return res.status(200).json({
      status: true,
      message: "All items fetch successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ status: false, message: error.message, data: null });
  }
};

module.exports = {
  addItem,
  updateItem,
  deleteItem,
  getAllItems,
};
