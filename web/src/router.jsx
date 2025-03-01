import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // ✅ Home as the default route
      { path: 'users', element: <Users /> },
      { path: 'users/:id', element: <User /> }, 
      { path: 'add-user', element: <AddUser /> },
      { path: 'edit-user/:id', element: <EditUser /> },
    ],
  },
]);

export default router;