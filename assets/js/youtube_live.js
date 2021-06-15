/**
 * Sample JavaScript code for youtube.liveStreams.insert
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

var channel_id = '';

function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
    .then(function () {
      console.log("Sign-in successful");
      this.loadClient();
    },
      function (err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey("AIzaSyBZMF8rmTgcNk0dkvFHfACo7uIrtSOgcs4");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () {
      console.log("GAPI client loaded for API");
      this.execute();
    },
      function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.liveStreams.insert({
    "part": "snippet,cdn,contentDetails,status",
    "resource": {
      "snippet": {
        "title": "new video",
        "description": "video stream",
      },
      "cdn": {
        "frameRate": "60fps",
        "ingestionType": "rtmp",
        "resolution": "1080p"
      },
      "contentDetails": {
        "isReusable": true
      }
    }
  })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
      console.log("Channel Id", response.result.snippet.channelId);
      channel_id = response.result.snippet.channelId
      this.redirectLive();
    },
      function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "817017711630-iosbth1n2ctcaufef5mceogifq3u0gtb.apps.googleusercontent.com" });
});

function redirectLive() {
  window.location.href = "https://studio.youtube.com/channel/${channel_id}/livestreaming";
} 