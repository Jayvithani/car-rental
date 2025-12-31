const express = require("express");
const router = express.Router();
const DB = require("../models");
const app = express();
app.use(express.json());

router.post("/add", async (req, res) => {
  try {
    const {name,brandName,carType,manufacturingYear,features,transmission,capicity,sellingPrice,owner,serviceType,rentPerHour,} = req.body;
   const car = await DB.CAR.create({
      name,brandName,carType,manufacturingYear,features,transmission,capicity,sellingPrice,owner,serviceType,rentPerHour,});
    res.status(201).json({
      message: "Car added successfully",
      data: car,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding car",
      error: error.message,
    });
  }
});

router.get("/allcar",async (req,res)=>{
  try {
    const cars= await DB.CAR.find();
    res.json(cars);
  } catch (error) {
    res.json({
      message:"no car avalible",
      error:error.message
    })
  }
})
router.put("/updatecar/:id",async (req,res)=>{
  try {
 const {id} = req.params;
 const{name,brandName,carType,manufacturingYear,features,transmission,capicity,sellingPrice,owner,serviceType,rentPerHour,}=req.body

    const updatecar = await DB.CAR.findByIdAndUpdate(
    id,
    {name: name?.toUpperCase(),brandName,carType,manufacturingYear,features,transmission,capicity,sellingPrice, owner, serviceType,rentPerHour,},
    { new: true }
    );
    res.json({
      message:"car update successfully",
    data:updatecar,
    })
  } catch (error) {
    res.json({
      message:"error updating car",
      error:error.message
    })
  }
})

router.delete("/deletecar/:id", async (req, res) => {
  try {
const { id } = req.params;

 const deleteCar = await DB.CAR.findByIdAndDelete(id);

  if (!deleteCar) {
      return res.status(404).json({
        message: "Car not found",
      });
    }
    res.json({
      message: "Car deleted successfully",
      data: deleteCar,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting car",
      error: error.message,
    });
  }
});

module.exports = router;
