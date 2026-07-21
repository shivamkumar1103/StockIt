import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  return (
    <>
      <div>Settings Page</div>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    </>
  );
}

export default Settings;
