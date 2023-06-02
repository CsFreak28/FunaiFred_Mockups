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
const fs = require("fs");
const axios = require("axios").default;
const app = express().use(body_parser.json()); // creates express http server
// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log("webhook is listening"));
// Accepts POST requests at /webhook endpoint
app.get("/", (req, res) => {
  res.send("connected successfully");
  // const fileData = fs.readFileSync("./shake.webp");
  // const token = process.env.WHATSAPP_TOKEN;
  // Create an instance of FormData and append the file data
  // const formData = new FormData();
  // formData.append("file", fileData, "shake");
  // axios.post("https://graph.facebook.com/v16.0/" + phone_number_id + "/media", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   data: {
  //     file: "./shake.webp",
  //     messaging_product: "whatsapp",
  //     type: "image/webp",
  //   },
  // });
  // Send the Axios POST request

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
      console.log(phone_number_id);
      let from = req.body.entry[0].changes[0].value.messages[0].from;
      let messageType = req.body.entry[0].changes[0].value.messages[0].type;
      let usersText = getMessageText(messageType, req);
      console.log("the user's text", usersText);
      markMessageAsRead(req);
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
        }).then(() => {
          console.log("second function called");
          axios({
            method: "POST",
            url:
              "https://graph.facebook.com/v15.0/" +
              phone_number_id +
              "/messages",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            data: {
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: from,
              type: "interactive",
              interactive: {
                type: "list",
                header: {
                  type: "text",
                  text: "THINGS I CAN DO ",
                },
                body: {
                  text: "This is a list of things I can help you do right now, \n in a future update I'm sure I'll be able to help more",
                },
                action: {
                  button: "COMMAND LIST",
                  sections: [
                    {
                      title: "PAYMENTS 💰",
                      rows: [
                        {
                          title: "Make A Payment",
                          description: "I want to make a payment.",
                          id: "23",
                        },
                        {
                          title: "Payment Reciepts",
                          description:
                            "I want to get the reciept of a payment I made.",
                          id: "24",
                        },
                      ],
                    },
                    {
                      title: "INFORMATION 📰",
                      rows: [
                        {
                          title: "Course Information",
                          description:
                            "I want to get information on things happening in CSC department",
                          id: "25",
                        },
                        {
                          title: "School Information",
                          description:
                            "I want to get information on things happening in School",
                          id: "26",
                        },
                      ],
                    },
                    {
                      title: "ANNOUNCEMENTS 📢",
                      rows: [
                        {
                          title: "Make An Announcement",
                          description: "I want to make an announcement.",
                          id: "56",
                        },
                        {
                          title: "Track An Announcement",
                          description: "I want to manage an announcement",
                          id: "65",
                        },
                      ],
                    },
                    {
                      title: "ATTENDANCE (✨)",
                      rows: [
                        {
                          title: "Take Attendance",
                          description: "Take my attendance",
                          id: "30",
                        },
                        {
                          title: "Attendance Record",
                          description: "Get my attendance record",
                          id: "31",
                        },
                      ],
                    },
                    {
                      title: "ACADEMIC STUFF 📚",
                      rows: [
                        {
                          title: "My Result",
                          description: "Get My Result",
                          id: "32",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          });
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
      } else if (usersText == "CSC 301") {
        const url = "https://www.bulksmsnigeria.com/api/v2/sms "; // Replace with your API endpoint URL
        const postData = {
          from: "CSC DEPT",
          to: "2349137302300",
          body: "Dear Donald, \n Your CSC 301 computer analysis assignment should be submitted on Friday",
          api_token:
            "yn7Zj74kgZwLJFpgQLBdlambXsc6xfplBvhudWDFDV4PKrtH4H1MdhHnQj0l",
        };

        axios
          .post(url, postData)
          .then((response) => {
            console.log("Post request successful:", response.data);
          })
          .catch((error) => {
            console.error("Error occurred during post request:", error);
          });
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
              body: "Your announcement will be sent to 46 out 134 student offering CSC 301",
            },
          },
          headers: { "Content-Type": "application/json" },
        }).then(() => {
          axios({
            method: "POST",
            url:
              "https://graph.facebook.com/v15.0/" +
              phone_number_id +
              "/messages",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: from,
              type: "interactive",
              interactive: {
                type: "button",
                body: {
                  text: "With the deadline being Friday, I will send this announcement right away and three more times to ensure that everyone follows the instruction \n are you okay with that ?",
                },
                action: {
                  buttons: [
                    {
                      type: "reply",
                      reply: {
                        title: "Yes, I am",
                        id: 23,
                      },
                    },
                    {
                      type: "reply",
                      reply: {
                        title: "No, I'm not",
                        id: 26,
                      },
                    },
                  ],
                },
              },
            },
          });
        });
      } else if (usersText == "Yes, I am") {
        const token = process.env.WHATSAPP_TOKEN;
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
              body: "announcement sent ✅",
            },
          },
          headers: { "Content-Type": "application/json" },
        });
      } else if (usersText == "Thanks" || usersText == "thanks") {
        console.log("thanks was said");
        axios({
          method: "POST",
          url:
            "https://graph.facebook.com/v15.0/" + phone_number_id + "/messages",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: from,
            type: "interactive",
            interactive: {
              type: "button",
              body: {
                text: "You're welcome Donald 💯, \n is there anything else I can help you with ?",
              },
              action: {
                buttons: [
                  {
                    type: "reply",
                    reply: {
                      title: "YES",
                      id: 23,
                    },
                  },
                  {
                    type: "reply",
                    reply: {
                      title: "NO",
                      id: 26,
                    },
                  },
                ],
              },
            },
          },
        });
      } else if (usersText == "NO") {
        reactToMessage(req, "❤️");
        return;
      } else {
        const token = process.env.WHATSAPP_TOKEN;
        axios({
          method: "POST",
          url:
            "https://graph.facebook.com/v15.0/" + phone_number_id + "/messages",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: from,
            type: "interactive",
            interactive: {
              type: "list",
              header: {
                type: "text",
                text: "SELECT A GROUP",
              },
              body: {
                text: "These are different groups of students in your department, you can select a specific group of coursemates and I'll send the announcement to only the selected group.",
              },
              action: {
                button: "COMMAND LIST",
                sections: [
                  {
                    title: "GROUPS",
                    rows: [
                      {
                        title: "CSC 331",
                        description:
                          "Send the announcement to CSC 331 students",
                        id: "23",
                      },
                      {
                        title: "ENT 301",
                        description:
                          "Send the announcement to CSC 331 students",
                        id: "24",
                      },
                      {
                        title: "CSC 301",
                        description:
                          "Send the announcement to CSC 301 students",
                        id: "25",
                      },
                      {
                        title: "CSC 303",
                        description:
                          "Send the announcement to CSC 303 students",
                        id: "26",
                      },
                      {
                        title: "CSC 309",
                        description:
                          "Send the announcement to CSC 309 students",
                        id: "27",
                      },
                      {
                        title: "CSC 305",
                        description:
                          "Send the announcement to CSC 305 students",
                        id: "28",
                      },
                      {
                        title: "CSC 315",
                        description:
                          "Send the announcement to CSC 315 students",
                        id: "29",
                      },
                    ],
                  },
                ],
              },
            },
          },
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
        req.body.entry[0].changes[0].value.messages[0].interactive.button_reply
          .title;
    } else {
      usersText =
        req.body.entry[0].changes[0].value.messages[0].interactive.list_reply
          .title;
    }
  } else if (msgType === "text") {
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
async function markMessageAsRead(request) {
  const token = process.env.WHATSAPP_TOKEN;
  let msgID = request.body.entry[0].changes[0].value.messages[0].id;
  console.log(msgID);
  let phone_number_id =
    request.body.entry[0].changes[0].value.metadata.phone_number_id;
  var data = JSON.stringify({
    messaging_product: "whatsapp",
    status: "read",
    message_id: msgID,
  });

  var config = {
    method: "POST",
    url: "https://graph.facebook.com/v15.0/" + phone_number_id + "/messages",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log("mark message as read, complete");
    })
    .catch(function (error) {
      // console.log(error);
    });
}
export async function reactToMessage(request, emoji) {
  const token = process.env.WHATSAPP_TOKEN;
  let from = request.body.entry[0].changes[0].value.messages[0].from;
  let msgID = request.body.entry[0].changes[0].value.messages[0].id;
  let phone_number_id =
    request.body.entry[0].changes[0].value.metadata.phone_number_id;
  let data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: from,
    type: "reaction",
    reaction: {
      message_id: msgID,
      emoji: emoji,
    },
  };
  await axios({
    method: "POST",
    url: "https://graph.facebook.com/v15.0/" + phone_number_id + "/messages",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
}
