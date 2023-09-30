const router = require("express").Router();
const User = require("../../models/userManagement/user.model");

router.post("/login", async (req, res) => {
  try {
    /* Finding the user by email. */
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    if (req.body.password != user.password) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    return res.send({ type: user.userType, user: user._id });
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
