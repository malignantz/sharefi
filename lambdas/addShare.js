const AWS = require("aws-sdk");
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
AWS.config.update({ region: "us-east-1" });
exports.handler = async event => {
  let shareData = event.body;
  const parsedData = JSON.parse(shareData);

  let itemMap = {};
  Object.keys(parsedData).forEach(key => {
    if (key === "id") {
      itemMap[key] = {
        S: parsedData.title + parsedData.contact
      };
    } else {
      itemMap[key] = { S: parsedData[key] };
    }
  });

  var params = {
    TableName: "sharefi_offers",
    Item: itemMap
  };

  return new Promise((resolve, reject) => {
    ddb.putItem(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        //console.log("Success\n", parsedData);
        resolve({
          isBase64Encoded: false,
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Success adding ${parsedData.title}`
          })
        });
      }
    });
  });
};
