const express = require("express");
const fileUpload = require("express-fileupload");
const UserModel = require("../schemas/userSchema");
const profileImgSmall = require("../schemas/profileImgSmall");

const sharp = require("sharp");

const router = express.Router();

router.post("/", fileUpload(), async (req, res) => {
	// console.log(req.files.myFile);
	// console.log("LOL");
	// CONVERTING IMAGE
	let buffer = "";
	let bufferMini = "";
	try {
		await sharp(req.files.myFile.data)
			.rotate()
			.resize(200)
			.toBuffer()
			.then((data) => {
				buffer = data;
				// console.log(data);
			});
	} catch (error) {
		console.log(error);
	}
	try {
		await sharp(req.files.myFile.data)
			.rotate()
			.resize(50)
			.toBuffer()
			.then((data) => {
				bufferMini = data;
				// console.log(data);
			});
	} catch (error) {
		// console.log(error);
	}

	UserModel.findOne({ userName: req.header("user") }).then((result) => {
		// console.log(buffer);
		///// SAVING TO DB
		if (buffer) {
			profileImgSmall
				.findByIdAndUpdate(result.imgsmall._id.toString())
				.then((img) => {
					console.log(img);
					img.data = bufferMini;
					img.contentType = req.files.myFile.mimetype;
					img.save();
				});
			// console.log(buffer);
			result.img.data = buffer;
			result.img.contentType = req.files.myFile.mimetype;
			result.imgMini.data = bufferMini;
			result.imgMini.contentType = req.files.myFile.mimetype;
			result.save().then(() => {
				UserModel.findOne({ userName: req.header("user") }).then((rrr) => {
					res
						.json({
							base64: rrr.img.data.toString("base64"),
							mimetype: rrr.img.contentType,
						})
						.status(200);
				});
			});
		} else {
			res.status(400).json({ status: "COULD NOT PROCESS IMAGE" });
		}
	});
});

module.exports = router;
