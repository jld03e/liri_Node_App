require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require('fs');
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


//omdbapi code written here:
var movieThis = function() {
request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&tomatoes=true&apikey=a08a9b05", function(error, response, movies) {
  if (!error && response.statusCode === 200) {
    console.log("The movie's Title is: " + JSON.parse(movies).Title);
    console.log(JSON.parse(movies).Title + " came out in: " + JSON.parse(movies).Year);
    console.log(JSON.parse(movies).Title + "'s IMDB Rating is: " + JSON.parse(movies).imdbRating);
    console.log(JSON.parse(movies).Title + "'s Rotten Tomatoes rating is: " + JSON.parse(movies).tomatoMeter);
    console.log(JSON.parse(movies).Title + "'s country of production is: " + JSON.parse(movies).Country);
    console.log(JSON.parse(movies).Title + "'s native language is: " + JSON.parse(movies).Language);
    console.log(JSON.parse(movies).Title + "'s plot is: " + JSON.parse(movies).Plot);
    console.log(JSON.parse(movies).Title + "'s starring actors are: " + JSON.parse(movies).Actors);
  }
  if(movies.length < 1) {
    return console.log('No movies were found!');
  }
});
};

if (command === 'movie-this') {
  movieThis();
};


//fs code starts here:
fs.readFile("random.txt", "utf8", function(err, data) {

  if (err) {
    return console.log(err);
  }

  var dataArr = data.split(",");
  console.log(dataArr[1]);

  if (command === 'do-what-it-says') {
    title = dataArr[1]
    nameThatSong();
  };

  });
