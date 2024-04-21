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

  fetch("http://192.168.1.7:8000/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res)
    .catch((err) => console.error(err));
};

const receiveMessages = async () => {
  const data = await fetch("http://192.168.1.7:8000/messages")
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error(err));

  const messages = [];

  for (const msg of data.messages) {
    const toLower = (word) => word.toLowerCase().trim();

    let sender = `<p class="subtext">${toLower(msg.sender)}</p>`;
    let you = "";

    if (toLower(msg.sender) === toLower(localStorage.getItem("username"))) {
      sender = `<p class="subtext">you</p>`;
      you = `id="you"`;
    }

    const component = `
      <div class="card" ${you}>
        <p class="text">${msg.content}</p>
        <div>
          ${sender}
          <p class="subtext">${msg.timestamp}</p>
        </div>
      </div>
    `;
    messages.push(component);
  }

  document.querySelector("main").innerHTML = messages.join("");
};

receiveMessages();
setInterval(receiveMessages, 5000);
