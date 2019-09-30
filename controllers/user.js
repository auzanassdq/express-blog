const objectId = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UserImage = require("../models/userImage");

module.exports = {
  getAllUser: (req, res) => {
    User.find()
      .populate("addresses", "address")
      .then(result => {
        res.send(result);
      });
  },

  addUser: async (req, res) => {
    try {
      const existedUser = await User.findOne({ name: req.body.name });
      console.log(existedUser)

      if (existedUser) {
        res.status(404).send({
          message: "user already exist, please continue to login"
        });
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, async function(err, hash) {
            if (!err) {

              const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash
              });
              console.log(req.body.password + hash)
  
              // const userAvatar = await UserImage.create({
              //   filename: req.files[0].filename,
              //   path: req.files[0].path
              // })             // const userAvatar = await UserImage.create({
              //   filename: req.files[0].filename,
              //   path: req.files[0].path
              // })
  
              // await User.findByIdAndUpdate(
              //   { _id: user._id },
              //   { $push: { avatar: userAvatar._id} },
              //   { new: true}
              // )
  
  
              // await User.findByIdAndUpdate(
              //   { _id: user._id },
              //   { $push: { avatar: userAvatar._id} },
              //   { new: true}
              // )
  
              res.status(200).send({
                message: "user created",
                newUser
                // userAvatar
              });
            } else {
              res.send({
                message: "password is invalid"
              });
            }
          });
        });
      } 
    } catch (error) {
      res.status(400).send({
        message: "user failed to create",
        error: error.message
      });
    }
  },

  deleteUser: (req, res) => {
    User.deleteOne({ _id: objectId(req.body.id) }, (err, result) => {
      try {
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
        console.log(err);
      }
    });
  },

  updateTodo: (req, res) => {
    User.updateOne(
      {
        _id: { $eq: objectId(req.body.id) }
      },
      {
        $set: req.body
      },
      (err, result) => {
        try {
          res.send(result);
        } catch (error) {
          console.log(error);
          console.log(err);
        }
      }
    );
  },

  uploadImage: (req, res) => {
    UserImage.create({
      filename: req.files[0].filename,
      path: req.files[0].path
    })
      .then(result => res.send(result))
      .catch(error => res.send(error));
  },

  login: async (req, res) => {
    const existedUser = await User.findOne({name: req.body.name})
    const valid = bcrypt.compareSync(req.body.password, existedUser.password)

    if (valid) {
      const token = await jwt.sign(
        {data: existedUser},
        "secret",
        {expiresIn: "1h"}
      )

      res.send({
        token
      })
    } else {
      res.send({message: "password is not valid"})
    }
  }

};
