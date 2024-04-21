const input = document.querySelector("footer input:nth-child(2)");
let username = localStorage.getItem("username") || "";

const viewMyMessage = () => {
  if (!input.value.trim()) {
    return null;
  }
  input.value = null;
  setTimeout(() => {
    receiveMessages();
  }, 1000);
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

document.querySelector("header .profile").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

while (!username) {
  username = prompt("USERNAME:");
  if (username && (username.length < 3 || username.length > 20)) {
    username = "";
  }
}

document.querySelector("header h1").textContent = username;
localStorage.setItem("username", username);
