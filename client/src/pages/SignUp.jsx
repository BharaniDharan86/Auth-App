import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { failed, start, success } from "../utils/authSlice";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(start());
      const postData = await fetch(
        "http://localhost:3000/api/v1/user/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const res = postData.json();
      dispatch(success(res));
      navigate("/");
    } catch (error) {
      dispatch(failed(error.message));
    } finally {
      setFormData({});
    }
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold mb-3 mt-3 text-[#2e1065]">
        Sign Up
      </h1>

      <form
        className="flex
      flex-col gap-2 max-w-3xl p-3 mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full bg-[#f5f3ff] border-[#c4b5fd] "
          id="username"
          onChange={handleChange}
        />
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
          Sign Up
        </button>
        <OAuth />
        <div className="flex gap-2 text-l">
          <p className="text-stone-900 font-semibold ">Have an Account ?</p>
          <Link to="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
