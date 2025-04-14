const workController = require('../Controllers/workController');
const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/authorMiddleware');

router.post('/add-work', auth, workController.addWork); // xác thực trước khi xử lý controller

router.get('/get-work', auth, workController.getWork);

router.delete('/delete-work/:id', auth, workController.deleteWork);

router.put('/change-work/:id', auth, workController.changeWork);
module.exports = router;