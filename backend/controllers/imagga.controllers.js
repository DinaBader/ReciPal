const got = (...args) => import('got').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const fs = require('fs');

async function getImageTags(req, res) {

    // const { image } = req.files;
    // if (!image) return res.sendStatus(400);

    // const imageName = move_image(image);
    // const imageUrl = `http://192.168.0.100:8000/item/${encodeURIComponent(imageName)}`;
    const imageUrl="https://pipingpotcurry.com/wp-content/uploads/2023/02/Red-Pepper-Carrot-on-baking-tray-Piping-Pot-Curry.jpg"
    console.log(imageUrl);
    
    try {
        const url = 'https://api.imagga.com/v2/tags?image_url=' + imageUrl;
        const response = await got(url, { username: process.env.apiKey, password: process.env.apiSecret });

        const imaggaApiResponse = JSON.parse(response.body);
        const tags = imaggaApiResponse.result.tags;

        const filteredTags = tags.filter(tag => tag.confidence >= 70);

        res.status(200).json({ tags: filteredTags });
    } catch (error) {
        if (error.response && error.response.body) {
            console.error(error.response.body);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error(error.message);
            res.status(500).json({ error: 'Unexpected Error' });
        }
    }
}

const move_image = (image) => {
    const lastIndex = image.name.lastIndexOf(".");
    const extension = image.name.slice(lastIndex + 1);
    const imageName = Date.now() + "." + extension;

    if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
        return res.status(400).send({ message: "Invalid image format" });
    }

    const { dirname } = require("path");
    const appDir = dirname(require.main.filename);
    const image_dir = appDir + "/public/item/" + imageName;
    image.mv(image_dir);
    return imageName;
}

const upload_image = async (req, res) => {
    const { image } = req.files;
    if (!image) return res.sendStatus(400);
    move_image(image);

    res.status(200).send("Image uploaded");
};


module.exports = { 
    getImageTags,
    upload_image
};
