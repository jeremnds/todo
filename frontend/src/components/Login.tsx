import { useUser } from "@/contexts/useUser";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import Container from "./Container";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const loginSchema = z.object({
  identifier: z.string().min(1, "Your username or email cannot be empty"),
  password: z
    .string()
    .min(5, "Your password must contain at least 5 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const [error, setError] = useState("");
  const { user, setUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const url = import.meta.env.VITE_BACKEND_URL;
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");
  useEffect(() => {
    if (user) navigate("/todos");
  }, [navigate, user]);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        const decodedToken: { id: string; username: string } = jwtDecode(
          data.token,
        );

        setUser({
          id: decodedToken.id,
          username: decodedToken.username,
        });
        reset();
        setError("");
        navigate("/todos");
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  return (
    <Container className="flex h-[calc(100vh-2.5rem)] flex-col items-center justify-center gap-4">
      {success && (
        <div className="rounded-md bg-green-300 p-4 text-zinc-800">
          Registration complete! Please log in to continue
        </div>
      )}
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Username or email</Label>
                <Input
                  id="identifier"
                  type="text"
                  {...register("identifier")}
                />
                {getErrorMessage(errors.identifier)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {getErrorMessage(errors.password)}
              </div>
              {error && (
                <div className="bg-red-200 p-2 text-center text-red-800">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 underline">
              Sign up.
            </Link>
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
