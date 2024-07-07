import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { UserProvider } from "./contexts/auth.context.jsx";
import Navbar from "./components/Navbar.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import TaskDetailsPage from "./pages/TaskDetailsPage.jsx";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/task">
          <Route index element={<TasksPage />} />
          <Route path=":taskId" element={<TaskDetailsPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
