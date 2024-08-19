# Lama Pod

**Lama Pod** is a web application designed to manage podcast distribution. The platform provides podcasters with tools to manage their projects, upload audio files (Future Scope), and receive transcriptions. The app is built using Next.js and MongoDB.

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

Ensure you have the following installed:

- **Next.js**
- **npm** (v6 or later)
- **MongoDB**

### Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:aatmik-panse/podcastLama.git
   cd podcastLama
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   In the `root` directory, create a `.env.local` file with the following content:

   ```env
    MONGODB_URI=your_mongodb_connection_string
    ROOT_URL=http://localhost:3000
    JWT_SECRET=your_jwt_secret_key
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret_key` with a secure, random string for JWT token generation.

4. **Start the Server**

   ```bash
   npm run dev
   ```

5. **Access the Application**

   Open your browser and navigate to `http://localhost:3000` to start using Lama Pod.

## Features

- **User Authentication:** Secure login and registration functionality.
- **Project Management:** Create and manage podcast projects efficiently.
- **File Upload & Transcription:** Upload audio files and get transcriptions powered by AI.
- **User Dashboard:** View and manage your projects and transcriptions in one place.

## Built With

- [**Next.js**](https://nextjs.org/) - A React framework for building server-rendered applications.
- [**MongoDB**](https://www.mongodb.com/) - A NoSQL database for storing your data.
