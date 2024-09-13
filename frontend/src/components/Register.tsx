import { getErrorMessage } from "@/helpers/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

const registerSchema = z
  .object({
    username: z.string().min(1, "Your username cannot be empty"),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Your email cannot be empty"),
    password: z
      .string()
      .min(5, "Your password must contain at least 5 characters"),
    passwordValidation: z
      .string()
      .min(5, "Password validation must contain at least 5 characters"),
  })
  .refine((data) => data.password === data.passwordValidation, {
    message: "Passwords do not match",
    path: ["passwordValidation"],
  });

type registerData = z.infer<typeof registerSchema>;

export default function Register() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerData>({
    resolver: zodResolver(registerSchema),
  });

  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<registerData> = async (data) => {
    try {
      const response = await fetch(`${url}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        reset();
        setError("");
        navigate("/?success=true");
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  return (
    <Container className="flex h-screen items-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register("username")} />
              {getErrorMessage(errors.username)}
            </div>
            <div className="mb-2 space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="text" {...register("email")} />
              {getErrorMessage(errors.email)}
            </div>
            <div className="mb-2 space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {getErrorMessage(errors.password)}
            </div>
            <div className="mb-2 space-y-2">
              <Label htmlFor="passwordValidation">Confirm Password</Label>
              <Input
                id="passwordValidation"
                type="password"
                {...register("passwordValidation")}
              />
              {getErrorMessage(errors.passwordValidation)}
            </div>
            {error && (
              <div className="bg-red-200 p-2 text-center text-red-800">
                {error}
              </div>
            )}
            <div className="pt-6">
              <Button className="w-full" type="submit">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
