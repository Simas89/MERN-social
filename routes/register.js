const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../schemas/userSchema");
const ContactsList = require("../schemas/contactsListMODEL");
const Notifications = require("../schemas/notificationsMODEL");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
	if (req.body.userName.length < 3 || req.body.userPsw.length < 3) {
		res.status(400).json({
			status: "User Name and Password must be at least 3 characters long.",
		});
	} else {
		UserModel.exists(
			{ userName_tlc: req.body.userName.toLowerCase() },
			(error, result) => {
				if (!result) {
					const defaultImage = fs.readFileSync(
						path.join(`${__dirname + "/../"}/img/default.png`)
					);
					const defaultImageMini = fs.readFileSync(
						path.join(`${__dirname + "/../"}/img/defaultmini.png`)
					);

					const newContact = new ContactsList({
						list: [],
					});
					const newNotifications = new Notifications({
						list: [],
					});
					newContact.save();
					newNotifications.save();
					const user = new UserModel({
						userName: req.body.userName,
						userName_tlc: req.body.userName.toLowerCase(),
						userPsw: bcrypt.hashSync(req.body.userPsw, bcrypt.genSaltSync(10)),
						credits: 1000,
						dateJoined: Date.now(),
						email: "",
						verified: false,
						items: [],
						contacts: newContact,
						notifications: newNotifications,
						img: { data: defaultImage, contentType: "image/png" },
						imgMini: { data: defaultImageMini, contentType: "image/png" },
					});

					user.save((err) =>
						err
							? (console.log("Error: " + err),
							  res
									.status(400)
									.json({ status: "FAILED TO REGISTER", err: err }))
							: res.status(200).json({ status: "USER REGISTERED" })
					);
				} else {
					res.status(200).json({ status: "USER ALREADY EXISTS" });
				}
				if (error) {
					res.status(400).json({ status: "ERROR OCCURRED", err: error });
					console.log("Error: " + error);
				}
			}
		);
	}
});

module.exports = router;
