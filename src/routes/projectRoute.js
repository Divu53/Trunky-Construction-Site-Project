const express = require("express");
const {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectDetails,
} = require("../controllers/projectController");
const {
  addItem,
  updateItem,
  deleteItem,
  getAllItems,
} = require("../controllers/itemController");
const fileUpload = require("../middleware/fileUpload");
const {
  uploadPhotos,
  getAllPhotos,
} = require("../controllers/photoController");

const router = express.Router();

router.post("/:id/items", addItem);
router.get("/:id/items", getAllItems);

router.put("/:id/items/:itemId", updateItem);

router.delete("/:id/items/:itemId", deleteItem);

router.post("/", createProject);

router.get("/", getAllProjects);

router.get("/:id", getProjectDetails);

router.get("/:id/summary", getProjectDetails);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

router.post("/:id/photos", fileUpload.any(), uploadPhotos);

router.get("/:id/photos", getAllPhotos);

module.exports = router;
