import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  function handleLogout() {
    fetch("/auth/logout")
      .then((parsed) => parsed.json())
      .then((response) => {
        console.log(response?.success);
        if (response?.success) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch("/auth/user")
      .then((parsed) => parsed.json())
      .then((response) => {
        console.log(response);
        if (response?.data) {
          setUser(response.data);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div>
      <h1>Google Login</h1>
      <p style={{ color: "green" }}>Welcome {user?.name || ""}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
