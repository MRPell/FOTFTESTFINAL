
// BroadcastList data array for filling in info box
let broadcastListData = [];

// DOM Ready =============================================================
$(document).ready(function () {


  getRecentBroadcasts();
  getFeaturedBroadcasts();
  // Populate the broadcasts on initial page load
  //populateRecents();

  //populateFeatured();  

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

// /**
//  * Fill featured with broadcasts
//  */
// function populateFeatured() {
//   console.log("hi")
//   $.getJSON('/')
//     .done(function (data) {

//       let broadcastUrl = data[0].broadcastTitle.replace(/\s/g, '-').toLowerCase();
//       $('#featuredBroadcastTitle').html(data[0].broadcastTitle);
//       $('#featuredBroadcastGuests').html(data[0].broadcastGuests);
//       $('#featuredBroadcastDescription').html('Helping Families Thrive, Hosted by ' + broadcastHosts);

//     })
//     .fail(function (data) {
//       console.log("Error retrieving broadcast data");
//     });
// }


// /**
//  * Fill recents with broadcasts
//  */
// function populateRecents() {
//   // Empty content string
//   let listContent = '';
//   // jQuery AJAX call for JSON

//   $.getJSON('/broadcast/recent')
//     .done(function (data) {


//       // For each item in our JSON,
//       // add a table row and cells to the content string
//       $.each(data, function () {
//         console.log(this.broadcastTitle);
//         let broadcastUrl = this.broadcastTitle.replace(/\s/g, '-').toLowerCase();
//         listContent +=
//           '<a href="/broadcast/details/' + broadcastUrl + '" > <li class="flexContainer recentBroadcastCard"><div><h3>Air Date:</h3>' +
//           moment(this.broadcastAirDate).format('MM/DD/YYYY') +
//           '</div><div><h2>' + this.broadcastTitle + '</h2><h3>' + this.broadcastGuests + '</h3></div></li></a > <br /> <hr /> <br />';
//       });
//       // Inject the whole content string into our existing HTML table
//       $('#recentEpisodesList').html(listContent);
//     })

//     .fail(function (data) {
//       console.log("Error retrieving broadcast data");
//     });
// }





