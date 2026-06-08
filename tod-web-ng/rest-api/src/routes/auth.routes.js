const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { auth } = require('../config/firebase');

// Verify a Firebase ID token and return user info
router.post('/verify', verifyToken, (req, res) => {
  res.json({ uid: req.user.uid, email: req.user.email });
});

// Create a new admin user (server-side)
router.post('/create-user', verifyToken, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await auth.createUser({ email, password });
    res.status(201).json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
