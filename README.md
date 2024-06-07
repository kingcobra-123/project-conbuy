
# Project ConBuy

## Overview
ConBuy is a comprehensive platform designed to enhance consumer purchasing decisions with rewards. This repository contains both the frontend (React Native) and backend (Node.js, Express, MongoDB) code for the ConBuy project.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Environment Variables](#environment-variables)
5. [Features](#features)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

## Project Structure

### Root Directory
- **client**: Frontend code.
  - `.expo`: Expo configuration files.
  - `assets`: Static assets like images.
  - `navigation`: Navigation-related files.
  - `patches`: Patch files for dependencies.
  - `screens`: React Native screens.
  - `state`: State management files.
  - `temp`: Temporary files.
  - **Main Files**:
    - `.gitignore`
    - `App.js`
    - `apiconfig.js`
    - `app.json`
    - `babel.config.js`
    - `main.js`
    - `package-lock.json`
    - `package.json`
    - `yarn.lock`
    
- **server**: Backend code.
  - `controllers`: Request handlers.
  - `data`: Data-related files and scripts.
  - `middleware`: Middleware functions.
  - `models`: Database models.
  - `routes`: API routes.
  - **Main Files**:
    - `.env`
    - `.gitignore`
    - `index.js`
    - `package-lock.json`
    - `package.json`
    - `yarn.lock`

## Installation

### Prerequisites
- Node.js
- Yarn or npm
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-conbuy.git
   cd project-conbuy

2. Install dependencies for both client and server:
   ```bash
   cd client
   yarn install
   cd ../server
   yarn install
   

## Running the Application

### Backend
1. Navigate to the server directory:
   ```bash
   cd server
2. Start the server:
   ```bash
   yarn start
   
### Frontend
1. Navigate to the client directory:
   ```bash
   cd client
2. Start the Expo development server:
   ```bash
   yarn start

## Environment Variables
1. Create a .env file in the server directory and add the following:
  ```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    
   
