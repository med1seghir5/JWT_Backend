const { Medicament } = require('../Schema/Schema');

// Ajouter un médicament
exports.addMedicament = async (req, res) => {
    try {
        const medicament = new Medicament(req.body);
        await medicament.save();
        res.status(201).json({ message: 'Medicament added successfully', medicament });
    } catch (err) {
        res.status(500).json({ message: "Adding error", error: err.message });
    }
};

// Mettre à jour un médicament
exports.updateMedicament = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const medicament = await Medicament.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!medicament) {
            return res.status(404).json({ message: 'Medicament not found' });
        }

        res.status(200).json({ message: 'Medicament updated successfully', medicament });
    } catch (err) {
        res.status(500).json({ message: "Error in update", error: err.message });
    }
};

// Supprimer un médicament
exports.deleteMedicament = async (req, res) => {
    try {
        const { id } = req.params;
        const medic = await Medicament.findByIdAndDelete(id);

        if (!medic) {
            return res.status(404).json({ message: 'Medicament not found' });
        }
        res.status(200).json({ message: 'Medicament deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting', error: err.message });
    }
};

// Récupérer tous les médicaments
exports.getAllMedicaments = async (req, res) => {
    try {
        const Medica = await Medicament.find();
        res.status(200).json(Medica);
    } catch (err) {
        res.status(500).json({ message: 'Error in fetching data', error: err.message });
    }
};
