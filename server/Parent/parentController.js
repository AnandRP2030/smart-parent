const { ParentModel } = require("./parentSchema");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profilePicture");


const {
  encryptPassword,
  comparePasswords,
} = require("../utils/passwordEncryption");

const { generateToken } = require("../utils/auth");

const registerParent = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, dateOfBirth } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !address ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        existingFields: req.body,
      });
    }
    //todo=> will use this hashsed password after development works completed
    const hashedPassword = await encryptPassword(password);
    const newParent = new ParentModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      dateOfBirth,
      profilePicture: req.file?.path ? req.file : null,
    });

    await newParent.save();
    return res.status(201).json({
      status: 201,
      message: "Parent registration completed successfully.",
      data: newParent,
    });
  } catch (error) {
    console.error("Error in email parent registration: ", error);
    return res.status(500).json({ message: "Internal server error" , error: error});
  }
};
const loginParent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const parent = await ParentModel.findOne({ email });
    if (!parent) {
      return res.status(404).json({
        message: "User not found. Please check your email and password",
      });
    }

    // todo=> this will un comment for checking encypted passwords
    const isPasswordMatch = await comparePasswords(password, parent.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Please check your email and password" });
    }



    const parentCopy = parent.toObject();
    delete parentCopy.password;

    const token = generateToken(parentCopy);

    return res.status(200).json({
      message: "Parent login successfull",
      data: parentCopy,
      token,
    });
  } catch (error) {
    console.error("Error logging in parent:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getParentDataWithToken = (req, res) => {
  try {
    return res.json({ message: "Parent data ", data: req.user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const viewParents = (req, res) => {
  ParentModel.find()
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// view  finished

//update  by id
const editParentById = (req, res) => {
  ParentModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      parentalStatus: req.body.parentalStatus,
    }
  )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
// view  by id
const viewParentById = (req, res) => {
  ParentModel.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const deleteParentById = (req, res) => {
  ParentModel.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data removed successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//forgotvPawd  by id
const forgotPwd = (req, res) => {
  ParentModel.findOneAndUpdate(
    { email: req.body.email },
    {
      password: req.body.password,
    }
  )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

module.exports = {
  registerParent,
  viewParentById,
  viewParents,
  editParentById,
  forgotPwd,
  deleteParentById,
  loginParent,
  getParentDataWithToken,
  loginParent,
  upload,
};
