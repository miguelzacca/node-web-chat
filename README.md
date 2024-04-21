# Project under construction

Nodejs web chat with MongoDB Cloud (AWS) and Express.

## Installation (backend)

To install dependencies, use

```
npm install
```

## Use

### frontend

- Adjust the GET and POST `fetch` path. You can use ngrok to make your local port where the API will be running available to the web.

- After having the API online, its address must be placed in `fetch`, this way, the app will be working.

### backend

After installing the dependencies, use

```
node src/index.js
```

## ngrok

Link to ngrok website https://ngrok.com/. After configuring your ngrok token, use

```
ngrok http <PORT>
```

Okay, now just get the link provided.
