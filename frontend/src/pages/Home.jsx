import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/auth/user")
      .then((parsed) => parsed.json())
      .then((response) => {
        if (response?.data) {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <h1>Google Login</h1>
      <p style={{ color: "red" }}>You are not logged out</p>
      <button onClick={() => (window.location.href = "/auth/google")}>
        Sign In
      </button>
    </div>
  );
}

export default Home;
