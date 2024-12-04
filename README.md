# Auratime

**Auratime** is a luxury watch e-commerce platform designed to provide a seamless user experience. It offers a curated selection of high-end watches, complete with user authentication, a shopping cart that persists across sessions, and a stunning user interface.

## Key Features

- 🕒 **Luxury Watch Collection**: Fetches watch data dynamically from an API.
- 🔐 **User Authentication**: Secure login and registration system.
- 🌐 **Third-Party Authentication**: Login with Google, GitHub, or Discord.
- 🛒 **Persistent Shopping Cart**: Cart items are saved even after the user logs out.
- 💎 **Elegant User Interface**: Modern, intuitive, and responsive design.
  
---

## Technologies Used

### Frontend
- **React**: Dynamic, component-based UI.
- **Vite**: Fast development server and build tool.
  
### Backend
- **Node.js & Express**: RESTful API server.
- **PostgreSQL**: Relational database for storing user and product data.

### Libraries & Tools
- **Axios**: Fetches data from the API.
- **Tailwind CSS**: Utility-first CSS framework.
- **Passport.js**: Handles third-party OAuth authentication.
- **JWT (JSON Web Tokens)**: Secure user session management.

---

## Installation Guide

### Steps

1. **Clone the Repository**:
   ```bash
    git clone https://github.com/bhavishya2601/auratime.git
    cd auratime
   ```

2. **Backend Setup**:
   ```bash
    cd server
    npm install
   ```

3. **Configure Backend Environment Variables**:
   Copy the `.env.sample` file in the `server` directory and rename it to `.env`:
     ```bash
     cp .env.sample .env
     ```
   Open the `.env` file and fill in the required values.

4. **Start Backend**:
   ```bash
    node index.js
   ```
   OR
   ```bash
    nodemon index.js
   ```

5. **Frontend Setup**:
   ```bash
    cd ../client
    npm install
   ```

6. **Configure Frontend Environment Variables**:
   Copy the `.env.sample` file in the `client` directory and rename it to `.env`:
     ```bash
     cp .env.sample .env
     ```
   Open the `.env` file and fill in the required values.

7. **Start Frontend**:
   ```bash
    npm run dev
   ```

---

### Final Steps:
- Open your browser and navigate to `http://localhost:5173` to view the Auratime application.
- Ensure both the frontend and backend are running for full functionality.

--- 

This ensures all components are properly configured and running!

## Usage

1. **User Registration/Login**:
   - Register with your email or use third-party providers.
   
2. **Explore Products**:
   - Browse for luxury watches.
   
3. **Add to Cart**:
   - Add watches to your cart and view them at any time.
   
4. **Checkout Process**:
   - Secure and seamless checkout flow.

---

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

[MIT License](LICENSE)

---

## Contact

For any questions or feedback, reach out via:

- **Email**: bhavishya2601garg@gmail.com
- **GitHub**: [bhavishya2601](https://github.com/bhavishya2601)
