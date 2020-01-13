// 1. Search

var UI = {};

UI.EnterPress = function(){
    
  document.querySelector(".js-search").addEventListener('keyup',function (e) {
  if (e.which == 13){
      var userInput = getInput();
      console.log(userInput);
      soundCloudAPI.getTrack(userInput);

  }
});

}

UI.SubmitClick = function(){
    document.querySelector(".js-submit").addEventListener('click',function () {
    var userInput = getInput();
    console.log(userInput);
    soundCloudAPI.getTrack(userInput);

});

}


UI.EnterPress();
UI.SubmitClick();

function getInput(){
    var inp = document.querySelector(".js-search").value;
    return inp;
}

// 2. Query Soundcloud API


var soundCloudAPI = {};
  
soundCloudAPI.init = function(){
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });

}

soundCloudAPI.init();
soundCloudAPI.getTrack = function (inputValue) {
  // find all sounds of buskers licensed under 'creative commons share alike'
  SC.get('/tracks', {   
    q: inputValue
  }).then(function(tracks) {
    console.log(tracks);
    soundCloudAPI.renderTracks(tracks);
    
  });
}



//soundCloudAPI.getTrack("Justin Bieber");

soundCloudAPI.renderTracks = function(tracks) {

  var label = document.createElement('h2');
  label.innerHTML = "Search Results for "+ getInput();

  var lbl = document.querySelector('.label');
  lbl.appendChild(label);

  tracks.forEach(function(track){
  console.log(track.artwork_url);
  var card = document.createElement('div');
  card.classList.add('card');

  //image
  var divImage = document.createElement('div');
  divImage.classList.add('image');

  var image_img = document.createElement('img');
  image_img.classList.add('image_img');
  image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract';

  divImage.appendChild(image_img);

  //content
  var content = document.createElement('div');
  content.classList.add('content');

  var header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = ('<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>');

  //button
  var button = document.createElement('div');
  button.classList.add('ui','bottom','attached','button','js-button');

  button.addEventListener('click', function(trackURL){
    soundCloudAPI.getEmbed(track.permalink_url);
  });


  var icon = document.createElement('i');
  icon.classList.add('add','icon');

  var buttonText = document.createElement('span');
  buttonText.innerHTML = 'Add to playlist';

  
  content.appendChild(header);
  button.appendChild(icon);
  button.appendChild(buttonText);

  card.appendChild(divImage);
  card.appendChild(content);
  card.appendChild(button);

  var searchResults = document.querySelector('.js-search-results');
  searchResults.appendChild(card);


  });
  //card
  
}


soundCloudAPI.getEmbed = function(trackURL){
  console.log("Click");
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then(function(embed){
    console.log('oEmbed response: ', embed);
    var sideBar = document.querySelector('.js-playlist');
   // sideBar.innerHTML = embed.html;

    var box = document.createElement('div');
    box.innerHTML = embed.html;

    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key", sideBar.innerHTML);
    //alert(sideBar.innerHTML);  
  });

}
 
var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");