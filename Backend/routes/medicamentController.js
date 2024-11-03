const express = require("express");
const {
  addMedicament,
  updateMedicament,
  deleteMedicament,
  getAllMedicaments,
} = require("../Controller/medicamentController");
const {
  authenticateToken,
} = require("../Middleware/authMiddleware");

const router = express.Router();

// Routes pour les médicaments
router.post("/Add", addMedicament);
router.put("/Update/:id", authenticateToken, updateMedicament);
router.delete("/Delete/:id", authenticateToken, deleteMedicament);
router.get("/Dashboard", getAllMedicaments);

module.exports = router;
