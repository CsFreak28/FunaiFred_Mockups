const axios = require("axios");
async function sendGreeting(phone_number_id, from) {
  console.log("started");
  const token = process.env.WHATSAPP_TOKEN;
  //send greeting first
  await axios({
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
  await axios({
    method: "POST",
    url: "https://graph.facebook.com/v15.0/" + phone_number_id + "/messages",
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
                  description: "I want to get the reciept of a payment I made.",
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
}
async function writeAnnouncement(phone_number_id, from) {
  console.log("sujper");
  const token = process.env.WHATSAPP_TOKEN;
  //send greeting first
  await axios({
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
async function selectGroup(phone_number_id, from) {
  const token = process.env.WHATSAPP_TOKEN;
  await axios({
    method: "POST",
    url: "https://graph.facebook.com/v15.0/" + phone_number_id + "/messages",
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
                  description: "Send the announcement to CSC 331 students",
                  id: "23",
                },
                {
                  title: "ENT 301",
                  description: "Send the announcement to CSC 331 students",
                  id: "24",
                },
                {
                  title: "CSC 301",
                  description: "Send the announcement to CSC 301 students",
                  id: "25",
                },
                {
                  title: "CSC 303",
                  description: "Send the announcement to CSC 303 students",
                  id: "26",
                },
                {
                  title: "CSC 309",
                  description: "Send the announcement to CSC 309 students",
                  id: "27",
                },
                {
                  title: "CSC 305",
                  description: "Send the announcement to CSC 305 students",
                  id: "28",
                },
                {
                  title: "CSC 315",
                  description: "Send the announcement to CSC 315 students",
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
async function announcementTime(phone_number_id, from) {
  const token = process.env.WHATSAPP_TOKEN;
  //send greeting first
  await axios({
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
  });
  await axios({
    method: "POST",
    url: "https://graph.facebook.com/v15.0/" + phone_number_id + "/messages",
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
  const url = "https://www.bulksmsnigeria.com/api/v2/sms "; // Replace with your API endpoint URL

  const postData = {
    from: "CSC DEPT",
    to: from,
    body: "i am the boss",
    api_token: "yn7Zj74kgZwLJFpgQLBdlambXsc6xfplBvhudWDFDV4PKrtH4H1MdhHnQj0l",
  };

  axios
    .post(url, postData)
    .then((response) => {
      console.log("Post request successful:", response.data);
    })
    .catch((error) => {
      console.error("Error occurred during post request:", error);
    });
}
async function confirmation(phone_number_id, from) {
  const token = process.env.WHATSAPP_TOKEN;

  await axios({
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
}
function confirm() {
  //ive sent the announcement
  //i also sent the announcement to you
}
function anythingElse() {}
let arrayOfFunctions = [
  sendGreeting,
  writeAnnouncement,
  selectGroup,
  announcementTime,
  confirmation,
];
module.exports = arrayOfFunctions;
