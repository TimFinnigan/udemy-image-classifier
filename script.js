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

// Create elements for containing each image and predictions
function addDomElements(images) {
	for (let i = 0; i < images.length; i++) {
		let row = document.createElement('div');
		row.setAttribute('class', 'row');

		let img = document.createElement('img');
		img.setAttribute('src', 'unsorted/' + images[i]);

		let predictions = document.createElement('div');

		row.appendChild(img);
		row.appendChild(predictions);

		document.getElementById('main').appendChild(row);
	}
}

function getPredictions() {
	console.log('button working');
}

// Main thread
init().then(() => {
	document.getElementById('loading-message').style.display = 'none';

	loadFiles().then((images) => {
		addDomElements(images);
		document.getElementById('get-predictions-button').style.display =
			'block';
	});
});
