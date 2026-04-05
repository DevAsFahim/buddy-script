import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/api/baseApi";
import type { IBackendError } from "../type/backendError.type";
import { verifyToken } from "../utils/verifyToken";
import type { TUser } from "../type/user.type";
import { setUser } from "../redux/user/userSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const LoginFrom = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in");

    try {
      const res = await login({ email, password }).unwrap();
      const token = res.data.accessToken;

      const user = verifyToken(token) as TUser;

      dispatch(setUser({ user, token }));

      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
      navigate(`/feed`);
    } catch (err) {
      toast.error("Failed to Login", { id: toastId, duration: 2000 });
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="_social_login_form">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_form_input _mar_b14">
            <label className="_social_login_label _mar_b8">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control _social_login_input"
              required
            />
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_form_input _mar_b14">
            <label className="_social_login_label _mar_b8">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control _social_login_input"
              required
            />
          </div>
        </div>
      </div>

      {/* error message */}
      {error && (
        <p style={{ color: "red", fontSize: "14px" }}>
          {error
            ? (error as IBackendError).data.errorSources[0].message
            : "Login failed"}
        </p>
      )}

      <div className="row">
        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
          <div className="_social_login_form_btn _mar_t40 _mar_b60">
            <button
              type="submit"
              disabled={isLoading}
              className="_social_login_form_btn_link _btn1"
            >
              {isLoading ? "Authenticating..." : "Login now"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginFrom;
