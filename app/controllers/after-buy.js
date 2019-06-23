const database = require("../../config/database");

module.exports = async function(controller) {
  controller.on("facebook_postback", async (bot, message) => {
    if (message.text.includes("Follow")) {
      await bot.reply(message, "Your link is activated");
    }
  });

// Share phone
  controller.on("facebook_postback", async (bot, message) => {
    if (message.text.includes("buy")) {
      database.addPurchase(message.user, message.text[message.text.length - 1]);

      await bot.reply(message, {
        "text": "Please share your phone",
        "payload": "Number",
        "quick_replies": [
          {
            "content_type": "user_phone_number",
            "image_url": "http://icons.iconarchive.com/icons/double-j-design/super-mono-3d/32/iphone-icon.png"
          }
        ]
      });
    }
  });

  //Share location
  controller.on("message", async (bot, message) => {

    if (message.quick_reply && message.quick_reply.payload === message.text) {

      await bot.reply(message, {
        "text": "Please share your location for delivery",
        "quick_replies": [
          {
            "content_type": "location",
            "payload": "Location",
            "image_url": "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Azure-icon.png"
          }
        ]
      });
    }
  });

  /*controller.on('message', async (bot, message) => { 
    //  console.log("Congratulations"); 
    //  var ldkfld= message.attachment[0].type
     console.log('message type => ', message); 

     if (message.attachments[0].type === 'location') {
            console.log('test congrats message');

          await bot.reply(message, {
                "text": "Please share your location for delivery", 
                "quick_replies":[
                    {
                    "content_type":"location",
                    "payload":"Location",
                    "image_url":"http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Azure-icon.png"
                    }
                ]
            });
        }
    });
*/
};
