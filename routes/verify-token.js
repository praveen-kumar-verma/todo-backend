const { Router } = require("express");
const userAuthMiddleware = require("../middleware/auth");
const router = Router();

router.get('/', userAuthMiddleware, async (req, res) => {
  try {
    res.status(200).json(
        { user: req.user });

    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    
  }
  
});

module.exports = router;
