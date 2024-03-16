const router = require('express').Router();
const { Images } = require('../../models');

router.post('/upload', async (req, res) => {
    try {
        const reqData = req.body;
        const userId = req.session.user_id;
        const createdImages = [];
        console.log(`UserID: ${userId}`);
        console.log('Returned Data:', reqData);
        console.log('Object:', reqData[0]);
        console.log('File URL:', reqData[0].fileUrl);

        for (let i = 0; i < reqData.length; i++) {
            try {
                console.log(i);
                const newImageData = await Images.create({
                    faces: i,
                    image_url: reqData[i].fileUrl,
                    user_id: userId
                });
        
                createdImages.push(newImageData);
            } catch (error) {
                console.error('Error creating image record:', error);
                // You can choose to handle the error differently here, such as logging it, 
                // sending a specific response, or even rolling back any previous changes if necessary.
                // For now, we'll push null to createdImages to maintain the length of the array.
                createdImages.push(null);
            }
        }

        // Send response after all images are created
        res.json(createdImages);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;