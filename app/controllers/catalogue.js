const variables = require("../../config/variables");

module.exports = async function(controller) {
  controller.on("message", async (bot, message) => {
    if (message.quick_reply && message.quick_reply.payload === "ShopPL") {
      await bot.reply(message, {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": await variables.getCatalogTemplate()
          }
        }
      });
    }
  });

  controller.on("facebook_postback", async (bot, message) => {
    if (message.text.includes("Catalogue")) {
      await bot.reply(message, {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": await variables.getCatalogTemplate()
          }
        }
      });
    }
  });
};
