const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGO_URI;

module.exports.getFavorite = GetFavorite;
module.exports.findFavorite = FindFavorite;
module.exports.deleteFavorite = DeleteFavorite;
module.exports.addToFavorite = AddToFavorite;

module.exports.addPurchase = AddPurchase;
module.exports.getPurchase = GetPurchase;

// Favorites

function AddToFavorite(user, product) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("chatbot");
    let myobj = { user: user, product: product };
    dbo.collection("favorites").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

function GetFavorite(user) {
  return MongoClient.connect(url)
    .then(function(db) {
      let dbo = db.db("chatbot");
      let collectionItems = dbo.collection("favorites");
      return collectionItems.find({ user: user }).toArray();
    })
    .then(function(items) {
      //console.log(items);
      return items;
    });
}

function FindFavorite(user, product) {
  return MongoClient.connect(url)
    .then(function(db) {
      let dbo = db.db("chatbot");
      let collectionItems = dbo.collection("favorites");
      return collectionItems.findOne({ user: user, product: product });
    })
    .then(function(item) {
      return item != null;
    });
}

function DeleteFavorite(user, product) {
  return MongoClient.connect(url)
    .then(function(db) {
      let dbo = db.db("chatbot");
      let collectionItems = dbo.collection("favorites");
      return collectionItems.deleteOne({ user: user, product: product });
    })
    .then(function(item) {
      return item.deletedCount == 1;
    });
}

// Purchases

function AddPurchase(user, product) {
  MongoClient.connect(url, function(err, db) {
    let date = new Date().toDateString();
    if (err) throw err;
    let dbo = db.db("chatbot");
    let myobj = { user: user, product: product, timeAdd: date };
    dbo.collection("purchases").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

function GetPurchase(user) {
  return MongoClient.connect(url)
    .then(function(db) {
      let dbo = db.db("chatbot");
      let collectionItems = dbo.collection("purchases");
      return collectionItems.find({ user: user }).toArray();
    })
    .then(function(items) {
      //console.log(items);
      return items;
    });
}
