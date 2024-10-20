const express = require('express');
const { addMedicament, updateMedicament, deleteMedicament, getAllMedicaments } = require('../controllers/medicamentController');
const { requireAuth, authenticateToken } = require('../Middleware/authMiddleware');

const router = express.Router();

// Routes pour les médicaments
router.post('/ControlDashboard', authenticateToken, addMedicament);
router.put('/ControlDashboard/:id', authenticateToken, updateMedicament);
router.delete('/ControlDashboard/:id', authenticateToken, deleteMedicament);
router.get('/Dashboard', authenticateToken, getAllMedicaments);

module.exports = router;
