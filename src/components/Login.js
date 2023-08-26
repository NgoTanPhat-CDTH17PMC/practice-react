import { useContext, useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginRedux } from "../redux/actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loadingApi = useSelector((state) => state.user.isLoading);
  const errorApi = useSelector((state) => state.user.isError);
  const account = useSelector((state) => state.user.account);

  useEffect(() => {
    // let token = localStorage.getItem("token");
    // if (token) {
    //   navigate("/");
    // }
    if (account && account.auth === true) {
      navigate("/");
    }
  }, [account]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password can not be empty!");
      return;
    }

    dispatch(handleLoginRedux(email, password));

    // let res = await loginApi(email.trim(), password);
    // if (res && res.token) {
    //   localStorage.setItem("token", res.token);
    //   toast.success("Login successful!");
    //   setLoadingApi(false);
    //   loginContext(email, res.token);
    //   navigate("/");
    // } else {
    //   if (res && +res.status === 400) {
    //     toast.error(res.data.error);
    //     setLoadingApi(false);
    //   }
    // }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-container d-flex mx-auto flex-column col-12 col-md-6">
        <div className="title">Login</div>
        <div className="">Email or username (eve.holt@reqres.in)</div>
        <input
          type="text"
          placeholder="Email or  Username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="password-group">
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handlePressEnter(event)}
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
            onClick={() => handleLogin()}
          >
            {loadingApi ? <i className="fas fa-sync fa-spin"></i> : ""} Login
          </button>
          <div className="back" onClick={() => handleBack()}>
            <i className="fa fa-angle-left mx-2" aria-hidden="true"></i> Go back
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
