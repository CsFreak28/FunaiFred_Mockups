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
const dotenv = require("dotenv");
dotenv.config();
const body_parser = require("body-parser");
const axios = require("axios").default;
const arrayOfFunctions = require("./announcementMockup");
const app = express().use(body_parser.json()); // creates express http server
// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log("webhook is listening"));
let requestCount = -1;
let theFunction = arrayOfFunctions[0];
// arrayOfFunctions[1]();
// Accepts POST requests at /webhook endpoint
app.get("/", (req, res) => {
  res.send("connected successfully");
  console.log("connected oo");
}); //2zatx.localto.net/webhook
app.post("/webhook", async (req, res) => {
  console.log("label remove");
  // Parse the req body from the POST
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
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from;
      let messageType = req.body.entry[0].changes[0].value.messages[0].type;
      let usersText = getMessageText(messageType, req);
      console.log("the user's text", usersText);
      if (usersText === "hey" || usersText === "Hey") {
        axios({
          method: "POST", // Required, HTTP method, a string, e.g. POST, GET
          url:
            "https://graph.facebook.com/v16.0/" +
            phone_number_id +
            "/messages?access_token=" +
            token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            text: {
              body: "Good morning Boss !, \n I'm feeling energetic and ready to help you tackle the stress of being a course rep 😅\n what can I do to help ?",
            },
          },
          headers: { "Content-Type": "application/json" },
        });
      } else if (usersText === "Make An Announcement") {
        const token = process.env.WHATSAPP_TOKEN;
        //send greeting first
        axios({
          method: "POST", // Required, HTTP method, a string, e.g. POST, GET
          url:
            "https://graph.facebook.com/v16.0/" +
            phone_number_id +
            "/messages?access_token=" +
            token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            text: {
              body: "Okay, write or forward the announcement to me",
            },
          },
          headers: { "Content-Type": "application/json" },
        });
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
function getMessageText(msgType, req) {
  let usersText;
  if (msgType === "interactive") {
    let typeOfInteractive =
      req.body.entry[0].changes[0].value.messages[0].interactive.type;
    if (typeOfInteractive == "button_reply") {
      usersText =
        eq.body.entry[0].changes[0].value.messages[0].interactive.button_reply
          .title;
    } else {
      usersText =
        req.body.entry[0].changes[0].value.messages[0].interactive.list_reply
          .title;
    }
  } else {
    usersText = req.body.entry[0].changes[0].value.messages[0].text.body;
  }
  return usersText;
}
// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification req payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.VERIFY_TOKEN;
  console.log("verify token", verify_token);
  // Parse params from the webhook verification req
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the req
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
