import { useDispatch, useSelector } from 'react-redux';
import './FormUncontrolled.scss';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { fetchCountries } from '../../slice/CountriesSlice';
import { setFormData } from '../../slice/FormSlice';
import Card from '../Card/Card';
import { IFormErrors, IFormInput } from '../../Interfaces/Interfaces';
import { schema } from '../../Validation/Validation';

function FormUncontrolled() {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form.data);
    const countries = useSelector((state: RootState) => state.countries.list);
    const [isSubmitted, setSubmitted] = useState(false);
    const [formValues, setFormValues] = useState<IFormInput>({
        name: "",
        age: 0,
        gmail: "",
        gender: "male",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        image: "",
        country: "",
    });
    const [formErrors, setFormErrors] = useState<IFormErrors>({});

    useEffect(() => {
        dispatch(fetchCountries() as any);
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const onSubmit = () => {
        schema
            .validate(formValues, { abortEarly: false })
            .then(() => {
                console.log("Form is valid");
                dispatch(setFormData(formValues));
                setSubmitted(true);
            })
            .catch((err) => {
                const validationErrors: IFormErrors = {};
                err.inner.forEach((error: { path: string; message: string }) => {
                    validationErrors[error.path as keyof IFormErrors] = error.message;
                });
                setFormErrors(validationErrors);
            });
    };

    return (
        <div className="form_container">
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                <label>
                    Your Name:
                    <input name="name" value={formValues.name} onChange={handleInputChange} />
                    {formErrors.name && <p>{formErrors.name}</p>}
                </label>
                <label>
                    Your age:
                    <input name="age" type="number" value={formValues.age} onChange={handleInputChange} />
                    {formErrors.age && <p>{formErrors.age}</p>}
                </label>
                <label>
                    Gmail:
                    <input name="gmail" value={formValues.gmail} onChange={handleInputChange} />
                    {formErrors.gmail && <p>{formErrors.gmail}</p>}
                </label>
                <div>
                    <label>
                        Выберите страну:
                        <input name="country" list="countries" value={formValues.country} onChange={handleInputChange} />
                        <datalist id="countries">
                            {countries.map((country) => (
                                <option key={country} value={country} />
                            ))}
                        </datalist>
                        {formErrors.country && <p>{formErrors.country}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Gender:
                        <input type="radio" name="gender" value="male" checked={formValues.gender === "male"} onChange={handleInputChange} />
                        Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" checked={formValues.gender === "female"} onChange={handleInputChange} />
                        Female
                    </label>
                    {formErrors.gender && <p>{formErrors.gender}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" value={formValues.password} onChange={handleInputChange} />
                    {formErrors.password && <p>{formErrors.password}</p>}
                </div>
                <div>
                    <label>Password Again</label>
                    <input name="confirmPassword" type="password" value={formValues.confirmPassword} onChange={handleInputChange} />
                    {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
                </div>
                <div>
                    <label>
                        Upload Image:
                        <input
                            name="image"
                            type="file"
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormValues((prevValues) => ({ ...prevValues, image: reader.result as string }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                    {formErrors.image && <p>{formErrors.image}</p>}
                </div>
                <div>
                    <label>
                        Accept Terms and Conditions:
                        <input name="acceptTerms" type="checkbox" checked={formValues.acceptTerms} onChange={handleInputChange} />
                    </label>
                    {formErrors.acceptTerms && <p>{formErrors.acceptTerms}</p>}
                </div>
                <input type="submit" />
            </form>
            {isSubmitted && formData && <Card data={formData} />}
        </div>
    );
}
export default FormUncontrolled;