# Project under construction

Nodejs web chat with MongoDB Cloud (AWS) and Express.

## Database

To use the database, create an account with MongoDB Atlas.

- Create and configure your free Cluster.

- Get the connection string, your username and password.

- Configure your `.env` file in the root of the backend directory, follow the template

```
PORT=8000
DB_USER=<username>
DB_PASS=<password>
```

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

## Preview

https://definitivechat.netlify.app
