const User = require("../models/user");
const bcrypt = require("bcrypt");
const load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.user = user;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find();
    res.status(200).json({ user: allUser });
  } catch (err) {
    res.status(401).json({ err });
  }
};

const loggedIn = (req, res) => res.json(req.route.meta.user);

const updateUser = async (req, res, next) => {
  try {
    let modifyUser = req.body;

    let updateUser = await User.findByIdAndUpdate(
      req.route.meta.user._id,
      { ...modifyUser },
      { returnOriginal: false }
    );
    return res.status(200).json({ user: updateUser });
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    let modifyUser = req.body;
    if (modifyUser.password.length > 0 && modifyUser.password) {
      const hashedPassword = await bcrypt.hash(modifyUser.password, 10);
      modifyUser.password = hashedPassword;
    }

    let updateUser = await User.findByIdAndUpdate(
      req.route.meta.user._id,
      { ...modifyUser },
      { returnOriginal: false }
    );
    return res.status(200).json({ user: updateUser });
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
};

const addToFav = async (req, res) => {
  try {
    let user = await User.findOne(req.route.meta.user._id);

    if (user.fav_prod.includes(req.body.id)) {
      return res
        .status(400)
        .json({
          error: "Vous avez déjà ajouté ce produit dans votre liste de favoris",
        });
    }

    user.fav_prod.push(req.body.id);
    await user.save();

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add product" });
  }
};

const deleteToFav = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.route.meta.user._id });

    const index = user.fav_prod.indexOf(req.body.id);
    if (index !== -1) {
      user.fav_prod.splice(index, 1);
      await user.save();
    } else {
      return res
        .status(400)
        .json({
          error: "Vous avez déjà ajouté ce produit dans votre liste de favoris",
        });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

const updatePhoto = async (req, res, next) => {
  try {
    if (!req.file) throw new Error("No image provided");

    let updateUser = await User.findByIdAndUpdate(
      req.route.meta.user._id,
      { photo: req.file.originalname },
      { returnOriginal: false }
    );
    return res.status(200).json({ user: updateUser });
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.deleteMany({ _id: { $in: req.params.ids.split(",") } });
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    res.status(401).json({ err });
  }
};

module.exports = {
  getAllUser,
  updateUser,
  updatePhoto,
  deleteUser,
  load,
  loggedIn,
  addToFav,
  deleteToFav,
  updateUserPassword,
};
