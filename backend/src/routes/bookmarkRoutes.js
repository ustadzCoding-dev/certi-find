const express = require('express');
const router = express.Router();
const {
    getBookmarks,
    addBookmark,
    removeBookmark,
    checkBookmark,
} = require('../controllers/bookmarkController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.get('/', getBookmarks);
router.post('/', addBookmark);
router.get('/check/:certId', checkBookmark);
router.delete('/:certId', removeBookmark);

module.exports = router;
