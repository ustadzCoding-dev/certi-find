const express = require('express');
const router = express.Router();
const {
    getCertifications,
    getCertificationById,
    getCertificationsByCategory,
    createCertification,
    updateCertification,
    deleteCertification,
} = require('../controllers/certController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const { certificationSchema, updateCertificationSchema } = require('../validators/schemas');

// Public routes
router.get('/', getCertifications);
router.get('/category/:category', getCertificationsByCategory);
router.get('/:id', getCertificationById);

// Admin routes
router.post('/', auth, admin, validate(certificationSchema), createCertification);
router.put('/:id', auth, admin, validate(updateCertificationSchema), updateCertification);
router.delete('/:id', auth, admin, deleteCertification);

module.exports = router;
