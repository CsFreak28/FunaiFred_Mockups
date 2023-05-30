/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

"use strict";

// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)
const token = process.env.WHATSAPP_TOKEN;
// Imports dependencies and set up http server
const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios").default;
const arrayOfFunctions = require("./announcementMockup");
const app = express().use(body_parser.json()); // creates express http server
// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));
let requestCount = -1;
// arrayOfFunctions[1]();
// Accepts POST requests at /webhook endpoint
app.get("/", (req, res) => {
  res.send("connected successfully");
});
app.post("/webhook", async (req, res) => {
  // Parse the request body from the POST
  let body = req.body;
  // Check the Incoming webhook message
  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      console.log("debugging", requestCount);
      requestCount += 1;
      //   let phone_number_id =
      //     req.body.entry[0].changes[0].value.metadata.phone_number_id;
      //   let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      //   let messageType = req.body.entry[0].changes[0].value.messages[0].type;
      //   let msg_body; // extract the message text from the webhook payload
      //   if (messageType == "interactive") {
      //     msg_body =
      //       req.body.entry[0].changes[0].value.messages[0].interactive.type ===
      //       "button_reply"
      //         ? req.body.entry[0].changes[0].value.messages[0].interactive
      //             .button_reply.title
      //         : req.body.entry[0].changes[0].value.messages[0].interactive
      //             .list_reply.title;
      //     if (msg_body == "restart") {
      //       conso\le.log(msg_body, "i am the restart function");dffdg
      //       requestCount = 0;
      //       await arrayOfFunctions[requestCount](phone_number_id, from);
      //     } else {
      //       console.log(msg_body, "i am not the restart function");
      //       requestCount += 1;
      //       arrayOfFunctions[requestCount](phone_number_id, from);
      //     }
      //   } else if (messageType == "text") {
      //     msg_body = req.body.entry[0].changes[0].value.messages[0].text.body;
      //     if (msg_body == "restart") {
      //       console.log(msg_body, "i am the restart function");
      //       requestCount = 0;
      //       await arrayOfFunctions[requestCount](phone_number_id, from);
      //     } else {
      //       console.log(msg_body, "i am not the restart function");
      //       requestCount += 1;
      //       await arrayOfFunctions[requestCount](phone_number_id, from);
      //     }
      //   }
    }
  }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.VERIFY_TOKEN;
  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});
