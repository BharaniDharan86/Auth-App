import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="bg-slate-300 border-b border-stone-900 flex justify-between items-center py-2 px-4">
      <h1 className="font-semibold">Auth-App</h1>
      <ul className="flex gap-4 text-stone-800 ">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/sign-in">Sign In</NavLink>
      </ul>
    </div>
  );
}

export default Header;
