import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { UserProvider } from "./contexts/auth.context.jsx";
import Navbar from "./components/Navbar.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import TaskDetailsPage from "./pages/TaskDetailsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/register"];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/task">
            <Route index element={<TasksPage />} />
            <Route path=":taskId" element={<TaskDetailsPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
