import { useState, useEffect } from "react";
import { UserData } from "./userData.interface";

const useUserData = (numberOfResults: number) => {
  const [userData, setUserData] = useState<UserData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=${numberOfResults}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const users = data.results;
        setUserData(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [numberOfResults]); // Include numberOfResults in the dependency array to trigger a re-fetch when it changes.

  return userData;
};

export default useUserData;
