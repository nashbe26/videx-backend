const Image = require('../models/image');

const updateImages = async (req, res) => {
 
    console.log("///////////",req.file);

    
     try {
        let imageUrl1 = req.file.originalname

    const images = await Image.findOne(); // Assuming there's only one document for images
    if (!images) {
      // Create the images if they don't exist
      await Image.create({ imageUrl_1: imageUrl1 });
    } else {
      // Update the existing images
      images.imageUrl_1 = imageUrl1;
      await images.save();
    }

    res.status(200).json({ message: 'Images updated successfully' });
  } catch (error) {
    console.error('Error updating images:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const updateImagesTwo = async (req, res) => {
 
    console.log("///////////",req.file);

    
     try {
        let imageUrl2 = req.file.originalname
        const images = await Image.findOne(); // Assuming there's only one document for images
    if (!images) {
      // Create the images if they don't exist
      await Image.create({imageUrl_2: imageUrl2 });
    } else {
      // Update the existing images
      images.imageUrl_2 = imageUrl2;
      await images.save();
    }

    res.status(200).json({ message: 'Images updated successfully' });
  } catch (error) {
    console.error('Error updating images:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const getImages = async (req, res) => {
 

    
     try {
        const images = await Image.findOne(); // Assuming there's only one document for images

    res.status(200).json(images);
  } catch (error) {
    console.error('Error updating images:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  updateImages,
  updateImagesTwo,

  getImages
};