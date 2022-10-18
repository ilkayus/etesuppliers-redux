import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Pages from "pages";
import Components from "components";

function App() {
  const roles = new Set(["user", "manager", "admin"]);
  return (
    <Routes>
      <Route path="/login" element={<Pages.Login />} />
      <Route path="/register" element={<Pages.Register />} />
      <Route path="/unauthorized" element={<Components.Unauthorized />} />
      {/* Protected routes */}
      <Route element={<Components.RequireAuth allowedRoles={roles} />}>
        <Route path="/*" element={<Pages.Homepage />} />
      </Route>
      <Route
        path="*"
        element={<Components.Missing message="Came from app.tsx" />}
      />
    </Routes>
  );
}

export default App;
