const express = require("express");
const router = express.Router();
const DB = require("./../models");
/**
 * ROLE ADD
 * role/add
 * POST
 */

router.post("/add", async (req, res) => {
    const role = await DB.ROLE.create({
      role: req.body.roleName || req.body.role,
    });
    res.json(role);
  });

router.get("/allRoles", async (req, res) => {
    const roles = await DB.ROLE.find();
    res.json(roles);
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