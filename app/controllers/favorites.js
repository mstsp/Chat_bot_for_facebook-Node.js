const bestbuy = require("../../config/bestbuyapi");
const database = require("../../config/database");

module.exports = async function(controller) {
  controller.on("facebook_postback", async (bot, message) => {
    if (message.text.includes("info")) {
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
                    "image_url": getProductsFromBestBuy.products[i].image,
                    "buttons": [
                      {
                        "type": "postback",
                        "title": "Buy",
                        "payload": `buy${i}`
                      },
                      {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": `Menu`
                      }
                    ]
                  }
                ]
              }
            }
          });
        }
      }
    } else if (message.text.includes(`fav${i}`)) {
      let isUnique = await database.findFavorite(message.user, i);
      if (isUnique != true) {
        database.addToFavorite(message.user, i);
        await bot.reply(message, "Added to your favorite list!");
      } else if (isUnique != false) {
        await bot.reply(message, "This product already in your favorite list");
      }
    } else if (message.text.includes(`del${i}`)) {
      let isExist = await database.deleteFavorite(message.user, i);
      if (isExist == true) {
        await bot.reply(message, "Deleted from your favorite list");
      }
    }
  });

  controller.on("message", async (bot, message) => {
    if (message.quick_reply && message.quick_reply.payload === "FavoritesPL") {
      let getProductsFromBestBuy = await bestbuy.GetCategories();
      let favorites = await database.getFavorite(message.user);

      let favArray = [];

      if (favorites.length > 0) {
        for (let i = 0; i < favorites.length; i++) {
          favArray.push({
            "title": getProductsFromBestBuy.products[favorites[i].product].name,
            "image_url": getProductsFromBestBuy.products[favorites[i].product].image,
            "subtitle": getProductsFromBestBuy.products[favorites[i].product].shortDescription,
            "buttons": [
              {
                "type": "postback",
                "title": "Buy",
                "payload": `buy${favorites[i].product}`
              },
              {
                "type": "postback",
                "title": "Delete from favorites",
                "payload": `del${favorites[i].product}`
              },
              {
                "type": "postback",
                "title": "Main menu",
                "payload": `Menu`
              }
            ]
          });
        }

        await bot.reply(message, {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": favArray
            }
          }
        });
      } else {
        await bot.reply(message, "Your favorite list is empty");
      }
    }
  });
};
