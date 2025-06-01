const express = require('express');
const { UpdateApi,getApi,postApi } = require('../controller/httpControllers.js');

const router = express.Router();

router.post('/test', getApi); // Handles GET (although receives url and headers in body)
router.post('/test-update', UpdateApi); // Handles PUT, DELETE, PATCH (receives method, url, headers, body in body)
router.post('/test-post', postApi); // Handles POST (receives url, headers, body in body)

module.exports = router;