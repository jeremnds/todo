import Loader from "@/components/Loader";
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
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${url}/api/users/status`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [url]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {!loading ? children : <Loader />}
    </UserContext.Provider>
  );
};
