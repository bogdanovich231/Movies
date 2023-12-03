import { useDispatch, useSelector } from 'react-redux';
import './Form.scss';
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
    const [isFormValid, setFormValid] = useState(true);
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
    const validateForm = () => {
        schema
            .validate(formValues, { abortEarly: false })
            .then(() => {
                setFormErrors({});
                setFormValid(true);
            })
            .catch((err) => {
                const validationErrors: IFormErrors = {};
                err.inner.forEach((error: { path: string; message: string }) => {
                    validationErrors[error.path as keyof IFormErrors] = error.message;
                });
                setFormErrors(validationErrors);
                setFormValid(false);
            });
    };
    useEffect(() => {
        validateForm();
    }, [formValues]);

    const onSubmit = () => {
        dispatch(setFormData(formValues));
        setSubmitted(true);
    };
    return (
        <>
            <div className="form_container">
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <label>
                        <h4> Your Name:</h4>
                        <input name="name" value={formValues.name} onChange={handleInputChange} />
                        {formErrors.name && <p>{formErrors.name}</p>}
                    </label>
                    <label>
                        <h4> Your age:</h4>
                        <input name="age" type="number" value={formValues.age} onChange={handleInputChange} />
                        {formErrors.age && <p>{formErrors.age}</p>}
                    </label>
                    <label>
                        <h4>Gmail:</h4>
                        <input name="gmail" value={formValues.gmail} onChange={handleInputChange} />
                        {formErrors.gmail && <p>{formErrors.gmail}</p>}
                    </label>
                    <div>
                        <label>
                            <h4>Select a country:</h4>
                            <input name="country" list="countries" value={formValues.country} onChange={handleInputChange} />
                            <datalist id="countries">
                                {countries.map((country) => (
                                    <option key={country} value={country} />
                                ))}
                            </datalist>
                            {formErrors.country && <p>{formErrors.country}</p>}
                        </label>
                    </div>
                    <div className="select_container">
                        <h4>Gender:</h4>
                        <label>
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
                        <h4>Password</h4>
                        <input name="password" type="password" value={formValues.password} onChange={handleInputChange} />
                        {formErrors.password && <p>{formErrors.password}</p>}
                    </div>
                    <div>
                        <h4>Password Again</h4>
                        <input name="confirmPassword" type="password" value={formValues.confirmPassword} onChange={handleInputChange} />
                        {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
                    </div>
                    <div>
                        <label>
                            <h4>Upload Image:</h4>
                            <input
                                className="custom-file-input"
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
                        <label className="select_container">
                            <h4>Accept Terms and Conditions:</h4>
                            <input name="acceptTerms" type="checkbox" checked={formValues.acceptTerms} onChange={handleInputChange} />
                        </label>
                        {formErrors.acceptTerms && <p>{formErrors.acceptTerms}</p>}
                    </div>
                    <input className="button_submit" type="submit" disabled={!isFormValid} />
                </form>
            </div>
            {isSubmitted && formData && <Card data={formData} />}
        </>
    );
}
export default FormUncontrolled;