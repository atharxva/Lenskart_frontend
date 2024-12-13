import React from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignOut,
} from "../firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

//

async function storeUserData(userData) {
  try {
    const response = await fetch("http://localhost:8000/getAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("User data stored:", data);
  } catch (error) {
    console.error("Error storing user data:", error);
  }
}

function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const { user } = await doCreateUserWithEmailAndPassword(email, password);
      const userData = {
        email: user.email,
        firebaseUid: user.uid,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log(userData);
      await storeUserData(userData);
      // Handle successful signup (e.g., redirect to dashboard)
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await doSignInWithEmailAndPassword(email, password);
      console.log("User logged in:", user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await doSignInWithGoogle();
      const user = result.user;
      console.log(user);
      console.log("User logged in with Google:", user);
      // Handle successful Google login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
      console.log("User signed out");
      // Handle successful logout (e.g., redirect to login page)
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div>
        {/* ... other components ... */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/Form">
            <button
              onClick={() => {
                console.log("Hello");
                handleSignup();
              }}
            >
              Sign Up
            </button>
          </Link>
          <button onClick={handleLogin}>Log In</button>
          <button onClick={handleGoogleLogin}>Sign In with Google</button>
          <button onClick={handleLogout}>Log Out</button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Landing;
