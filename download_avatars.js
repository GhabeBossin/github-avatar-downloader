
var http = require('http');
var myArgs = process.argv.slice(2);
var repOwner = process.argv.slice[3];
var repoName = process.argv.slice[4];

function requesting(cb) {
  http.get('https://api.github.com', function(response) {
    if (response.statusCode !== 200) {
      cb(new Error('Status code not successful: ' + response.statusCode), null);
      return;
    }
  });
}