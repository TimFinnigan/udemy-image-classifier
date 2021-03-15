let model;

let imageFilePaths = [];

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
		img.setAttribute('id', 'image-' + i);
		img.setAttribute('src', 'unsorted/' + images[i]);

		let predictions = document.createElement('div');
		predictions.setAttribute('id', 'prediction-' + i);

		row.appendChild(img);
		row.appendChild(predictions);

		document.getElementById('main').appendChild(row);
	}
}

async function predict(num) {
	let img = document.getElementById('image-' + num);
	let predictions = document.getElementById('prediction-' + num);

	const prediction = await model.predict(img);

	for (let i = 0; i < prediction.length; i++) {
		let predictionText =
			prediction[i].className +
			': ' +
			prediction[i].probability.toFixed(5);

		predictions.appendChild(document.createElement('div'));
		predictions.childNodes[i].innerHTML = predictionText;
	}

	console.log(prediction);
}

function getPredictions() {
	for (let i = 0; i < imageFilePaths.length; i++) {
		predict(i);
	}
}

// Main thread
init().then(() => {
	document.getElementById('loading-message').style.display = 'none';

	loadFiles().then((images) => {
		imageFilePaths = images;
		addDomElements(images);
		document.getElementById('get-predictions-button').style.display =
			'block';
	});
});
