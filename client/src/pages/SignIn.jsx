/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { failed, start, success } from "../utils/authSlice";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth";
function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  useEffect(() => {
    console.log(user);
  }, [user]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(start());
      const res = await fetch("http://localhost:3000/api/v1/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.statusCode) {
        throw new Error("Something Went Wrong");
      }

      const data = await res.json();

      dispatch(success(data));
      // console.log(user);

      navigate("/");
    } catch (error) {
      dispatch(failed(error.message));
    }
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold mb-3 mt-3 text-[#2e1065]">
        Sign In
      </h1>

      <form
        className="flex
  flex-col gap-2 max-w-3xl p-3 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full bg-[#f5f3ff] border-[#c4b5fd]"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          className="input input-bordered w-full bg-[#f5f3ff] border-[#c4b5fd]"
          id="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-block bg-[#4c1d95] text-[#f5f3ff] hover:bg-[#7c3aed] transition-all"
        >
          Sign In
        </button>
        <OAuth />
        <div className="flex gap-2 text-l">
          <p className="text-stone-900 font-semibold ">Don't have an account</p>
          <Link to="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
