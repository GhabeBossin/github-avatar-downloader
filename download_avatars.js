// Pre-emptive thoughts given the command to run
// var https = require('https');
// var myArgs = process.argv.slice(2);
// var repOwner = process.argv.slice[3];
// var repoName = process.argv.slice[4];

//requires ./secrets.js file for authentication token
var GITHUB_TOKEN = require('./secrets.js');
//requires node request package
var request = require('request');

//O HAI
console.log('Welcome to the GitHub Avatar Downloader!');

//create getRepoContributors
function getRepoContributors(repoOwner, repoName, callback) {
  //store information for request
  var options = {
    //protocol, domain and path to what we are requesting from the api
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authentication': GITHUB_TOKEN
    }
  };
  request(options, function(err, response, body) {
    response.setEncoding('utf-8');
    //console.log('Type of data: ', typeof(body)); // === string
    //transform (parse) the body (JSON string) into an array
    var parsed = JSON.parse(body);
    //give parameters for callback
    callback(err, parsed);
  });
}


//execute callback and pass in arguments, response becomes result
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //console.log("Result:", result); // === array of objects
  // assign result to contributor for clairity
  var contributor = result;
  //loop over the parsed array
  contributor.forEach(function(contributor) {
    //forEach contributor, log the value of their object key named 'avatar_url'
    console.log(contributor.avatar_url);
  });
});