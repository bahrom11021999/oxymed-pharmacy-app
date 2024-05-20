import { NavLink } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { login, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    login({ username, password });
  };

  return (
    <div className="grid h-screen bg-slate-50 text-slate-800 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-end space-y-4 bg-slate-50 sm:justify-center sm:bg-blue-100">
        <img
          src="/images/medicine.png"
          alt="FYX logo"
          className="h-40 w-fit sm:h-60"
        />

        <h2 className="text-2xl font-normal sm:text-3xl">Welcome to Oxymed</h2>
        <p className="text-md font-light sm:text-xl">Login to your account</p>
      </div>

      <div className="flex items-start justify-center pt-6 sm:items-center sm:pt-0">
        <form
          className="flex w-2/3 flex-col place-items-center items-center justify-center space-y-4 sm:w-2/4"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              className="rounded border border-slate-400 p-2"
            />
          </div>

          <div className="flex w-full flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="********"
              className="rounded border border-slate-400 p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-slate-700 p-2 text-white"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <NavLink to="/register" className="hover:text-blue-500">
            Do not have an account? Register
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
