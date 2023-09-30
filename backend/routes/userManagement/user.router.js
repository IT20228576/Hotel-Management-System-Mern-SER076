const router = require("express").Router();
const User = require("../../models/userManagement/user.model");

/* The above code is a route handler for the /register route. It is used to register a new user. */
router.post("/register", async (req, res) => {
  try {
    /* Checking if the email is already in the database. */
    const user = await User.findOne({ email: req.body.email });

    /* Checking if the email is already in the database. */
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // save a new user account to the db
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      dob: req.body.dob,
      country: req.body.country,
      password: req.body.password,
      userType: req.body.userType,
    });

    /* Saving the new User to the database. */
    await newUser.save();

    /* Sending a response to the client. */
    res.status(201).send({ Message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* This is a route handler for the /profile route. It is used to get the user information. */
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the / route. It is used to get all the users. */
router.get("/", async (req, res) => {
  try {
    /* Destructuring the query parameters. */
    let { page, size, search, filter } = req.query;
    /* Checking if the page and size query parameters are not present, then it is setting the default
    values. */
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    let users = [];
    let total;
    let totalPage = 1;
    if (search !== undefined && search !== "") {
      if (filter !== undefined && filter !== "Both") {
        /* Finding all the admins in the database. */
        users = await User.find({
          firstName: { $regex: search, $options: "i" },
          userType: filter,
        });
      } else {
        /* Finding all the admins in the database. */
        users = await User.find({
          firstName: { $regex: search, $options: "i" },
        });
      }
      total = users.length;
    } else if (filter !== undefined && filter !== "Both") {
      /* Finding all the admins in the database. */
      users = await User.find({
        userType: filter,
      });
      total = users.length;
    } else {
      /* Finding all the admins in the database. */
      users = await User.find()
        .skip((page - 1) * size)
        .limit(size)
        .exec();

      /* count total users in the database. */
      total = await User.countDocuments();
      totalPage = parseInt(total / size + 1);
    }
    /* Sending the users object to the client. */
    res.json({ users: users, total: total, totalPage: totalPage });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the update route. It is updating the user account. */
router.put("/update/:id", async (req, res) => {
  try {
    /* Updating the user account. */
    await User.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(201).send({ Message: "Successfully updated the user." });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send(err);
  }
});

/* Deleting the user account. */
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully deleted" });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

/* The above code is a route that is used to update an admin. */
router.put("/update/admin", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.id, req.body);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully updated" });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send(err);
  }
});

/* This is a route handler for the /report route. It is used to report all the users. */
router.post("/report", async (req, res) => {
  try {
    /* Destructuring the query parameters. */
    const filter = req.body;
    console.log(filter);
    let users = [];
    let query = {};
    let total;
    if (filter.userType === "Admin") {
      query.userType = "Admin";
    } else if (filter.userType === "Customer") {
      query.userType = "Customer";
    }
    if (filter.country !== "") {
      query.country = filter.country;
    }
    if (filter.joinedFrom !== "" && filter.joinedTo !== "") {
      query.createdAt = {
        $gte: new Date(filter.joinedFrom),
        $lt: new Date(filter.joinedTo),
      };
    }
    console.log(query);

    users = await User.find(query);

    /* Sending the users object to the client. */
    res.json({ users: users, total: total });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
