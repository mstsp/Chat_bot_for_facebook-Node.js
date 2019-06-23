module.exports = async function(controller) {
  controller.on("message", async (bot, message) => {
    if (message.quick_reply && message.quick_reply.payload === "Share") {
      await bot.reply(message, {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
              {
                "title": "Share with your friends",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "Follow",
                    "payload": "sharedLink"
                  },
                  {
                    "type": "element_share"
                  }
                ]
              }
            ]
          }
        }
      });
    }
  });
};
