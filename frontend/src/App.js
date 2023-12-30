import Signin from "./modules/Signin";
import Dashboard from "./modules/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children,auth=false }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null|| false;

  if (!isLoggedIn && auth) {
    // Redirect to the signin page if not logged in
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
           <ProtectedRoute auth={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
