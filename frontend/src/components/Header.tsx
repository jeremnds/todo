import { useUser } from "@/contexts/useUser";
import { Link, useNavigate } from "react-router-dom";
import Container from "./Container";

export default function Header() {
  const { user, loading, setUser } = useUser();
  const navigate = useNavigate();

  if (loading) return;

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="flex h-10 items-center bg-neutral-900">
      <Container className="flex w-full">
        {user && (
          <p>
            Hello <span className="capitalize">{user?.username}</span>
          </p>
        )}
        <nav className="ml-auto">
          <ul className="flex gap-6">
            <li>
              <Link to="/todos" className="hover:underline">
                Todos
              </Link>
            </li>
            {user ? (
              <li>
                <button
                  className="cursor-pointer hover:underline"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </li>
            ) : (
              <li>
                <Link to="/" className="hover:underline">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
