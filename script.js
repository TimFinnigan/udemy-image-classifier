let model;

// Load model
async function init() {
	const modelURL = './model/model.json';
	const metadataURL = './model/metadata.json';

	model = await tmImage.load(modelURL, metadataURL);
}

// Load filepaths from JSON file
function loadFiles() {
	return fetch('../json/files.json')
		.then((response) => response.json())
		.then((images) => {
			return images;
		});
}

// Main thread
init().then(() => {
	document.getElementById('loading-message').style.display = 'none';

	loadFiles().then((images) => {
		// addDomElements(images);
		console.log(images);
	});
});
