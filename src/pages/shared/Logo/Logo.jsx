import { Link } from "react-router";
import logoImg from "../../../assets/logo.png";

function Logo({ footer }) {
  return (
    <div>
      <Link to="/" className="flex items-end">
        <img
          className="w-7 md:w-9 mb-1.5 md:mb-2"
          src={logoImg}
          alt="Profast logo"
        />
        <h3
          className={`-ml-3 md:-ml-3.5 text-xl md:text-3xl font-extrabold ${
            footer !== "footer" ? "text-gray-900" : "text-slate-100"
          }  `}
        >
          Profast
        </h3>
      </Link>
    </div>
  );
}
export default Logo;
