$(document).ready(function() {

  var url = "";
  var logoURL;
  //example url: https://api.twitch.tv/kraken/users/imaqtpie?client_id=8kua93znd6mwpfltd5dzq1j41jz09s

  var fccName = "freecodecamp";
  var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "imaqtpie"];

  // set url value
  //getResponse.url = "https://api.twitch.tv/kraken/streams/" + streamName;

  //ajax call
  //$.ajax(getResponse);

  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/" + fccName,
    "headers": {
      "Accept": "application/vnd.twitchtv.v3+json",
      "Client-ID": "8kua93znd6mwpfltd5dzq1j41jz09s"
    },
    "success": function(data) {
      showFCCStatus(data);
    },
    "error": function() {
      console.log("Twitch down...");
    }
  });

  function showFCCStatus(data1) {
    if (data1.stream === null) {
      $("#fcc").html("<a target = blank href = https://www.twitch.tv/freecodecamp>Free Code Camp</a> is Offline");
    } else {
      $("#fcc").html("<a target = blank href = https://www.twitch.tv/freecodecamp>Free Code Camp</a> is Online");
    }
  }

  for (var i = 0; i < streams.length; i++) {
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/channels/" + streams[i],
      "headers": {
        "Accept": "application/vnd.twitchtv.v3+json",
        "Client-ID": "8kua93znd6mwpfltd5dzq1j41jz09s"
      },
      success: function(data2) {
        console.log(data2);
        var logoURL = data2.logo;
        console.log(logoURL);
        
        
        
        
        
        $.getJSON("https://api.twitch.tv/kraken/streams/" + data2.name + "?client_id=8kua93znd6mwpfltd5dzq1j41jz09s").done(function(data3) {
          var displayName = data3._links.self.slice(37);
          console.log(displayName);
          
          if (data3.stream === null) {
            $("#person").append('<a href= "https://www.twitch.tv/' + displayName + '">' + displayName + '</a><br>');
            $("#stats").append("Offline... <br>");
            $("#logo").append("<img style='width:20px;height:20px;' src =" + logoURL  + ">" + "<br>");
            
          } 
          else {
            $("#person").append('<a href= "https://www.twitch.tv/' + displayName + '">' + displayName + '</a><br>');
            $("#stats").append("Online! <br>");
            $("#logo").append("<img style='width:20px;height:20px;' src =" + logoURL  + ">" + "<br>");
          }
        });
      },
      error: function(error) {
         $("#person").append('Channel Broken!<br>');
         $("#stats").append("Offline... <br>");
         $("#logo").append("broken channel" + "<br>");
         
      }

    });

  }

});