const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../libs/utils");

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        } 

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async(req, res) => {
    try {
        if(!req.body.username || !req.body.password) {
            return res.status(400).json({error: "Username and Password is required!"});
        }

        const user = await User.findOne({username: req.body.username});
        if(!user) {
            return res.status(401).json({error: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) {
            return res.status(401).json({error: "Invalid Credentials!"});
        }

        const accessToken = generateToken(user._id);

        const { password, ...userData } = user._doc;
        res.status(200).json({ ...userData, accessToken });
    }
    catch(e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = router;