module.exports = function(controller) {

    let img1 = require("../../images/wallet-icon.png"); 

    controller.on('facebook_postback', async(bot, message) => {

        if(message.text === 'Menu') {
            await bot.reply(message, {
                    "text": "Main menu", 
                    "quick_replies":
                    [
                        {
                            "content_type":"text",
                            "title":"My purchases",
                            "payload":"Purchases",
                            "image_url": img1
                        },
                        {
                            "content_type":"text",
                            "title":"Shop",
                            "payload":"ShopPL",
                            "image_url": img1
                        },
                        {
                            "content_type":"text",
                            "title":"Favorites",
                            "payload":"FavoritesPL",
                            "image_url": img1
                        },
                        {
                            "content_type":"text",
                            "title":"To invite a friend",
                            "payload":"Share",
                            "image_url": img1
                        }                  
                    ]
                }
            );
        }
    });
}