module.exports = function(controller) {

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
                            "image_url":"../../images/cart-icon.png"
                        },
                        {
                            "content_type":"text",
                            "title":"Shop",
                            "payload":"ShopPL",
                            "image_url":"../../images/wallet-icon.png"
                        },
                        {
                            "content_type":"text",
                            "title":"Favorites",
                            "payload":"FavoritesPL",
                            "image_url":"../../images/heart-icon.png"
                        },
                        {
                            "content_type":"text",
                            "title":"To invite a friend",
                            "payload":"Share",
                            "image_url":"../../images/user-icon.png"
                        }                  
                    ]
                }
            );
        }
    });
}