const fs = require('fs');

let files = [];

fs.readdirSync('../unsorted').forEach((file) => {
	files.push(file);
});

fs.writeFileSync('../json/files.json', JSON.stringify(files), 'utf8');
