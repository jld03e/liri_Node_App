require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var keys = require("./keys.js");
var request = require('request');

var command = process.argv[2];
console.log(command);

//code to concatenate arguments into one process.argv
var title = ''; 
for (j=3; j<process.argv.length; j++) {
  //title = title + process.argv[j] + " "
  title += process.argv[j] + " "
};

console.log(title);

//code for twitter command
var myTweets = function() {
  var client = new Twitter(keys.twitter);
  var params = {screen_name: 'SueBuSo'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  
  if (!error) {
    for (i=0; i<tweets.length; i++) {
      console.log("Created At: " + tweets[i].created_at);
      console.log(" Tweet:" + tweets[i].text);
      console.log("----------------------------");
    }
  }
      //console.log(JSON.stringify(tweets[0], null, 2));
});
};

if (command === 'my-tweets') {
  myTweets();
};


// spotify work begins here:
var spotify = new Spotify(keys.spotify);
var nameThatSong = function() {
spotify.search({ type: 'track', query: title }, function(err, data) {

  if (err) {

    return console.log('Error occurred: ' + err);

}
var songInfo = data.tracks.items;
//console.log(songInfo[0]);
console.log("------------- Song Info -------------------");
console.log("Artist(s): " + songInfo[0].artists[0].name);
console.log("Song Name: " + songInfo[0].name);
console.log("Preview Link: " + songInfo[0].preview_url);
console.log("Album: " + songInfo[0].album.name);
console.log("-----------------------------------------");
});
};

if (command === 'spotify-this-song') {
  nameThatSong();
}

