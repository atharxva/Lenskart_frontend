import React, { useState, useEffect } from "react";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage.");
          return;
        }

        const response = await fetch(
          `http://localhost:8000/profile/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch user profile.");
        }
        const data = await response.json();
        setUserData(data);
        console.log("User data:", data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.fname}</h2>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
export default Profile;
