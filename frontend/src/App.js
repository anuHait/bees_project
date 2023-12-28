import Signin from "./modules/Signin";
import Dashboard from "./modules/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem('user:token') !== null;

//   if (!isLoggedIn) {
//     // Redirect to the signin page if not logged in
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
           
              <Dashboard />
            
          }
        />
      </Routes>
    </>
  );
}

export default App;
