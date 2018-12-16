
// BroadcastList data array for filling in info box
let broadcastListData = [];

// DOM Ready =============================================================
$(document).ready(function () {

  // Populate the broadcasts on initial page load
  getRecentBroadcasts();
  getFeaturedBroadcasts();



  //Enable mobile menu Icon to be clicked
  document.getElementById("navIcon").addEventListener("click", toggleFooterMenu);

});

// Functions =============================================================


let getRecentBroadcasts = function () {

  fetch('/broadcast/recent')
  .then(response => response.json())
    .then(recentBroadcastsJson => {
      populateRecents(recentBroadcastsJson);
    })
    .catch (error => {
console.log(error)
    });
};

let getFeaturedBroadcasts = function () {

  fetch('/broadcast/featured')
  .then(response => response.json())
    .then(featuredBroadcastsJson => {
      populateFeatured(featuredBroadcastsJson);
    })
    .catch (error => {
console.log(error)
    });
};

let populateRecents = function (data){
  let listContent = '';
  $.each(data, function () {
    console.log(this.broadcastTitle);
    let broadcastUrl = this.broadcastTitle.replace(/\s/g, '-').toLowerCase();
    listContent +=
      '<a href="/broadcast/details/' + broadcastUrl + '" > <li class="flexContainer recentBroadcastCard"><div><h3>Air Date:</h3>' +
      moment(this.broadcastAirDate).format('MM/DD/YYYY') +
      '</div><div><h2>' + this.broadcastTitle + '</h2><h3>' + this.broadcastGuests + '</h3></div></li></a > <br /> <hr /> <br />';
  });
// Inject the whole content string into our existing HTML table
$('#recentEpisodesList').html(listContent);

}

let populateFeatured = function (data){
   let featuredBroadcast = data[0];
   $('#featuredBroadcastTitle').html(featuredBroadcast.broadcastTitle);
   $('#featuredBroadcastGuests').html(featuredBroadcast.broadcastGuests);
   $('#featuredBroadcastDescription').html('Helping Families Thrive, Hosted by ' + featuredBroadcast.broadcastHosts);

}

//bring footer menu to front of screen
function toggleFooterMenu() {
  console.log('toggle footer')
  let x = $('footer');
  x.toggleClass('bringToFront')

}

