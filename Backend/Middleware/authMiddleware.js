const jwt = require('jsonwebtoken');
const { Person } = require('../Schema/Schema');

// Middleware d'authentification
exports.authenticateToken = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        try {
            const foundUser = await Person.findById(user.userId).select('-Password'); // Assurez-vous que user.userId est valide
            if (!foundUser) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = foundUser; // Attachez l'utilisateur trouvé à la requête
            next();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};



// Middleware de protection d'authentification
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            req.user = decodedToken;
        });
    } else {
        res.status(401).json({ message: 'Authorization token required' });
    }
};
