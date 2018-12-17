
// BroadcastList data array for filling in info box
let broadcastListData = [];

// DOM Ready =============================================================
$(document).ready(function () {

  // Populate the broadcasts on initial page load
  getRecentBroadcasts();
  getFeaturedBroadcasts();

  //Enable mobile menu Icon to be clicked
  document.getElementById("navIcon").addEventListener("click", toggleFooterMenu);

  //Enable mobile menu Icon to be clicked
  document.getElementById("navIcon").addEventListener("click", toggleFooterMenu);

});

// Functions BEGIN========================================================

// data gathering and page rendering =====================================
let getRecentBroadcasts = function () {

  fetch('/broadcast/recent')
    .then(response => response.json())
    .then(recentBroadcastsJson => {
      broadcastListData = recentBroadcastsJson;
      populateRecents(recentBroadcastsJson);
    })
    .catch(error => {
      console.log(error)
    });
};

let getFeaturedBroadcasts = function () {

  fetch('/broadcast/featured')
    .then(response => response.json())
    .then(featuredBroadcastsJson => {

      populateFeatured(featuredBroadcastsJson);
    })
    .catch(error => {
      console.log(error)
    });
};

let populateRecents = function (data) {
  let listContent = '';
  $.each(data, function () {
    let broadcastUrl = this.broadcastTitle.replace(/\s/g, '-').toLowerCase();
    listContent +=
      //'<a href="/broadcast/details/' + moment(this.broadcastAirDate).format('MM-DD-YYYY') + '" >' +
      '<a href="#" class="showBroadcastDetails" rel="' + this.broadcastTitle + '">' +
      '<li class="flexContainer recentBroadcastCard"><div><h3>Air Date:</h3>' +
      '<h4>' + moment(this.broadcastAirDate).format('ddd') + ' ' +
      moment(this.broadcastAirDate).format('MM/DD/YYYY') + '</h4>' +
      '</div><div><h2>' + this.broadcastTitle + '</h2><h3>' + this.broadcastGuests + '</h3></div></li>' +
      //'</a >' +
      '<br /> <hr /> <br />';
  });
  // Inject the whole content string into our existing HTML table
  $('#recentEpisodesList').html(listContent);
  // Username link click
  $('#recentEpisodesList').on('click', 'a.showBroadcastDetails', showBroadcastDetails);
}

let populateFeatured = function (data) {
  let featuredBroadcast = data[0];
  let broadcastPlayer = $("#broadcastPlayer")[0];
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (moment(featuredBroadcast.broadcastAirDate).isSameOrBefore(yesterday)) {
    $('#featuredBroadcastDate').html(moment(featuredBroadcast.broadcastAirDate).format('ddd MM/DD/YYYY'))
  }
  $('#featuredBroadcastTitle').html(featuredBroadcast.broadcastTitle);
  $('#featuredBroadcastGuests').html('Broadcast Guest(s): ' + featuredBroadcast.broadcastGuests);
  $('#featuredBroadcastDescription').html(featuredBroadcast.broadcastDescription);
  $('#audioSource').attr("src", "/audio/" + featuredBroadcast.audioFile);
  broadcastPlayer.load();
  if (featuredBroadcast.broadcastImage !== "") {
    $('#featuredBroadcastSection').css("background", "url('/images/" + featuredBroadcast.broadcastImage + "')");
  }

}


// Show Broadcast Info
function showBroadcastDetails(event) {
  // Prevent Link from Firing
  // event.preventDefault();
  let thisTitleName = $(this).attr('rel');
  // Get Index of object based on id value
  let arrayPosition = broadcastListData.map(function (arrayItem) { return arrayItem.broadcastTitle; }).indexOf(thisTitleName);
  let broadcastObject = [broadcastListData[arrayPosition]];
  populateFeatured(broadcastObject)
}
  //End Data gathering and rendering======================================================

  //bring footer menu to front of screen
  function toggleFooterMenu() {
    console.log('toggle footer')
    let x = $('footer');
    x.toggleClass('bringToFront')

  }


  //Audio Player Button ===============================================================
  $(
    function () {
      let broadcastPlayer = $("#broadcastPlayer");
      let playPauseButton = $('.playPause');
      $('.playButton').on('click', function () {

        broadcastPlayer.show();

        if (broadcastPlayer[0].paused) {
          broadcastPlayer[0].play();
          playPauseButton.removeClass('fa-play-circle');
          playPauseButton.addClass('fa-pause');
        }
        else {
          broadcastPlayer[0].pause();
          playPauseButton.removeClass('fa-pause');
          playPauseButton.addClass('fa-play-circle');
        }
      })

    });