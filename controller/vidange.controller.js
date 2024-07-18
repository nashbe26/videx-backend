const Vidange = require("../models/vidange");
const qrCodeGenerator = require("qrcode");
const path = require("path");

const createVidange = async (req, res) => {
  try {
    const nouvelleVidange = new Vidange(req.body);
    nouvelleVidange.user_id = req.route.meta.user._id;

    const myOldVidange = await Vidange.find({
      user_id: req.route.meta.user._id,
    })
      .sort({ orderNumber: -1 })
      .limit(1);

    if (myOldVidange.length > 0) {
      nouvelleVidange.orderNumber = myOldVidange[0].orderNumber + 1;
    } else {
      nouvelleVidange.orderNumber = 1;
    }

    const url = "https://admin.auto-videx.com/vidange/" + nouvelleVidange._id;
    await qrCodeGenerator.toFile(
      path.join(
        __dirname,
        "..",
        "public",
        "qrcodes",
        nouvelleVidange._id + ".png"
      ),
      url
    );
    const qrImagePath =
      "https://www.auto-videx.com/public/qrcodes/" +
      nouvelleVidange._id +
      ".png";

    nouvelleVidange.qr_code = qrImagePath;

    const vidange = await nouvelleVidange.save();

    res.status(200).json(vidange);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getVidangeById = async (req, res) => {
  try {
    const user = req.route.meta.user;

    const vidange = await Vidange.findById(req.params.id);

    console.log(vidange);

    if (!vidange) {
      return res.status(404).json({ error: "vidange non trouvée" });
    }
    // console.log(vidange.user_id._id);
    // console.log(user._id);
    // if (vidange.user_id._id != user._id) {
    //   return res.status(404).json({ error: "vidange non trouvée" });
    // }

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
  getVidangeById,
  getVidangeByMyId,
};
