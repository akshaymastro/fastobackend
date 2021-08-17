const express = require('express')
const advertiesment = require('../controllers/advertiesment')
const router = express.Router()
router.post('/newadvertiesment', advertiesment.createAdvertiesment)
