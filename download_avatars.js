// Pre-emptive thoughts given the command to run
// var https = require('https');
// var myArgs = process.argv.slice(2);
// var repOwner = process.argv.slice[3];
// var repoName = process.argv.slice[4];

var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});