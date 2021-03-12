let model;

// Load model
async function init() {
	const modelURL = './model/model.json';
	const metadataURL = './model/metadata.json';

	model = await tmImage.load(modelURL, metadataURL);
}

// Main thread
init().then(() => {
	document.getElementById('loading-message').style.display = 'none';
});
