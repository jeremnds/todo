import Loader from "@/components/Loader";
import { jwtDecode } from "jwt-decode";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type UserType = {
  id: string;
  username: string;
};
type UserContextType = {
  user: UserType | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      if (token) {
        try {
          const decodedToken: { id: string; username: string } =
            jwtDecode(token);

          setUser({
            id: decodedToken.id,
            username: decodedToken.username,
          });
        } catch (error) {
          console.error("Invalid token:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {!loading ? children : <Loader />}
    </UserContext.Provider>
  );
};
