const variables = require("../../config/variables");
const bestbuy = require(".../../config/bestbuyapi");

module.exports = async function(controller) {
  // меню с датой покупок
  controller.on("message", async (bot, message) => {
    if (message.quick_reply && message.quick_reply.payload === "Purchases") {
      let purchaseArray = await variables.getPurchaseListTemplate(message.user);

      if (purchaseArray.length !== 0) {
        await bot.reply(message, {
          attachment: {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": purchaseArray
            }
          }
        });
      } else {
        await bot.reply(message, "You did not make any purchase");
      }
    }
  });

  controller.on("facebook_postback", async (bot, message) => {
    if (message.text === "returntopurchase") {
      let purchaseArray = await variables.getPurchaseListTemplate(message.user);

      await bot.reply(message, {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": purchaseArray
          }
        }
      });
    }
  });

  controller.on("facebook_postback", async (bot, message) => {
    if (message.text.includes("purchaseinf")) {
      let getProductsFromBestBuy = await bestbuy.GetCategories();

      for (let i = 0; i < 9; i++) {
        if (message.text[message.text.length - 1] == i) {
          await bot.reply(message, {
            "attachment": {
              "type": "template",
              "payload": {
                "template_type": "generic",
                "elements": [
                  {
                    "title": getProductsFromBestBuy.products[i].name,
                    "subtitle": getProductsFromBestBuy.products[i].salePrice,
                    "image_url": getProductsFromBestBuy.products[i].image,
                    "buttons": [
                      {
                        "type": "postback",
                        "title": "Buy",
                        "payload": `buy${i}`
                      },
                      {
                        "type": "postback",
                        "title": "Return",
                        "payload": `returntopurchase`
                      }
                    ]
                  }
                ]
              }
            }
          });
        }
      }
    }
  });
};
