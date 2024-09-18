# Brain Pitch Demo

## Overview

Brain Pitch Demo is an AI-powered tutoring/teaching assistant application designed for universities. This project includes a React frontend and a Node.js backend. The application aims to assist students and professors by providing custom learning modules, quizzes, chat capabilities, and more.

## Folder Structure

```
/your-project
  /client
    /public
    /src
      /components
      /pages
      /styles
  /server
    /controllers
    /models
    /routes
  /config
  /scripts
  .gitignore
  package.json
  README.md
```

## Prerequisites

- Node.js (v18.12.1 or later)
- npm (v6 or later)
- OpenAI API Key

## Getting Started

### Setting Up the Project

1. **Clone the Repository**

    ```sh
    git clone https://github.com/your-username/brain_pitch_demo.git
    cd brain_pitch_demo
    ```

2. **Install Dependencies**

    From the root directory:
    ```sh
    npm install
    ```

3. **Set Up Client**

    From the `client` directory:
    ```sh
    cd client
    npm install
    ```

4. **Set Up Server**

    From the `server` directory:
    ```sh
    cd server
    npm install
    ```

5. **Configure Environment Variables**

    Create a `.env` file in the `server` directory and add your OpenAI API key:
    ```env
    OPENAI_API_KEY=your-openai-api-key
    ```

### Running the Project

To run both the client and server concurrently, navigate to the root of the project and use:

```sh
npm run dev
```
The React app will run on `http://localhost:3000` and the Node.js server will run on `http://localhost:5000`.

### Backend

#### Structure

- **`/server/controllers`**: Request handlers.
- **`/server/models`**: Data models.
- **`/server/routes`**: API routes.

#### API Endpoints

- **POST `/api/chat`**: Endpoint for interacting with the chatbot.

### Frontend

#### Structure

- **`/client/public`**: Public assets for the React app.
- **`/client/src/components`**: React components.
- **`/client/src/pages`**: Different pages/views in the React app.
- **`/client/src/styles`**: CSS/Sass files for styling the React app.

### ChatBot Component

The `ChatBot` component is located in `client/src/components/ChatBot.js` and has a dedicated stylesheet `ChatBot.css` for styling. It interacts with the `/api/chat` endpoint to provide a conversational experience.

## Built With

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [LangChain](https://github.com/langchain/langchain)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to all who have contributed to this project.
