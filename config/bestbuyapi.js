const bby = require("bestbuy")(process.env.BBY_API_KEY);

module.exports.GetCategories = function() {
  let dataArray;
  return bby.products(
    "(search=music-dvds)",
    { show: "salePrice,name,image,shortDescription" },
    function(err, data) {
      if (err) console.warn(err);
      else if (data.total === 0) console.log("No products found");
      else {
        dataArray = data.products;
      }
      return dataArray;
    }
  );
};
