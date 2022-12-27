const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
	let { prompt, size } = req.body;

	switch (size) {
		case "small":
			size = "256x256";
			break;
		case "medium":
			size = "512x512";
			break;
		default:
			size = "1024X1024";
	}

	try {
		const response = await openai.createImage({
			prompt,
			n: 1,
			size,
		});

		const imageUrl = response.data.data[0].url;

		res.status(200).json({
			status: true,
			data: imageUrl,
		});
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}
		res.status(400).json({
			status: false,
			message: "The image could not be generated",
		});
	}
};

module.exports = {
	generateImage,
};
