import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="max-w-[800px]  mx-auto my-20">
      <h1 className="text-center font-bold text-stone-900 text-2xl mb-3">
        Profile Page
      </h1>
      <form className="flex flex-col">
        <img
          src={user.photoUrl}
          alt=""
          className=" h-24 w-24 rounded-full self-center mb-3"
        />
        <input
          type="text"
          placeholder="Update Username"
          className="input input-bordered w-full p-4 mb-3"
          defaultValue={user.username}
        />
        <input
          type="email"
          placeholder="Update Password"
          className="input input-bordered w-full p-4 mb-3"
          defaultValue={user.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full p-4 mb-3"
        />
        <button
          type="submit"
          className="btn btn-block bg-[#4c1d95] text-[#f5f3ff] hover:bg-[#7c3aed] transition-all"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between text-red-600 text-lg mt-4">
        <button>Delete</button>
        <button>Sign Out</button>
      </div>
    </div>
  );
}

export default Profile;
