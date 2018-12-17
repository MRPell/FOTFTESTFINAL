
// BroadcastList data array for filling in featured Box
//keep track of index to prevent unnecessary server calls
let broadcastListData = [];
let featuredBroadcastIndex = 0;

// DOM Ready =============================================================
$(document).ready(function () {
  // Populate the broadcasts on initial page load
  getRecentBroadcasts();
});


// Functions BEGIN========================================================

// data gathering and page rendering =============================
let getRecentBroadcasts = function () {

  fetch('/broadcast/recent')
    .then(response => response.json())
    .then(recentBroadcastsJson => {
      broadcastListData = recentBroadcastsJson;
      populateRecents(recentBroadcastsJson);
      populateFeatured();
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
      '<a href="#" class="changeFeaturedBroadcast" rel="' + this.broadcastTitle + '">' +
      '<li class="flexContainer recentBroadcastCard"><div><h3>Air Date:</h3>' +
      '<h4>' + moment(this.broadcastAirDate).format('ddd') + ' ' +
      moment(this.broadcastAirDate).format('MM/DD/YYYY') + '</h4>' +
      '</div><div><h2>' + this.broadcastTitle + '</h2><h3>' + this.broadcastGuests + '</h3></div></li>' +
      //'</a >' +
      '<br /> <hr /> <br />';
  });

  // Inject the whole content string into recent broadcast list
  $('#recentEpisodesList').html(listContent);
}

let populateFeatured = function () {
  let featuredBroadcast = broadcastListData[featuredBroadcastIndex];
  let broadcastPlayer = $("#broadcastPlayer")[0];
  let yesterday = moment().subtract(1, 'days');

  updateSelectionArrows();

  if (moment(featuredBroadcast.broadcastAirDate).isSameOrBefore(yesterday)) {
    $('#featuredBroadcastDate').html(moment(featuredBroadcast.broadcastAirDate).format('ddd MM/DD/YYYY'))
  }
  else {
    $('#featuredBroadcastDate').html("Today's Broadcast")
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

// Feature the Broadcast Info
function changeFeaturedBroadcast(event) {
  let thisTitleName = $(this).attr('rel');
  // Get Index of object based on id value
  featuredBroadcastIndex = broadcastListData.map(function (arrayItem) {
    return arrayItem.broadcastTitle;
  })
    .indexOf(thisTitleName);
  populateFeatured()
}
//End Data gathering and rendering=====================



//GUI Control functions Begin ======================================


//a function to Listen for navigation icons to be clicked
$(
  function () {
    //nav arrows
    $('#nextArr').on('click', function () {
      featuredBroadcastIndex -= 1;
      populateFeatured()
    })

    //nav arrows
    $('#prevArr').on('click', function () {
      featuredBroadcastIndex += 1;
      populateFeatured()
    })

    //menu Icon
    $('#navIcon').on('click', function () {
      //bring footer menu to front of screen
      let footerMenu = $('footer');
      footerMenu.toggleClass('bringToFront')
    })

    // Broadcast link click
    $('#recentEpisodesList').on('click', 'a.changeFeaturedBroadcast', changeFeaturedBroadcast);

    //Audio Player Button 
    $('.playButton').on('click', toggleAudio);
  });

  let updateSelectionArrows = function () {
    if (featuredBroadcastIndex === 0) {
      $(".rightArrow").hide();
      $(".leftArrow").show();
    }
    else if (featuredBroadcastIndex === (broadcastListData.length - 1)) {
      $(".rightArrow").show();
      $(".leftArrow").hide();
    }
    else {
      $(".rightArrow").show();
      $(".leftArrow").show();
    }
  }
  
  //turn audio on an off as well as change play button
  let toggleAudio = function () {
    let broadcastPlayer = $("#broadcastPlayer");
    let playPauseButton = $('.playPause');
  
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
  }