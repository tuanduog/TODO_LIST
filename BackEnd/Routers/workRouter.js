const workController = require('../Controllers/workController');
const express = require('express');
const router = express.Router();

router.post('/add-work', workController.addWork);

router.get('/get-work', workController.getWork);

router.delete('/delete-work/:id', workController.deleteWork);

router.put('/change-work/:id', workController.changeWork);
module.exports = router;