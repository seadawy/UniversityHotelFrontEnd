import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { useAuthContext } from "./Auth/useAuthContext";
import { Sugar } from 'react-preloaders';
import { useEffect, useState } from 'react';
/* USER */
import Login from './Auth/Login';
import Register from './Auth/Register';
import UserLayout from './User/UserLayout';
import Profile from './User/Profile';
import Requests from './User/Requests';
import Rooms from './User/Rooms';
import Reports from './User/Reports';
import RoomDetails from './User/RoomDetails';

/* ADMIN */
import AdminLayout from './Admin/AdminLayout';
import Dashboard from './Admin/Dashboard';
import RoomsAdd from './Admin/RoomsAdd';
import AddUsers from './Admin/AddUsers';
import ReportsManage from './Admin/ReportsManage';
import ReportDetails from './Admin/ReportDetails';
import RoomsManage from './Admin/RoomsManage';
// Helper function to check if user is a super admin
const isSuperAdmin = (user) => user && user.roles && user.roles.includes('SuperAdmin');

function App() {
  const { user, token } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
    setLoading(true);
  }, [user]);

  const isSuperAdmin = (user) => user && user.roles && user.roles.includes('SuperAdmin');
  return (
    <>
      <Router>
        <Routes>
          {!isSuperAdmin(user) ?
            <Route Route path="/" element={<UserLayout />}>
              <Route index element={!user ? <Login /> : <Navigate to="/profile" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
              <Route path="/rooms" element={user ? <Rooms /> : <Navigate to="/" />} />
              <Route path="/rooms/:id" element={user ? <RoomDetails /> : <Navigate to="/" />} />
              <Route path="/requests" element={user ? <Requests /> : <Navigate to="/" />} />
              <Route path="/reports" element={user ? <Reports /> : <Navigate to="/" />} />
              <Route path="/admin/*" element={<Navigate to="/" />} />
            </Route>
            :
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
              {/* Rooms */}
              <Route path="rooms" element={<RoomsAdd />} />
              <Route path="rooms/manage" element={<RoomsManage />} />
              {/* Users */}
              <Route path="users" element={<AddUsers />} />
              {/* Complains */}
              <Route path="/reports/manage" element={<ReportsManage />} />
              <Route path="/reports/:id" element={<ReportDetails />} />
            </Route>
          }
        </Routes>
      </Router >
      {/* <Sugar customLoading={loading} background="#fff" color="#007b8a" /> */}
    </>
  );
}

export default App;
