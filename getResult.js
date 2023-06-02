const getResultFunctions = {
  hello: () => {
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
          body: `Hey ${name}, \n I'm the *BETA* version of FUNAI FRED 🤩, right now all I can do for you `,
        },
      },
      headers: { "Content-Type": "application/json" },
    });
  },
  yourPassword: () => {},
  yourUserName: () => {},
  getResults: () => {},
  feedback: () => {},
};
