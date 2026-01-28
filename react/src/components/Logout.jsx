import { logout } from "../../services/authService";

function Logout() {
  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
