const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const essentialItems = {
  type: String,
  required: true,
  trim: true,
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 5,
  },
  password: {
    type: String,
    trim: true,
    minLength: 8,
    maxLength: 20,
    validate(value) {
      if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-z A-Z \d]{8,20}$/)) {
        throw new Error(
          "The password must contain: \n 1.at least an uppercase letter \n 2.at least a digit"
        );
      }
    },
  },
  firstname: { ...essentialItems, minLength: 2, maxLength: 20 },
  lastname: { ...essentialItems, minLength: 2, maxLength: 20 },
  birthdate: { type: String }, //data picker select date
  sex: { type: String, default: "male", enum: ["male", "female", "none"] },
  email: {
    ...essentialItems,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!value.match(/^([a-z \d]{3,15})@([a-z \d]{3,10})\.([a-z]{2,8})$/)) {
        throw new Error("email validation error");
      }
    },
  },

  phonenumber: {
    type: String,
    validate(value) {
      if (!value.match(/^(\d{11})$/)) {
        throw new Error("phone Number invalid!");
      }
    },
  },
  role: { type: String, default: "blogger", enum: ["admin", "blogger"] },
  createdAt: { type: Date, default: Date.now },
  avatar: {
    type: String,
    default: "/images/avatar/avatar.png",
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (user.password) {
    let hashPass = await bcrypt.hash(user.password, 10);
    this.password = hashPass;
    next();
  }
  next();
});


userSchema.pre("findOneAndUpdate", function (next) {
  let updatingInfo = this._update;
  if(updatingInfo.phonenumber && !updatingInfo.phonenumber.match(/^(\d{11})$/)){
    console.log("pre hook")

    throw Error("mongoose error: phonenumber is wrong")
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
