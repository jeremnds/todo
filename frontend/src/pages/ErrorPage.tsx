import Container from "@/components/Container";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Container>
      <div className="flex h-[calc(100vh-2.5rem)] flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Oops! Page not found.</h1>
        <p className="mt-4 text-lg">
          The page you're looking for doesn't exist or another error occurred.
        </p>
        <Link to="/" className="mt-6 text-blue-500 underline">
          Go back home
        </Link>
      </div>
    </Container>
  );
}
