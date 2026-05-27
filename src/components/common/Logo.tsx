import { navigate } from "../../navigation";
import logoImage from "../../assets/logo.jpg";
import "./Logo.scss";

// Logo button component that always navigates back to the user list.
export function Logo() {
  return (
    <button
      className="logo"
      onClick={() => navigate("/users")}
      type="button"
      aria-label="Lendsqr home"
    >
      <img src={logoImage} alt="" />
    </button>
  );
}
