const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const User = require("../models/User");
const Contact = require("../models/Contact");

// @route GET /api/contacts
// @description get all contacts
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
  res.send("Contacts");
});

// @route POST /api/contacts
// @description store a contact
// @access Private
router.post("/", [
  auth, [
    check("name", "Name is required").isString().notEmpty(),
    check("phone", "Phone is required").isMobilePhone(),
    check("email", "Email is required").isEmail(),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name, email, phone, type, user: req.user.id
    });

    const contactData = await newContact.save();

    return res.json(contactData);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }

});

// @route PUT /api/contacts/:id
// @description update a contact
// @access Private
router.put("/:id", auth, async (req, res) => {

  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (email) contactFields.email = email;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
  // res.send("Update contact");
});

// @route DELETE /api/contacts
// @description delete a contact
// @access Private
router.delete("/:id", auth, async (req, res) => {

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // contact = await Contact.findByIdAndUpdate(req.params.id,
    //   { $set: contactFields },
    //   { new: true }
    // );

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ msg: "Contact deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }

});



module.exports = router;
