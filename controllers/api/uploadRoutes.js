const router = require('express').Router();
const { Images } = require('../../models').default;


router.post('/upload', async (req, res) => {
    try {
        const reqData = req.body;
        const userId = req.session.user_id;
        const createdImages = [];

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

router.delete('/delete/:id', async (req, res) => {
    try {
        const imageId = parseInt(req.params.id); // Parse req.params.id to integer
        console.log(req.params.id);
        
        await Images.destroy({ where: { image_id: imageId } });

        res.status(204).end(); // Send a success response
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    }
});

module.exports = router;