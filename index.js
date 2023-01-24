const express = require("express");
const PhoneNumber = require("google-libphonenumber").PhoneNumber;
const phoneUtil =
	require("google-libphonenumber").PhoneNumberUtil.getInstance();
const app = express();

app.use(express.json());

app.post("/validate-phone", (req, res) => {
	const { countryCode, phoneNumber } = req.body;

	if (!countryCode || !phoneNumber) {
		return res
			.status(400)
			.json({ error: "Country code and phone number are required" });
	}

	const phoneNumberWithCountryCode = `+${countryCode}${phoneNumber}`;

	try {
		const phoneNumberObject = phoneUtil.parse(phoneNumberWithCountryCode, "");
		if (!phoneUtil.isValidNumber(phoneNumberObject)) {
			return res.status(400).json({ error: "Invalid phone number" });
		}
	} catch (err) {
		return res.status(400).json({ error: "Invalid phone number" });
	}
	return res.json({ valid: true });
});

app.listen(1988, () => {
	console.log("Phone number validation API listening on port 1988!");
});
