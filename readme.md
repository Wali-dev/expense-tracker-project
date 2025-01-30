# Expense Tracker API

A robust REST API for managing personal expenses with JWT authentication. Built with Node.js, Express, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- bcrypt for Password Hashing

## Key Features

- User Authentication with JWT
- CRUD operations for expenses
- Paginated expense retrieval
- Secure password handling
- Error handling with standardized responses

## Authentication Implementation

The system uses JWT (JSON Web Token) for authentication with the following flow:

1. **Registration**: New users register with firstname, lastname, email, and password
   - Passwords are hashed using bcrypt (10 rounds)
   - Each user gets a unique UUID
   
2. **Login Flow**:
   - User provides email and password
   - System validates credentials
   - On success, returns a JWT token valid for 24 hours
   - Token contains user ID and email in payload

3. **Authentication Middleware**:
   - All protected routes use `checkUserAuth` middleware
   - Extracts JWT token from Authorization header
   - Verifies token using `JWT_KEY`
   - Attaches user object to request (excludes password)
   - Returns 401 for invalid/missing tokens

Example middleware implementation:
```javascript
const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const { id } = jwt.verify(token, JWT_KEY);
            req.user = await User.findOne({ id }).select("-password");
            
            if (!req.user) {
                return res.status(400).json({ 
                    success: false, 
                    message: "User not found" 
                });
            }
            next();
        } catch (error) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized user" 
            });
        }
    }

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Token is required" 
        });
    }
};
```

4. **Protected Routes**:
   - All expense routes require valid JWT token
   - Token must be included in Authorization header as Bearer token
   - Format: `Authorization: Bearer <your_jwt_token>`

## Expense Management

### Data Model

Expenses have the following structure:
- Unique ID (UUID)
- Amount
- Category
- Description
- Timestamps (created/updated)

### Features

1. **Create Expense**
   - Endpoint: `POST /api/v1/expense/:userId`
   - Creates new expense and links to user
   - Returns both expense and updated user object

2. **Update Expense**
   - Endpoint: `PATCH /api/v1/expense/:expenseId`
   - Updates existing expense details
   - Validates expense ownership

3. **Delete Expense**
   - Endpoint: `DELETE /api/v1/expense/:expenseId`
   - Removes expense from database

4. **Get Expenses**
   - Endpoint: `GET /api/v1/expense?page=1&limit=10`
   - Supports pagination
   - Returns expenses for authenticated user

## API Endpoints

### User Endpoints

```
POST /api/v1/users         - Register new user
POST /api/v1/users/log-in  - User login
GET /api/v1/users          - Get user profile (protected)
```

### Expense Endpoints

```
POST /api/v1/expense/:userId    - Create new expense (protected)
PATCH /api/v1/expense/:id       - Update expense (protected)
DELETE /api/v1/expense/:id      - Delete expense (protected)
GET /api/v1/expense             - Get expenses (protected, paginated)
```

### Request/Response Examples

#### User Registration
```json
// Request
POST /api/v1/users
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "password123"
}

// Response
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "expenses": []
    }
}
```

#### Create Expense
```json
// Request Headers
Authorization: Bearer <your_jwt_token>

// Request Body
POST /api/v1/expense/:userId
{
    "amount": 1000,
    "category": "food",
    "description": "Grocery shopping"
}

// Response
{
    "success": true,
    "message": "Expense created successfully",
    "data": {
        "user": { /* user object */ },
        "expense": {
            "id": "uuid",
            "amount": 1000,
            "category": "food",
            "description": "Grocery shopping"
        }
    }
}
```

## Error Handling

The API uses a standardized error response format:

```json
{
    "success": false,
    "message": "Error description"
}
```

Common error scenarios:
- Invalid credentials
- Expired/invalid JWT
- Resource not found
- Validation errors
- Missing authentication token
- Unauthorized access

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```
   JWT_KEY=your_jwt_secret
   MONGODB_URI=your_mongodb_uri
   PORT=8000
   ```
4. Start the server: `npm start`

## Development

- Uses nodemon for development
- Express validator for request validation
- UUID for generating unique IDs



# Expense Management Application Frontend

A modern web application built with React and Vite for managing personal expenses. The application provides features for tracking expenses, viewing reports, and managing user accounts.

## Features

- **User Authentication**
  - Sign up with email and password
  - Sign in with existing credentials
  - Protected routes for authenticated users
  - Persistent authentication using JWT tokens

- **Expense Management**
  - Add new expenses with description, amount, and category
  - View all expenses in a paginated list
  - Delete existing expenses
  - Edit expense details
  - Categorize expenses

- **Reporting and Analytics**
  - Visual representation of expenses using charts
  - Category-wise expense breakdown
  - Monthly expense trends
  - Interactive data visualization using Recharts

## Tech Stack

- **Core Technologies**
  - React 18.3.1
  - Vite 6.0.5
  - React Router DOM 7.1.3
  - Tailwind CSS 3.4.12

- **UI Components and Styling**
  - Radix UI components
  - Lucide React for icons
  - Shadcn/ui components
  - Tailwind CSS for styling
  - Class Variance Authority
  - Tailwind Merge

- **Form Handling and Validation**
  - React Hook Form
  - Zod for schema validation

- **Data Visualization**
  - Recharts for charts and graphs

- **HTTP Client**
  - Axios for API calls

## Project Structure

```
src/
├── components/
│   ├── Pages/
│   │   ├── Home.jsx          # Main dashboard
│   │   ├── Report.jsx        # Analytics and reports
│   │   ├── Signin.jsx        # User authentication
│   │   └── Signup.jsx        # User registration
│   └── ui/                   # Reusable UI components
├── contexts/
│   └── AuthContext.jsx       # Authentication context
├── App.jsx                   # Root component
└── main.jsx                  # Entry point
```

## Getting Started

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn package manager

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate to project directory
   cd expense-management-frontend

   # Install dependencies
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

4. **Development**
   ```bash
   # Start development server
   npm run dev
   ```

5. **Building for Production**
   ```bash
   # Create production build
   npm run build

   # Preview production build
   npm run preview
   ```

## API Integration

The frontend connects to a RESTful API with the following endpoints:

- **Authentication**
  - POST `/users/log-in` - User login
  - POST `/users` - User registration

- **Expenses**
  - GET `/expense` - Fetch expenses with pagination
  - POST `/expense` - Create new expense
  - DELETE `/expense/:id` - Delete expense
  - PUT `/expense/:id` - Update expense

## Authentication Flow

1. User signs up/signs in through the authentication forms
2. JWT token is received from the API
3. Token is stored in localStorage
4. AuthContext maintains authentication state
5. Protected routes check for authentication status
6. Automatic token injection for authenticated requests

## Features in Detail

### Home Dashboard
- Displays recent transactions
- Pagination for expense list
- Add new expenses through a modal form
- Quick actions (edit/delete) for each expense

### Reports Page
- Bar chart showing category-wise expense distribution
- Monthly trend analysis
- Interactive tooltips for detailed information
- Summary statistics

### User Authentication
- Form validation using React Hook Form
- Error handling and display
- Password visibility toggle
- Loading states during authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.