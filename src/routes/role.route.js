const express = require("express");
const router = express.Router();
const DB = require("./../models");
const auth = require("../middleware/auth");
const { ROLES } = require("../utils/constants/enums");

router.post("/add", auth(true,[ROLES.ADMIN]) ,async (req, res, next) => {
  const { roleName } = req.body;
  try {
    const response = await DB.ROLE.create({
      role: roleName,
    });
    return res.status(201).json({
      message: "Role Created Successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
});
router.get("/allRoles", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const skip = (page - 1) * limit;

    const totalRoles = await DB.ROLE.countDocuments();
    const roles = await DB.ROLE.find()
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      total: totalRoles,
      totalPages: Math.ceil(totalRoles / limit),
      data: roles
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});


  router.put("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
  
      const updatedRole = await DB.ROLE.findByIdAndUpdate(
        id,
        { role: role.toUpperCase() },
        { new: true }
      );
  
      res.json({
        message: "Role updated successfully",
        data: updatedRole,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating role",
        error: error.message,
      });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRole = await DB.ROLE.findByIdAndDelete(id);
  
      if (!deletedRole) {
        return res.status(404).json({
          message: "Role not found",
        });
      }
      res.json({
        message: "Role deleted successfully",
        data: deletedRole,
      });
    } catch (error) {
      res.json({
        message: "Error deleting role",
        error: error.message,
      });
    }
  });
  

module.exports = router;