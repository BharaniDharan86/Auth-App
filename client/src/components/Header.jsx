import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="bg-[#5b21b6] border-b border[#ede9fe] flex justify-between items-center py-2 px-4">
      <h1 className="font-semibold text-[#ede9fe]">Auth-App</h1>
      <ul className="flex gap-4  text-[#ede9fe]">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/sign-in">Sign In</NavLink>
      </ul>
    </div>
  );
}

export default Header;
