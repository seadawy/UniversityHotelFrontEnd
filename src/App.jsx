import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { useAuthContext } from "./Auth/useAuthContext";
import { Sugar } from 'react-preloaders';
import { useEffect, useState } from 'react';
import Login from './Auth/Login';
import Register from './Auth/Register';
import UserLayout from './User/UserLayout';
import Profile from './User/Profile';
import Requests from './User/Requests';
import Rooms from './User/Rooms';
import Reports from './User/Reports';
import AdminLayout from './Admin/AdminLayout';
import Dashboard from './Admin/Dashboard';
import AddRooms from './Admin/AddRooms';

// Helper function to check if user is a super admin
const isSuperAdmin = (user) => user && user.roles && user.roles.includes('SuperAdmin');

function App() {
  const { user, token } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
    setLoading(true);
  }, [user]);

  return (
    <>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={!user ? <Login /> : <Navigate to="/profile" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
            <Route path="/rooms" element={user ? <Rooms /> : <Navigate to="/" />} />
            <Route path="/requests" element={user ? <Requests /> : <Navigate to="/" />} />
            <Route path="/reports" element={user ? <Reports /> : <Navigate to="/" />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/Admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rooms" element={<AddRooms />} />
            {/* Add more admin routes as needed */}
          </Route>

          {/* Redirect non-admin users from admin paths */}
          {/* <Route path="/admin/*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
      <Sugar customLoading={loading} background="#fff" color="#007b8a" />
    </>
  );
}

export default App;
