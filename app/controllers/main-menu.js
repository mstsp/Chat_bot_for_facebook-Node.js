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
                            "image_url":"http://icons.iconarchive.com/icons/double-j-design/super-mono-3d/32/shopping-cart-icon.png"
                            },
                            {
                            "content_type":"text",
                            "title":"Shop",
                            "payload":"ShopPL",
                            "image_url":"http://icons.iconarchive.com/icons/double-j-design/super-mono-3d/32/money-wallet-icon.png"
                            },
                            {
                            "content_type":"text",
                            "title":"Favorites",
                            "payload":"FavoritesPL",
                            "image_url":"http://icons.iconarchive.com/icons/double-j-design/super-mono-3d/32/heart-icon.png"
                            },
                            {
                            "content_type":"text",
                            "title":"To invite a friend",
                            "payload":"Share",
                            "image_url":"http://icons.iconarchive.com/icons/double-j-design/super-mono-3d/32/user-icon.png"
                            }                  
                        ]
                }
            );
        }
    });
}