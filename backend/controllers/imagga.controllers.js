const got = (...args) => import('got').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const fs = require('fs');

async function getImageTags(req, res) {
    const apiKey = 'acc_835aa1acaeac599';
    const apiSecret = '657be76654c8c4d4546041f2445a753d';
    
    const imageUrl = 'https://as1.ftcdn.net/v2/jpg/03/98/61/96/1000_F_398619615_g8iqFtDWH5gsKjE16H6iNQ6h8BhywuFS.jpg';

    try {
        const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);
        const response = await got(url, { username: apiKey, password: apiSecret });

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
};

async function uploadImage(req, res) {
    const apiKey = 'acc_835aa1acaeac599';
    const apiSecret = '657be76654c8c4d4546041f2445a753d';

    const filePath = '';
    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));

    try {
        const response = await got.post('https://api.imagga.com/v2/uploads', {
            body: formData,
            username: apiKey,
            password: apiSecret,
            responseType: 'json',
        });

        console.log(response.body);
        res.status(200).json(response.body);
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

module.exports = { 
    getImageTags,
    uploadImage 
};
