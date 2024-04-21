const sendMessage = () => {
  const time = new Date();

  const data = {
    sender: username,
    content: input.value,
    timestamp: `${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`,
  };

  fetch("https://epic-tarpon-definitely.ngrok-free.app/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res)
    .catch((err) => console.error(err));
};

let lastSender = "";

const receiveMessages = async () => {
  const data = await fetch(
    "https://epic-tarpon-definitely.ngrok-free.app/messages",
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error(err));

  const messages = [];

  for (const msg of data.messages) {
    const toLower = (word) => word.toLowerCase().trim();

    msg.sender = toLower(msg.sender);

    let sender = `<p class="subtext name flex">${msg.sender}</p>`;
    let you = "";

    if (msg.sender === toLower(localStorage.getItem("username"))) {
      sender = ``;
      you = `id="you"`;
    }

    let space = lastSender !== msg.sender ? `<br>` : "";

    const component = `
      ${space}
      <div class="card flex col" ${you}>
        ${sender}
        <p class="text">${msg.content}</p>
        <div class="flex">
          <p class="subtext">${msg.timestamp}</p>
        </div>
      </div>
    `;
    messages.push(component);

    lastSender = msg.sender;
  }

  document.querySelector("main").innerHTML = messages.join("");
};

receiveMessages();
setInterval(receiveMessages, 5000);
