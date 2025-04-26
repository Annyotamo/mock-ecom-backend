# Mock-Ecom Backend

## Description

This is the backend for a mock e-commerce application. It stores product images in AWS S3 and product details, user information, and transaction history in MongoDB. It features role-based authentication, with certain endpoints restricted to admin users.

## Features

-   **Product Management:**
    -   Upload new products to the database, including storing images in AWS S3.
    -   Retrieve all product details.
    -   Delete products from the database and remove associated images from S3.
-   **User Authentication:**
    -   Register new users.
    -   Log in existing users.
-   **Transaction Management:**
    -   Record product purchases.
    -   Retrieve all transaction history.
    -   Delete transaction records.
-   **Role-Based Authentication:**
    -   Users have roles (currently, a basic user and admin).
    -   Admin users can:
        -   Upload and delete products.
        -   Delete users.
        -   View and delete all transactions.
        -   Grant and revoke admin access to other users.
        -   View all users.

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   AWS SDK (for S3)
-   [Other relevant technologies, e.g., Multer, JWT, etc.]

## Endpoints

The following endpoints are available:

### Product Endpoints

-   `POST /api/product/upload` **(A)**: Upload a new product. Requires admin role.
    -   Request body: `name`, `description`, `price`, `image` (file).
    -   Stores the image in AWS S3 and the product details in MongoDB.
-   `GET /api/products/all`: Retrieve all products.
-   `DELETE /api/product/delete` **(A)**: Delete a product. Requires admin role.
    -   Request body: `id` (product ID).

### User Authentication Endpoints

-   `POST /api/auth/register`: Register a new user.
    -   Request body: User registration details (e.g., `username`, `email`, `password`).
-   `POST /api/auth/login`: Log in a user.
    -   Request body: User login credentials (e.g., `email`, `password`).

### Transaction Endpoints

-   `POST /api/products/purchase?id={id}`: Record a product purchase.
    -   Query parameter: `id` (product ID).
-   `GET /api/transaction/all` **(A)**: Retrieve all transactions. Requires admin role.
-   `DELETE /api/transaction/delete` **(A)**: Delete a transaction. Requires admin role.
    -   Request body: `id` (transaction ID)

### User Management Endpoints (Admin Only)

-   `DELETE /api/user/delete` **(A)**: Delete a user. Requires admin role.
    -   Request body: `id` (user ID).
-   `POST /api/user/admin-access` **(A)**: Grant admin access to a user. Requires admin role.
    -   Request body: `id` (user ID).
-   `POST /api/user/revoke-admin-access` **(A)**: Revoke admin access from a user. Requires admin role.
    -   Request body: `id` (user ID).
-   `GET /api/user/all` **(A)**: Get all users. Requires admin role.

**(A) - Admin-only endpoint**

## Important Notes

-   **Environment Variables:** Ensure you have the following environment variables configured:
    -   `AWS_ACCESS_KEY`
    -   `AWS_SECRET_KEY`
    -   `AWS_REGION`
    -   `MONGODB_URI`
    -   `[Other relevant environment variables, e.g., JWT secret]`
-   **Database Setup:** You need a running MongoDB instance. Configure the connection URI in the `MONGODB_URI` environment variable.
-   **AWS S3 Setup:** You need an AWS S3 bucket to store product images. Ensure your AWS credentials are correct and that you have the necessary permissions.
-   **Authentication:** This backend uses role-based authentication. The specific authentication mechanism (e.g., JWT) is not detailed here, but you should implement a secure method for verifying user roles.
-   **Error Handling:** The backend should implement robust error handling, as shown in the code snippets, to provide informative responses to the client.
-   **Validation:** Input validation is crucial. Implement validation for all request bodies and query parameters to ensure data integrity.
-   **Security:** This application deals with user data and should be secured appropriately. This includes using HTTPS, protecting against common web vulnerabilities (e.g., CSRF, XSS), and securely storing passwords (e.g., using bcrypt).
