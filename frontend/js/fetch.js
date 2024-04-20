const sendMessage = () => {
  const data = {
    sender: username,
    content: input.value,
  };

  console.log(JSON.stringify(data));

  fetch("http://127.0.0.1:8000/send", {
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
  const data = await fetch("http://127.0.0.1:8000/messages")
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error(err));

  const messages = [];

  for (const msg of data.messages) {
    const component = `
      <div class="card">
        <p class="text">${msg.content}</p>
        <div>
          <p class="subtext">${msg.sender}</p>
          <p class="subtext">${msg.timestamp.split("T")[1].split(".")[0]}</p>
        </div>
      </div>
    `;
    messages.push(component);
  }

  document.querySelector("main").innerHTML = messages.join("");
};

receiveMessages();
