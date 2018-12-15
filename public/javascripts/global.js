
// BroadcastList data array for filling in info box
let broadcastListData = [];

// DOM Ready =============================================================
$(document).ready(function () {
  // Populate the user table on initial page load

  populateList();

  //Enable mobile menu Icon to be clicked
  document.getElementById("navIcon").addEventListener("click", toggleFooterMenu);

});

// Functions =============================================================


   //bring footer menu to front of screen
   function toggleFooterMenu(){
      console.log('toggle footer')
      let x = $('footer');
      x.toggleClass('bringToFront')

   }

/**
 * Fill table with data
 */
function populateList() {
  // Empty content string
  let listContent = '';
  // jQuery AJAX call for JSON
  $.getJSON('/broadcastList')
    .done(function (data) {
      
      // For each item in our JSON,
      // add a table row and cells to the content string
      $.each(data, function () {        
        let broadcastUrl = this.broadcastTitle.replace(/\s/g, '-' ).toLowerCase();
        console.log(broadcastUrl)
        listContent +=
          '<li> <a href="/broadcasts/'+broadcastUrl+'" class="linkBroadcast" rel="' +
          this.broadcastTitle + '">' + this.broadcastTitle +
          '</a></li>';
        listContent += '<li>' + this.broadcastHosts + '</li>';
        listContent += '<li>' + this.broadcastGuests + '</li>';
        listContent += '<li>' + moment(this.broadcastAirDate).format('MM/DD/YYYY') + '</li>';
      });

      // Inject the whole content string into our existing HTML table
      $('#broadcastList ul').html(listContent);

    })
      
    .fail(function (data) {
    console.log("Error retrieving broadcast data")
  });
}





