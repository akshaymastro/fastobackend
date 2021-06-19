var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj"
    };
    
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    
    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
  };
  
  var message = { 
    app_id: "47c416f5-70ac-4016-8c8b-5dfc97c58368",
    contents: {"en": "English Message"},
    channel_for_external_user_ids: "push",
    include_external_user_ids: ["6392d91a-b206-4b7b-a620-cd68e32c3a76","76ece62b-bcfe-468c-8a78-839aeaa8c5fa","8e0f21fa-9a5a-4ae7-a9a6-ca1f24294b86"]
  };
  
  sendNotification(message);