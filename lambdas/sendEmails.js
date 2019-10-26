exports.handler = async event => {
  var AWS = require("aws-sdk");
  // Set the region
  AWS.config.update({ region: "us-east-1" });

  let requester = {
    email: "Garrett.Holmes+aws@gmail.com",
    name: "requester"
  };

  let hoster = {
    email: "Garrett.Holmes+aws@gmail.com",
    name: "requester"
  };

  var params = {
    Destination: {
      CcAddresses: [
        requester.email // Iniator of connection
      ],
      ToAddresses: [
        hoster.email // original "host" of connection item
      ]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: `Hi!\n${requester.name} wants to connect wit you ${hoster.name}. Reply to all, or directly to ${requester.email}`
        },
        Text: {
          Charset: "UTF-8",
          Data: `Non-html version of message from ${requester.name}`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "New Connection Attempt!"
      }
    },
    Source: "Garrett.Holmes+aws@gmail.com" /* required */,
    ReplyToAddresses: [
      hoster.email
      /* more items */
    ]
  };

  // Create the promise and SES service object
var sendPromise =  new AWS.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1"
  })
    .sendEmail(params)
    .promise());

  // Handle promise's fulfilled/rejected states
  return sendPromise
    .then(function(data) {
      console.log("success", data);
      return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Success sending email!`
        })
      };
    })
    .catch(function(err) {
      console.error("Error", err, err.stack);
    });
};
