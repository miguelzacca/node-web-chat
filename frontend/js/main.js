const input = document.querySelector("footer input:nth-child(2)");
let username = localStorage.getItem("username") || "";

const viewMyMessage = () => {
  if (!input.value.trim()) {
    return null;
  }
  input.value = null;
  receiveMessages();
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
    viewMyMessage();
  }
});

document.querySelector("footer button").addEventListener("click", () => {
  sendMessage();
  viewMyMessage();
});

while (!username) {
  username = prompt("Enter your username:");
  if (username && (username.length < 3 || username.length > 20)) {
    username = "";
  }
}

localStorage.setItem("username", username);
