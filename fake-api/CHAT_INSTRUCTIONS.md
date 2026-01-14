# Fake API - Chat Instructions

## Overview
This document provides instructions on how to use the fake API server for user management operations.

## Server Information
- **Base URL:** `http://localhost:3000`
- **Status:** Should be running before executing any requests
- **Port:** 3000

## Available Operations

---

## 1. Fetch All Users

### Description
Retrieve a list of all users in the system.

### Request
```bash
curl -s http://localhost:3000/users
```

### cURL Command (Compact)
```bash
curl -s http://localhost:3000/users
```

### Response Example
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  ...
]
```

### Notes
- Returns an array of all users
- No authentication required
- Useful for getting an overview of all users in the system

---

## 2. Fetch User by ID

### Description
Retrieve a specific user by their ID.

### Request
```bash
curl -s http://localhost:3000/users/{id}
```

### Parameters
- `{id}` (required): The user ID to retrieve (e.g., 1, 2, 3)

### Example Requests

**Get user with ID 1:**
```bash
curl -s http://localhost:3000/users/1
```

**Get user with ID 2:**
```bash
curl -s http://localhost:3000/users/2
```

### Response Example (ID 1)
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

### Error Response
If the user doesn't exist:
```json
{}
```
(Returns empty object)

### Notes
- Returns a single user object
- No authentication required
- Returns empty object if user ID doesn't exist

---

## 3. Create New User

### Description
Create a new user in the system. The ID is automatically generated (no need to provide).

### Request
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{...user data...}'
```

### Parameters (JSON Body)
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | User's full name |
| `username` | string | Yes | Username (unique) |
| `email` | string | Yes | User's email address |
| `address` | object | No | Address details (see below) |
| `phone` | string | No | Phone number |
| `website` | string | No | Website URL |
| `company` | object | No | Company details (see below) |

### Address Object (Optional)
```json
{
  "street": "string",
  "suite": "string",
  "city": "string",
  "zipcode": "string",
  "geo": {
    "lat": "string",
    "lng": "string"
  }
}
```

### Company Object (Optional)
```json
{
  "name": "string",
  "catchPhrase": "string",
  "bs": "string"
}
```

### Example Request (Minimal)
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }'
```

### Example Request (Full)
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Smith",
    "username": "sarahsmith",
    "email": "sarah@example.com",
    "address": {
      "street": "Innovation Drive",
      "suite": "Suite 200",
      "city": "Austin",
      "zipcode": "78701",
      "geo": {
        "lat": "30.2672",
        "lng": "-97.7431"
      }
    },
    "phone": "1-512-123-4567",
    "website": "sarahsmith.io",
    "company": {
      "name": "Tech Solutions Inc",
      "catchPhrase": "Innovate & Create",
      "bs": "cloud-based solutions"
    }
  }'
```

### Response Example (Successful Creation)
```json
{
  "id": 11,
  "name": "Sarah Smith",
  "username": "sarahsmith",
  "email": "sarah@example.com",
  "address": {
    "street": "Innovation Drive",
    "suite": "Suite 200",
    "city": "Austin",
    "zipcode": "78701",
    "geo": {
      "lat": "30.2672",
      "lng": "-97.7431"
    }
  },
  "phone": "1-512-123-4567",
  "website": "sarahsmith.io",
  "company": {
    "name": "Tech Solutions Inc",
    "catchPhrase": "Innovate & Create",
    "bs": "cloud-based solutions"
  }
}
```

### Notes
- **ID is auto-generated** - Do not provide an ID in the request
- Returns the created user object with assigned ID
- All fields except `name`, `username`, and `email` are optional 
- Returns HTTP 201 (Created) on success

---

## Quick Reference

### Fetch All Users
```bash
curl -s http://localhost:3000/users
```

### Fetch User #1
```bash
curl -s http://localhost:3000/users/1
```

### Create New User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "username": "janedoe",
    "email": "jane@example.com"
  }'
```

---

## Troubleshooting

### Server Not Running
**Error:** `curl: (7) Failed to connect to localhost port 3000`

**Solution:** Start the server with:
```bash
npm start
```

### Port Already in Use
**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:** Kill the process using port 3000 or use a different port:
```bash
npm start -- --port 3001
```

### Invalid JSON
**Error:** `SyntaxError: Unexpected token ...`

**Solution:** Ensure your JSON is valid. Check:
- Quotes are properly escaped
- No trailing commas
- All braces/brackets are matched

### Data Not Persisting
**Issue:** Changes are lost after restart

**Note:** This is normal for development. Use `npm start` to keep the server running, or modify `db.json` directly before starting the server.

---

## Additional Resources

- [json-server Documentation](https://github.com/typicode/json-server)
- [API Testing with cURL](https://curl.se/)
- [JSON Format Guide](https://www.json.org/)
