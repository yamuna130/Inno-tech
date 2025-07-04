## 📦 Backend – AI Tagline Generator

This is the backend API server for the AI Tagline Generator MVP project. It provides secure authentication using JWT and integrates with the OpenAI API to generate marketing taglines.

---

## 🚀 Features

* ✅ Admin login with hardcoded credentials
* ✅ JWT-based authentication middleware
* ✅ Secure endpoint to generate taglines using OpenAI
* ✅ CORS and Body Parser support
* ✅ Environment-based API key management with `.env`

---

## 🛠️ Technology Stack

* **Node.js**
* **Express.js**
* **JWT (jsonwebtoken)**
* **OpenAI Node SDK (v4)**
* **dotenv**
* **cors**
* **body-parser**

---

## 📁 Folder Structure

```
backend/
├── server.js         # Main Express server file
├── package.json      # Backend dependencies
└── .env              # API keys and JWT secret (not committed)
```

---

## 🔐 Admin Credentials

```txt
Email:    admin@test.com  
Password: admin123
```

These are stored in a hardcoded list inside `server.js` for demo purposes.

---

## 🧪 API Endpoints

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| POST   | `/api/login`   | Authenticate and receive JWT    |
| POST   | `/api/tagline` | Generate tagline (JWT required) |

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure `.env`

Create a `.env` file in the backend folder:

```
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_custom_secret
```

### 3. Start the Server

```bash
node server.js
```

The backend will run on: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Example Request

```bash
POST /api/tagline
Authorization: Bearer <your_token>
Body: { "prompt": "Smart fitness tracker for dogs" }
```

Returns:

```json
{ "tagline": "Track tails, not just steps!" }
```

---

## 🧹 Future Enhancements

* Add user registration & password hashing
* Connect to MongoDB for real user management
* Add logging and rate limiting
* Convert to modular controller/service structure

---

## 📜 License

This backend is for learning/demo purposes only. Use your own API key with care.

