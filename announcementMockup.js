function sendGreeting(phone_number_id, from) {
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
        body: "Good morning Boss !, \n I'm ready to help you tackle the stress of being a course rep 😅\n How can I help ?",
      },
    },
    headers: { "Content-Type": "application/json" },
  });
  axios({
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
          text: "This is a list Things I can help you get done in computer science department or personally",
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
function writeAnnouncement() {}
function selectGroup() {}
function announcementTime() {}
function deadline() {}
function confirm() {
  //ive sent the announcement
  //i also sent the announcement to you
}
function anythingElse() {}
let arrayOfFunctions = [sendGreeting];
module.exports = arrayOfFunctions;
