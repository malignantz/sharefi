const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // TODO implement

  // return {statusCode: 200, body: JSON.stringify("yoo")};
  return new Promise((resolve, reject) => {
    ddb.scan(
      { TableName: "sharefi_offers", ReturnConsumedCapacity: "TOTAL" },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          let organizedData = {};
          resolve(data.Items);
        }
      }
    );
  });
};
