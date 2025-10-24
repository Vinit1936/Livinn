# Livinn 🏠

**Livinn** is a full-stack web application for property listings, where users can browse stays, sign up, upload images, and manage their own listings.  
It’s built to demonstrate a complete full-stack workflow with authentication, image uploads, maps, and database integration.  

---

## Project Overview

The project allows users to:  
- Register and log in securely  
- Add new property listings with images and location  
- Browse listings with interactive maps  
- Edit or delete their own listings  

The goal was to build a real-world full-stack app using Node.js, Express, MongoDB, and EJS, integrating external services like Cloudinary and Mapbox.

---

## Tech & Tools Used

**Backend**  
- **Node.js & Express.js:** Provides the server environment and handles routing for the app. Express makes it easy to create RESTful routes and structure the backend efficiently.  
- **MongoDB Atlas & Mongoose:** Stores user data and property listings. Mongoose simplifies database interactions with schemas and models.  
- **Passport.js:** Handles authentication and session management securely.  
- **connect-mongo:** Stores sessions in the database for persistence.  
- **dotenv:** Manages environment variables for sensitive keys and configuration.  
- **method-override:** Allows HTTP PUT and DELETE requests via forms.  

**Frontend**  
- **EJS:** Templating engine for dynamic HTML rendering.  
- **Bootstrap:** Provides responsive UI components and styling.  
- **ejs-mate:** Enables reusable layouts and partials for consistent page structure.  

**Other Services**  
- **Cloudinary:** Hosts and manages property images securely.  
- **Multer:** Handles file uploads from the frontend.  
- **Mapbox API:** Displays interactive maps for property locations.  

---

## Live Demo & Repo

- **Live Website:** [https://livinn.onrender.com/listings](https://livinn.onrender.com/listings)  
- **GitHub Repository:** [https://github.com/Vinit1936/Livinn](https://github.com/Vinit1936/Livinn)  

---

This README explains the purpose of the project and what each technology is doing in the stack.  

