import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import TopNavigation from "./components/Header/TopNavigation";

import LoginPage from "./pages/LoginPage";
import LocationsPage from "./pages/LocationsPage";
import ProfilePage from "./pages/ProfilePage";

function isAuthenticated() {
  return (
    localStorage.getItem(
      "fieldNationAuthenticated"
    ) === "true"
  );
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/"
          element={
            <Navigate
              to={
                isAuthenticated()
                  ? "/locations"
                  : "/login"
              }
              replace
            />
          }
        />

        <Route
          path="/locations"
          element={
            <ProtectedRoute>
              <>
                <TopNavigation />
                <LocationsPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <>
                <TopNavigation />
                <ProfilePage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={
                isAuthenticated()
                  ? "/locations"
                  : "/login"
              }
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;