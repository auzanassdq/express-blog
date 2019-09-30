const express = require('express')
const router = express.Router()

const { addUser, getAllUser, deleteUser, uploadImage, login } = require("../controllers/user")
const upload = require('../config/multer')
const auth = require("../helpers/auth")

router.get("/", auth.tokenValid, getAllUser)
router.post("/", addUser)
router.delete("/", auth.tokenValid, deleteUser)
router.post("/user-image", upload.any(), uploadImage)
router.post("/login", login)

module.exports = router