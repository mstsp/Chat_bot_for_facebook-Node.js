const bestbuy = require("./bestbuyapi");
const database = require("./database");

module.exports.getCatalogTemplate = async function() {
  let getProductsFromBestBuy = await bestbuy.GetCategories();

  let array = [];
  for (let i = 0; i < 9; i++) {
    array.push({
      "title": getProductsFromBestBuy.products[i].name,
      "image_url": getProductsFromBestBuy.products[i].image,
      "subtitle": getProductsFromBestBuy.products[i].salePrice,
      "buttons": [
        {
          "type": "postback",
          "title": "View more",
          "payload": `info${i}`
        },
        {
          "type": "postback",
          "title": "Add to favorites",
          "payload": `fav${i}`
        }
      ]
    });
  }

  return array;
};

module.exports.getPurchaseListTemplate = async function(user) {
  let purchases = await database.getPurchase(user);
  let purchaseArray = [];

  if (purchases.length > 0) {
    for (let i = 0; i < purchases.length; i++) {
      purchaseArray.push({
        "title": purchases[i].timeAdd,
        "buttons": [
          {
            "type": "postback",
            "title": "View purchase details",
            "payload": `purchaseinf${purchases[i].product}`
          },
          {
            "type": "postback",
            "title": "Menu",
            "payload": "Menu"
          }
        ]
      });
    }
  }

  return purchaseArray;
};
