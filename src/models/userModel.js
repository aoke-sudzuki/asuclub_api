const { Schema, model } = require("mongoose");

const schema = new Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  user_login: {
    type: String,
    required: true,
    min: [8, 'The login must be at least 8 and no more than 48 characters long'],
    max: 48,
    unique: true
  },
  user_pass: {
    type: String,
    required: true,
    min: [8, 'The password must be at least 8 and no more than 48 characters long'],
    max: 48
  },
  user_link: {
    type: String,
    required: true,
    min: [8, 'The link must be at least 8 and no more than 48 characters long'],
    max: 48,
    unique: true
  },
  user_token: {
    type: String,
    required: true,
    unique: true,
    max: 155
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email adress!`
    },
  },
  user_nickname: {
    type: String,
    required: true,
    min: [8, 'The nickname must be at least 8 and no more than 48 characters long'],
    max: 48,
  },
  user_reg_date: {
    type: Number,
    required: true,
  },
  user_conf: {
    type: Boolean,
    default: false,
  },
  user_conf_code: {
    type: String,
    required: true,
    unique: true,
    max: 155
  },
});


module.exports = model("User", schema);
