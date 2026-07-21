import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  return (
    <>
      <div>Dashboard Page</div>
      <button onClick={() => navigate("/settings")}>Settings</button>
    </>
  );
}

export default DashBoard;
