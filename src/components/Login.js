import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <>
      <div className="login-container d-flex mx-auto flex-column col-12 col-md-6">
        <div className="title">Login</div>
        <div className="">Email or username</div>
        <input
          type="text"
          placeHolder="Email or  Username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="password-group">
          <input
            type={isShowPassword ? "text" : "password"}
            placeHolder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <i
              className="fa fa-eye"
              aria-hidden="true"
              onClick={() => setIsShowPassword(false)}
            ></i>
          ) : (
            <i
              className="fa fa-eye-slash"
              aria-hidden="true"
              onClick={() => setIsShowPassword(true)}
            ></i>
          )}
        </div>

        <div>
          <button
            className="btn btn-primary border-rounded"
            disabled={email && password ? false : true}
          >
            Login
          </button>
          <div className="back">
            <i className="fa fa-angle-left mx-2" aria-hidden="true"></i> Go back
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
