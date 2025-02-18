const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\w-]+.)+[\w-]+(\/[\w-]*)*\/?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL xD`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
