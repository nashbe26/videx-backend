const Vidange = require("../models/vidange");

const createVidange = async (req, res) => {
  try {
    const nouvelleVidange = new Vidange(req.body);
    nouvelleVidange.user_id = req.route.meta.user._id;
    const vidange = await nouvelleVidange.save();

    res.status(200).json(vidange);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const getVidangeByMyId = async (req, res) => {
  try {
    const vidange = await Vidange.find({
      user_id: req.route.meta.user._id,
    }).sort({ createdAt: -1 });
    if (!vidange) {
      return res.status(404).json({ error: "vidange non trouvée" });
    }
    res.status(200).json(vidange);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVidange,
  getVidangeByMyId,
};
