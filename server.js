const express = require("express");
const middleware = require("./middleware");
const reviewmodel = require("./reviewmodel");
const app = express();
const cors = require("cors");
const mongse = require("mongoose");
const devuser = require("./devusermodel");
const jwt = require("jsonwebtoken");

// Middleware to parse JSON in the request body
app.use(express.json());
//origin * for to use any router without any restriction
// Cross-Origin Resource Sharing
app.use(cors({ origin: "*" }));
mongse
  .connect(
    "mongodb+srv://parchurimaheshbabu:vcGzGiz0SFZjduxD@cluster0.o2dstmi.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected"));

app.get("/", (req, res) => {
  return res.send("hello World !!");
});

// REGISTER

app.post("/register", async (req, res) => {
  try {
    // destructure the data and then store in db
    const { fullname, email, mobile, skills, password, confirmpassword } =
      req.body;
    const exist = await devuser.findOne({ email });
    if (exist) {
      return res.status(400).send("User Already Registered");
    }
    if (password != confirmpassword) {
      return res.status(403).send("Passsword Invalid");
    }
    let newUser = new devuser({
      fullname,
      email,
      mobile,
      skills,
      password,
      confirmpassword,
    });
    await newUser.save(); // Use await to make sure the user is saved before responding
    return res.status(200).send("User Registered");
  } catch (err) {
    console.log("error occured", err);
    return res.status(500).send(err);
  }
});

//update
app.put("/update/:id", async (req, res) => {
  try {
    const { fullname, email, mobile, skills, password, confirmpassword } =
      req.body;
    const myEmployee = await devuser.findByIdAndUpdate(
      req.params.id,
      { fullname, email, mobile, skills, password, confirmpassword },
      { new: true }
    );
    if (!myEmployee) {
      return res.status(404).json({ message: "profile not found" });
    }
    res.status(200).json(myEmployee);
  } catch (error) {
    console.error("There Is An Error", error);

    res.status(500).json({ message: "Server Error" });
  }
});

// LOGIN

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await devuser.findOne({ email });
    // devuser in  'const exist =await devuser.findOne({email})' is model name

    if (!exist) {
      return res.status(400).send("User Not Exist");
    }
    if (exist.password != password) {
      // exist.password is password in db
      //   password is password send ny user to login
      return res.status(400).send("Pasword invalid");
    }
    // token  generating  to privede accessing to  protected routes

    let payload = {
      user: {
        id: exist._id,
      },
    };
    jwt.sign(
      payload,
      "jwtPassword",
      { expiresIn: 360000000 },
      // set expiry time 1 hour for token
      (err, token) => {
        if (err) throw err;
        // localStorage.setItem("userId", exist._id);
        return res.json({ token, id: exist._id });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// allprofiles

app.get("/allprofiles", middleware, async (req, res) => {
  try {
    let allprofiles = await devuser.find();
    return res.json(allprofiles);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server Error");
  }
});

// myprofile

app.get("/myprofile", middleware, async (req, res) => {
  try {
    let user = await devuser.findById(req.user.id);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// add review

app.post("/addreview", middleware, async (req, res) => {
  try {
    const { taskworker, rating } = req.body;
    const exist = await devuser.findById(req.user.id);
    // exist contain id of a person who is logged in
    const newReview = new reviewmodel({
      // reviewmodel is to which variable we assign reviewmodel.js
      taskprovider: exist.fullname,
      taskworker,
      rating,
    });
    await newReview.save();
    return res.status(200).send("Review Updated Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.get("/myreview", middleware, async (req, res) => {
  try {
    let allreviews = await reviewmodel.find();
    let myreviews = allreviews.filter(
      (review) => review.taskworker.toString() === req.user.id.toString()
    );

    return res.status(200).json(myreviews);
  } catch {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// Delete

app.delete("/delete/:id", middleware, async (req, res) => {
  try {
    const deleteemployee = await devuser.findByIdAndDelete(req.user.id);
    if (!deleteemployee) {
      return res.status(404).json({ message: "user not found" });
    } else {
      res.status(204).json({ message: "Deleted Success fully" });
    }
  } catch (error) {
    console.error("There Is An Error", error);

    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(4000, () => {
  console.log("server running ...");
});
