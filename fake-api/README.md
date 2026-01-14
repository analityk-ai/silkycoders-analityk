# Fake API Server

A local fake REST API server using JSON Server and JSONPlaceholder data.

## Description

This project provides a local fake API server powered by [json-server](https://github.com/typicode/json-server) with sample data from JSONPlaceholder.

## Installation

Install dependencies using npm:

```bash
npm install
```

## Scripts

### Start Server
Run the development server with file watching:

```bash
npm start
```

The server will start on `http://localhost:3000`

### Start with Delay
Run the server with a 500ms delay to simulate network latency:

```bash
npm run dev
```

## Available Resources

The API provides the following endpoints:

- **GET** `/posts` - Get all posts
- **GET** `/posts/:id` - Get a specific post
- **GET** `/comments` - Get all comments
- **GET** `/albums` - Get all albums
- **GET** `/photos` - Get all photos
- **GET** `/todos` - Get all todos
- **GET** `/users` - Get all users

All HTTP methods are supported (GET, POST, PUT, PATCH, DELETE).

## Example Requests

### Get all posts
```bash
curl http://localhost:3000/posts
```

### Get a specific post
```bash
curl http://localhost:3000/posts/1
```

### Get post comments
```bash
curl http://localhost:3000/posts/1/comments
```

### Create a new post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "title": "New Post",
    "body": "This is a new post"
  }'
```

### Update a post
```bash
curl -X PUT http://localhost:3000/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "title": "Updated Post",
    "body": "This is an updated post"
  }'
```

### Delete a post
```bash
curl -X DELETE http://localhost:3000/posts/1
```

## Database File

The data is stored in `db.json`. You can modify this file to add, update, or remove data. The server will automatically pick up changes if running with `npm start`.

## Learn More

- [json-server Documentation](https://github.com/typicode/json-server)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
