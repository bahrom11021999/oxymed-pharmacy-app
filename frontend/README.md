# App Structure Oxymed

## Entry Point
The entry point of the app is `App.js`. It sets up providers (`CartProvider` and `QueryClientProvider`), the router (`BrowserRouter`), and a fallback loader for suspense.

## Contexts
- **CartContext**: Manages the state of the user's shopping cart.

## Routes
- **Protected Routes**: Utilized for routes that require authentication.
- **Public Routes**: Open for all users.

## Pages

### User Pages
- **Home**: Displays the home page.
- **Cart**: Displays the user's shopping cart.
- **Medicines**: Lists available medicines.
- **Filials**: Lists locations.
- **Medicine**: Displays details of a specific medicine.
- **Transactions**: Lists user transactions.
- **Transaction**: Displays details of a specific transaction.
- **OrderTracking**: Tracks order status.
- **Payment**: Handles payment processing.
- **Support**: Provides support information.

### Admin Pages
- **Dashboard**: Admin dashboard.
- **Users**: User management page.
- **CreateMedicine**: Page for creating new medicines.
- **AdminMedicines**: Lists all medicines for admin.
- **AdminTransactions**: Lists all transactions for admin.

### Authentication Pages
- **Login**: Login page.
- **Signup**: Registration page.

### Error Page
- **Error**: Displays when a route is not found.

## Components
- **AppLayout**: Layout component for rendering header, footer, etc.
- **Loader**: Component for showing loading state.
- **Error**: Component for displaying error messages.
- **ProtectedRoute**: Component for protecting routes that require authentication.

## Hooks and Utils
- Custom hooks or utility functions can be added as needed for shared logic.

## External Libraries
- Utilizes external libraries such as `react-router-dom` for routing and `@tanstack/react-query` for data fetching and caching.

## How It Works

### Routing
- Routes are defined using `react-router-dom`, ensuring that each URL corresponds to a specific page component.
- Protected routes are wrapped in `ProtectedRoute` to handle authentication.

### State Management
- Uses `CartContext` for managing shopping cart state across components.
- `react-query` manages data fetching and caching, improving the performance of API requests.

### Authentication
- Basic authentication is implemented with login and registration pages.
- Protected routes ensure that only authenticated users can access certain pages.

### Data Fetching
- `react-query` handles data fetching, caching, and synchronization with the server.
- Data for different pages/components is fetched asynchronously when needed, improving perceived performance.

### UI/UX
- Utilizes `Suspense` for lazy loading components, improving initial load time.
- Error boundaries (`Error` component) catch errors and display error messages to users.
- `Loader` component shows loading state while waiting for data.

### Admin Panel
- Admin pages are protected and accessible only to authorized users.
- Admin functionalities include managing users, medicines, and transactions.

### Toasts
- Utilizes `react-hot-toast` for displaying toast notifications for success and error messages.
