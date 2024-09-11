import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/profile", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
          setUser(null);
          throw new Error("User not logged in");
        }

        const result = await response.json();
        setUser(result.user); // Set the user data
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null); // Ensure the user is set to null if an error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { user, loading };
};

export default useAuth;
