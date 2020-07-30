const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileImgSmall = new Schema({
	data: Buffer,
	contentType: String,
});

module.exports = mongoose.model("ProfileImgSmall", profileImgSmall);
