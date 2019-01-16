
//get console input for repoOwner and repoName
var myArgs = process.argv.slice(2);
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
    //transform (parse) the body (JSON string) into an array
    var parsed = JSON.parse(body);
    //set parameters for callback
    callback(err, parsed);
  });
}

//create image downloading function, set params for url and path
function dlImageByURL(imgURL, pathToImg) {
  request.get(imgURL)
      .on('error', function (err) {
        throw err;
      })
      .on('end', function (){
        console.log('Downloaded image!');
      })
      .pipe(fs.createWriteStream(pathToImg));
}

//execute callback and pass in arguments, response becomes result
getRepoContributors(myArgs[0], myArgs[1], function(err, result) {
  console.log('Errors:', err);
  // assign result to contributor for clairity
  var contributor = result;
  //loop over the parsed array, create imgURL and pathToImg
  contributor.forEach(function(contributor) {
    dlImageByURL(contributor.avatar_url, 'avatars/' + contributor.login + '.jpg');
  });
});
