import React from "react";
import { useDispatch } from "react-redux";
import { useCustomForm } from "../../hooks/useForm";
import { useForm } from "react-hook-form";

export const Signin = () => {
  const [formRegisterValues, handleRegisterChange] = useCustomForm({
    rName: "",
    rEmail: "",
    rPassword: "",
    rRepeatPassword: "",
  });

  const { register, handleSubmit, getValues, errors } = useForm();
  const { rName, rEmail, rPassword, rRepeatPassword } = formRegisterValues;
  const dispatch = useDispatch();

  return (
    <div className="container login-container">
      <div className="row">
        <di className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form
            /*</div></div>onSubmit={handleSubmit(onSubmit)}*/ autoComplete="off"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="rName"
                value={rName}
                onChange={handleRegisterChange}
                ref={register({ required: true, minLength: 4 })}
              />
              {errors.rName && errors.rName.type === "required" && (
                <p> The name is required </p>
              )}
              {errors.rName && errors.rName.type === "minLength" && (
                <p> This field required min lenght of 4 </p>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterChange}
                ref={register({
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                autoComplete="off"
              />
              {errors.rEmail && errors.rEmail.type === "required" && (
                <p> The email is required </p>
              )}

              {errors.rEmail && errors.rEmail.type === "pattern" && (
                <p> The email is not valid </p>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="rPassword"
                autoComplete="off"
                value={rPassword}
                onChange={handleRegisterChange}
                ref={register({
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
              />
              {errors.rPassword && errors.rPassword.type === "required" && (
                <p> The Password is required </p>
              )}

              {errors.rPassword && errors.rPassword.type === "minLength" && (
                <p> The password required min lenght of 6 </p>
              )}

              {errors.rPassword && errors.rPassword.type === "maxLength" && (
                <p> The password required max lenght of 20 </p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repeat password"
                name="rRepeatPassword"
                autoComplete="off"
                value={rRepeatPassword}
                onChange={handleRegisterChange}
                ref={register({
                  required: "Please confirm password!",
                  validate: {
                    matchesPreviousPassword: (rRepeatPassword) => {
                      const { rPassword } = getValues();
                      return (
                        rPassword === rRepeatPassword ||
                        "Passwords should match!"
                      );
                    },
                  },
                })}
              />
              {errors.rRepeatPassword && (
                <p>{errors.rRepeatPassword.message}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit btn-lg btn-block"
                value="Create"
              />
            </div>
          </form>
        </di>
      </div>
    </div>
  );
};
