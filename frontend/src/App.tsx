import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./contexts/useUser";
import TodoPage from "./pages/TodoPage";

function App() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { user, loading } = useUser();
  useEffect(() => {
    if (!url) {
      console.error("BACKEND_URL is not defined");
      return;
    }
    if (loading) return;
    if (!user) {
      navigate("/");
      return;
    }
  }, [loading, url, user, navigate]);

  return user && <TodoPage />;
}
export default App;
