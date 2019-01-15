// Pre-emptive thoughts given the command to run
// var https = require('https');
// var myArgs = process.argv.slice(2);
// var repOwner = process.argv.slice[3];
// var repoName = process.argv.slice[4];

var GITHUB_TOKEN = require(secrets.js);
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authentication': GITHUB_TOKEN,
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});