var notVerifiedPreviously = !amplify.store('different-shipping-address')

if (notVerifiedPreviously){
  alert("no local storage doing the ui thing")
} else {
  alert("I have your object in your local storage :-). In the future you're authed and go right to chat dash")
  
}

globalLat = null
globalLng = null
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// log errors
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

// log errors
function success(data) {

  var coords    = data.coords,
      lat       = coords.latitude,
      lng       = coords.longitude;
      globalLat = lat;
      globalLng = lng;
  translateToHumanReadable(data)
};


function showLocation(humanReadable){
  $(".loader").fadeOut()
  var inputEl = $(".location-verifier");
  $(".location-verifier .placeholder").html("<span class='labelish'>Is this your address?</span><br> " + humanReadable)
  inputEl.fadeIn()
  $(".location-verifier .yes").fadeIn()
  $(".location-verifier .no").fadeIn()

}

function translateToHumanReadable(obj){
  var lat = obj.coords.latitude, 
      lng = obj.coords.longitude,
      url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true";

  $.ajax({
    dataType: "json",
    url: url
  }).done(function(data) {
    showLocation(data.results[0].formatted_address)
    // $(".using-location .a_better_adress").val()
  })  
}



function verifiedADdress(){
  var Params = {
    humanReadable: $('.placeholder').text(),
    lat:           globalLat,
    lng:           globalLat
  }

  amplify.store('verified-location',Params)

  $.ajax({
  type: "POST",
  url: "/set_location_data",
  data: Params,
  success: success,
  dataType: "JSON"
});


  // alert("coo")
  var elWrapper = $(".location-verifier");
  $(".labelish,.no,.yes").fadeOut()

  $(".location-verifier").css({
    "margin-top":"15px",
    "padding": "0 40px"
  })
  $(".placeholder").addClass("verified");
 
  // var cachedBefore =  $(".verified").html();
  // $(".verified").html(cachedBefore+'<i class="fa fa-times"></i>')

}

// async function retunrs that long if poss
navigator.geolocation.getCurrentPosition(success, error, options);


// DOM READY

$(function() {
  $('.menu-link').bigSlide();


  // EVENTS
  $( ".btn.yes" ).click(function() {
    verifiedADdress()
  });

  $( ".btn.no" ).click(function() {
    alert( "Handler for .click() called." );
  });


});













