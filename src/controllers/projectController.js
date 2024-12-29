const Errors = require("../helpers/error");
const validator = require("validator");
const ProjectService = require("../services/ProjectService");

const createProject = async (req, res) => {
  try {
    const payload = {
      projectName: req.body.projectName ?? null,
      startDate: req.body.startDate ?? null,
      expectedCompletionDate: req.body.expectedCompletionDate ?? null,
      description: req.body.description ?? null,
      userId: req.userId,
    };

    if (!payload.projectName) {
      throw Errors.badRequestError("please provide valid project name.");
    }

    if (!payload.startDate || !validator.isDate(payload.startDate)) {
      throw Errors.badRequestError("please provide valid start date.");
    }
    if (
      !payload.expectedCompletionDate ||
      !validator.isDate(payload.expectedCompletionDate)
    ) {
      throw Errors.badRequestError(
        "please provide valid expected completion date."
      );
    }

    const response = await ProjectService.create(payload);

    return res.status(201).json({
      status: true,
      message: "Project created successfully",
      data: response,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const payload = {
      id: req.params.id ?? null,
      projectName: req.body.projectName ?? null,
      startDate: req.body.startDate ?? null,
      expectedCompletionDate: req.body.expectedCompletionDate ?? null,
      description: req.body.description ?? null,
    };

    if (!payload.id) {
      throw Errors.badRequestError("id is required");
    }

    if (payload.startDate && !validator.isDate(payload.startDate)) {
      throw Errors.badRequestError("please provide valid start date.");
    }
    if (
      payload.expectedCompletionDate &&
      !validator.isDate(payload.expectedCompletionDate)
    ) {
      throw Errors.badRequestError(
        "please provide valid expected completion date."
      );
    }

    const response = await ProjectService.update(payload);

    return res.status(201).json({
      status: true,
      message: "Project update successfully",
      data: response,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id ?? null;

    if (!projectId) {
      throw Errors.badRequestError("id is required");
    }

    const response = await ProjectService.delete(projectId);
    return res.status(201).json({
      status: true,
      message: "delete Project Successfully",
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

const getAllProjects = async (req, res) => {
  try {
    const payload = {
      userId: req.userId,
      search: req.query.search ?? "",
      limit: req.query.limit ?? 10,
      page: req.query.page ?? 1,
    };

    const response = await ProjectService.getAll(payload);

    return res.status(200).json({
      status: true,
      message: "all project fetch successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ status: false, message: error.message, data: null });
  }
};

const getProjectDetails = async (req, res) => {
  try {
    const projectId = req.params.id;

    const response = await ProjectService.getProjectDetails(projectId);

    return res.status(200).json({
      status: true,
      message: "project details fetched successfully",
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
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectDetails,
};
