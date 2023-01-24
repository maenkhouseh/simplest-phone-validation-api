const express = require("express"); // Import express module
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance(); // Import Phone number utility from google-libphonenumber
const app = express(); // Create an express application

app.use(express.json()); // Use express middleware to parse JSON body

/**
 * POST /validate-phone endpoint
 * Validate a phone number
 *
 * @param {string} countryCode - The country code of the phone number
 * @param {string} phoneNumber - The phone number to validate
 * @return {Object} - JSON object with validation result
 */
app.post("/validate-phone", (req, res) => {
  const { countryCode, phoneNumber } = req.body; // Get country code and phone number from request body

  // Validate presence of country code and phone number
  if (!countryCode || !phoneNumber) {
    return res
      .status(400)
      .json({ error: "Country code and phone number are required" });
  }

  const phoneNumberWithCountryCode = `+${countryCode}${phoneNumber}`; // Concatenate country code and phone number

  try {
    const phoneNumberObject = phoneUtil.parse(phoneNumberWithCountryCode, ""); // parse the phone number
    if (!phoneUtil.isValidNumber(phoneNumberObject)) {
      return res.status(400).json({ error: "Invalid phone number" }); // If invalid phone number
    }
  } catch (err) {
    return res.status(400).json({ error: "Invalid phone number" }); // If phone number is not valid
  }
  return res.json({ valid: true }); // If valid phone number
});

app.listen(3000, () => {
  console.log("Phone number validation API listening on port 3000!");
});
