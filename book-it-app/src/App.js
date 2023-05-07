import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import SingleEvent from "./pages/SingleEvent";
import ListEvents from "./pages/ListEvents";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ListOrders from "./pages/Orders";
import SingleOrder from "./pages/SingleOrder";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event/"
        element={
          <ProtectedRoute>
            <ListEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event/:eventId/"
        element={
          <ProtectedRoute>
            <SingleEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/"
        element={
          <ProtectedRoute>
            <ListOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/:orderId/"
        element={
          <ProtectedRoute>
            <SingleOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:profileId/"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:profileId/edit/"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Registration />} />
    </Routes>
  );
}

export default App;