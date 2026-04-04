import React, { useState } from "react";
import { useRegisterUserMutation } from "../redux/api/baseApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { IBackendError } from "../type/backendError.type";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // RTK Query gives you a trigger function and a status object
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Registering...");

    try {
      await registerUser(formData).unwrap();
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      toast.success("Registration successful", { id: toastId, duration: 2000 });
      navigate("/login");
    } catch (err) {
      toast.error("Failed to register!", { id: toastId, duration: 2000 });
      console.error("Failed to register:", err);
    }
  };

  return (
    <form className="_social_registration_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control _social_registration_input"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control _social_registration_input"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control _social_registration_input"
            />
          </div>
        </div>

        {/* Password */}
        <div className="col-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control _social_registration_input"
            />
          </div>
        </div>
      </div>

      {/* Error / Success */}
      {error && (
        <p style={{ color: "red" }}>
          {"data" in error
            ? (error as IBackendError).data.errorSources[0].message
            : "Error"}
        </p>
      )}

      {/* Button */}
      <div className="row">
        <div className="col-12">
          <div className="_social_registration_form_btn _mar_t40 _mar_b60">
            <button
              type="submit"
              disabled={isLoading}
              className="_social_registration_form_btn_link _btn1"
            >
              {isLoading ? "Registering..." : "Register Now"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
