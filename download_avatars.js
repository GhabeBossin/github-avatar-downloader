//requires ./secrets.js file for authentication token
var GITHUB_TOKEN = require('./secrets.js');
//requires node request package
var request = require('request');
var fs = require('fs');

//O HAI
console.log('Welcome to the GitHub Avatar Downloader!');

//create getRepoContributors, set params owner, repo, callback
function getRepoContributors(repoOwner, repoName, callback) {
  //store information for request
  var options = {
    //protocol, domain and path to what we are requesting from the api, pass params
    'url': 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    'headers': {
      'User-Agent': 'request',
      'Authentication': GITHUB_TOKEN
    }
  };
  request(options, function(err, response, body) {
    response.setEncoding('utf-8');
    //console.log('Type of data: ', typeof(body)); // === string
    //transform (parse) the body (JSON string) into an array
    var parsed = JSON.parse(body);
    //set parameters for callback
    callback(err, parsed);
  });
}

//create image downloading function, set params for url and path
function dlImageByURL(imgURL, pathToImg) {
  console.log('ANYTHING');
  request.get(imgURL)               // Note 1
      .on('error', function (err) {                                    // Note 2
        throw err;
      })
      .on('response', function (response) {
        console.log('Response Status Code: ' + response.statusCode + '\n' + 'Response Message: ' + response.statusMessage + '\n' + 'Content Type: ' + response.headers['content-type']);
        console.log('Downloading image...');
      })
      .on('end', function (){
        console.log('Downloaded image!');
      })
      .pipe(fs.createWriteStream(pathToImg));
}
dlImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");


//execute callback and pass in arguments, response becomes result
getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log('Errors:', err);
  //console.log('Result:', result); // === array of objects
  // assign result to contributor for clairity
  var contributor = result;
  //loop over the parsed array
  contributor.forEach(function(contributor) {
    //forEach contributor, log the value of their object key named 'avatar_url'
    console.log(contributor.avatar_url);
  });
});


// Pre-emptive thoughts given the command to run from user arguments
// var https = require('https');
// var myArgs = process.argv.slice(2);
// var repOwner = process.argv.slice[3];
// var repoName = process.argv.slice[4];