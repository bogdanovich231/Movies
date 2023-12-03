import { IFormInput } from '../../Interfaces/Interfaces';
import './FormHook.scss';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../../Validation/Validation';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store';
import { setFormData } from '../../slice/FormSlice';
import { useEffect, useState } from 'react';
import { fetchCountries } from '../../slice/CountriesSlice';
import Card from '../Card/Card';

function FormHook() {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form.data);
    const countries = useSelector((state: RootState) => state.countries.list);
    const [isSubmitted, setSubmitted] = useState(false);

    const {
        setValue,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) as any });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        dispatch(setFormData(data));
        setSubmitted(true);
    };

    useEffect(() => {
        dispatch(fetchCountries() as any);
    }, [dispatch]);

    console.log(watch("name"));
    console.log(watch("age"));
    return (
        <div className="form_container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Your Name:
                    <input {...register("name", { required: true, })} />
                    {errors.name && <p>{errors.name.message}</p>}
                </label>
                <label>
                    Your age:
                    <input {...register("age", { required: true })} />
                    {errors.age && <p>{errors.age.message}</p>}
                </label>
                <label>
                    Gmail:
                    <input {...register("gmail", { required: true })} />
                    {errors.gmail && <p>{errors.gmail.message}</p>}
                </label>
                <div>
                    <label>
                        Выберите страну:
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
                <div>
                    <label>
                        Gender:
                        <input type="radio" value="male" {...register("gender", { required: true })} />
                        Male
                    </label>
                    <label>
                        <input type="radio" value="female" {...register("gender", { required: true })} />
                        Female
                    </label>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register("password", { required: "Password is required" })} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    <label>Password Again</label>
                    <input
                        type="password"
                        {...register("confirmPassword", { required: "Confirm Password is required" })}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>

                <div>
                    <label>
                        Upload Image:
                        <input
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
                <div>
                    <label>
                        Accept Terms and Conditions:
                        <input type="checkbox" {...register("acceptTerms", { required: true })} />
                    </label>
                    {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
                </div>
                <input type="submit" />
            </form>
            {isSubmitted && formData && <Card data={formData} />}
        </div>
    )
}

export default FormHook;