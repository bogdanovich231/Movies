import { IFormInput } from "../../Interfaces/Interfaces";
import "../FormUncontrolled/Form.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../Validation/Validation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setFormData } from "../../slice/FormSlice";
import { useEffect, useState } from "react";
import { fetchCountries } from "../../slice/CountriesSlice";
import Card from "../Card/Card";

function FormHook() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.data);
  const countries = useSelector((state: RootState) => state.countries.list);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isFormValid, setFormValid] = useState(true);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) as any });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(setFormData(data));
    setSubmitted(true);
  };

  useEffect(() => {
    dispatch(fetchCountries() as any);
  }, [dispatch]);

  useEffect(() => {
    const isFormValid = Object.keys(errors).length === 0;
    setFormValid(isFormValid);
  }, [errors]);

  return (
    <>
      <div className="form_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h4>Your Name:</h4>
            <input {...register("name", { required: true })} />
            {errors.name && <p>{errors.name.message}</p>}
          </label>
          <label>
            <h4>Your age:</h4>
            <input {...register("age", { required: true })} />
            {errors.age && <p>{errors.age.message}</p>}
          </label>
          <label>
            <h4>Gmail:</h4>
            <input {...register("gmail", { required: true })} />
            {errors.gmail && <p>{errors.gmail.message}</p>}
          </label>
          <div>
            <label>
              <h4>Select a country:</h4>
              <input
                {...register("country", { required: true })}
                list="countries"
              />
              <datalist id="countries">
                {countries.map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>
              {errors.country && <p>{errors.country.message}</p>}
            </label>
          </div>
          <div className="select_container">
            <h4> Gender:</h4>
            <label>
              <input
                type="radio"
                value="male"
                {...register("gender", { required: true })}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                {...register("gender", { required: true })}
              />
              Female
            </label>
          </div>
          <div>
            <h4>Password</h4>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <h4>Password Again</h4>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <label>
              <h4>Upload Image:</h4>
              <input
                className="custom-file-input"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setValue("image", reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <div className="select_container">
            <label>
              <h4>Accept Terms and Conditions:</h4>
              <input
                type="checkbox"
                {...register("acceptTerms", { required: true })}
              />
            </label>
            {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
          </div>
          <input
            className="button_submit"
            type="submit"
            disabled={!isFormValid}
          />
        </form>
      </div>
      {isSubmitted && formData && <Card data={formData} />}
    </>
  );
}

export default FormHook;
