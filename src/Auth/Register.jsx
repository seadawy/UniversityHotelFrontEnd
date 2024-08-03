import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

const Register = () => {
    // Global
    const inputStyle = `block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
    const labelStyle = `block tracking-wide text-grey-darker text-base font-bold mb-2`;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Required
    const [FullName, setFullName] = useState('');
    const [NationalId, setNationalId] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const confPasswordHadel = (e) => {
        if (e.target.value !== Password) {
            setErrors({ ...errors, ConfPass: "كلمة المرور غير مطابقه" })
        } else {
            setErrors({ ...errors, ConfPass: null })
        }
        setConfPassword(e.target.value);
    }
    const [selectedGender, setSelectedGender] = useState('');
    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    // Phone Number
    const [PhoneNumber, setPhoneNumber] = useState('');

    // Adress
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [street, setStreet] = useState('');
    const [Address, setAdress] = useState('');
    useEffect(() => {
        setAdress(`${city} - ${area} - ${street}`);
    }, [city, area, street]);

    // Files
    const [profile, setProfile] = useState(null);
    const [front, setFront] = useState(null);
    const [back, setBack] = useState(null);

    const [region, setRegion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuthContext();
    const handelSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const SForm = new FormData();
        SForm.append('FullName', FullName);
        SForm.append('Email', Email);
        SForm.append('Password', Password);
        SForm.append('Gender', selectedGender);
        SForm.append('NationalId', NationalId);
        SForm.append('RegionId', 2);
        SForm.append('ProfilePic', profile);
        SForm.append('NationalIdPicFront', front);
        SForm.append('NationalIdPicBack', back);
        SForm.append('Address', Address);
        SForm.append('PhoneNumber', NationalId);

        fetch('/api/HotelAuth/register', {
            method: "POST",
            body: SForm
        }).then(res => res.json()).then((data) => {
            if (data.errors) {
                setErrors(data.errors);
            } else {
                localStorage.setItem('token', data.token);
                login(data.token);
            }
            setIsSubmitting(false)
        }).catch((err) => console.log(err));
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile(file);
        }
    };
    const handleFrontFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFront(file);
        }
    };
    const handleBackFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBack(file);
        }
    };
    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-7xl">
                {/* Registration Form */}
                <form onSubmit={handelSubmit} className="bg-white shadow-md rounded-md w-full px-8 pt-6 pb-8 flex flex-col">
                    <img src="img/welcome.jpg" width="400" className='mb-5 m-auto block lg:hidden md:hidden sm:hidden' alt="welcome" />
                    <h2 className="text-2xl font-semibold mb-10 text-center">تسجيل مستخدم جديد</h2>
                    {/* Full Name */}
                    <div className="-mx-3 md:flex mb-3">
                        <div className="md:w-full px-3">
                            <label className={labelStyle} htmlFor="fullName">
                                الاسم بالكامل
                            </label>
                            <input required className={inputStyle} id="fullName" type="text" value={FullName} onChange={(e) => setFullName(e.target.value)} />
                            {errors.FullName && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من ملء الحقل</p>}
                        </div>
                    </div>
                    {/* National ID */}
                    <div className="-mx-3 md:flex mb-3">
                        <div className="md:w-full px-3">
                            <label className={labelStyle} htmlFor="NationalId">
                                الرقم القومى
                            </label>
                            <input required className={inputStyle} id="NationalId" type="text" value={NationalId} onChange={(e) => setNationalId(e.target.value)} />
                            {errors.NationalId && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من ملء الحقل بشكل صحيح 14 رقم</p>}
                        </div>
                    </div>
                    {/* Email */}
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                            <label className={labelStyle} htmlFor="Email">
                                البريد الالكترونى
                            </label>
                            <input required className={inputStyle} id="Email" type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.Email && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من ملء الحقل</p>}
                        </div>
                    </div>
                    {/* Gender */}
                    <div className="-mx-3 flex items-center gap-10 mb-3">
                        <div className="flex items-center ms-3">
                            <input
                                required
                                id="default-radio-1"
                                type="radio"
                                name="gender"
                                value="ذكر"
                                checked={selectedGender === 'ذكر'}
                                onChange={handleGenderChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="default-radio-1"
                                className="ms-2 text-xl font-medium"
                            >
                                ذكر
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="default-radio-2"
                                type="radio"
                                name="gender"
                                value="انثى"
                                checked={selectedGender === 'انثى'}
                                onChange={handleGenderChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="default-radio-2"
                                className="ms-2 text-xl font-medium"
                            >
                                انثى
                            </label>
                        </div>
                        {errors.Email && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من اختيار النوع</p>}
                    </div>
                    {/* Address */}
                    <div className="-mx-3 md:flex mb-3">
                        <div className="md:w-1/2 mb-1 px-3 ">
                            <label className={labelStyle} htmlFor="grid-city">
                                المحافظة
                            </label>
                            <input className={inputStyle} id="grid-city" type="text"
                                value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="md:w-1/2 mb-1 px-3">
                            <label className={labelStyle} htmlFor="grid-area">
                                المنطقة
                            </label>
                            <input className={inputStyle} id="grid-area" type="text"
                                value={area} onChange={(e) => setArea(e.target.value)} />
                        </div>
                        <div className="md:w-1/2 mb-2 px-3">
                            <label className={labelStyle} htmlFor="grid-street">
                                الشارع و رقم المنزل
                            </label>
                            <input className={inputStyle} id="grid-street" type="text"
                                value={street} onChange={(e) => setStreet(e.target.value)} />
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="-mx-3 md:flex mb-3">
                        <div className="md:w-full px-3">
                            <label className={labelStyle} htmlFor="grid-PhoneNumber">
                                رقم الهاتف
                            </label>
                            <input className={`${inputStyle} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                id="grid-PhoneNumber" type="number" placeholder="01X XXXX XXXX" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                    </div>
                    {/* Card */}
                    <div className="-mx-3 md:flex mb-3">
                        {/* Front Card */}
                        <div className="md:w-1/2 px-3 mt-1">
                            <label
                                className={labelStyle}
                                htmlFor="file_input_front"
                            >
                                صورة البطاقة الشخصيه من الامام
                            </label>
                            <label htmlFor="file_input_front"
                                className={`${inputStyle} overflow-hidden`} >
                                <span className='bg-gray-300 p-4 -ms-3 mx-4'>اختار صوره</span>
                                {front && front.name}
                            </label>
                            <input
                                className="hidden"
                                id="file_input_front"
                                name="file_input_front"
                                type="file"
                                onChange={handleFrontFileChange}
                            />
                            {errors.NationalIdPicFront && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من اضافة صوره البطاقة</p>}
                        </div>
                        {/* Back Card */}
                        <div className="md:w-1/2 px-3 mt-1">
                            <label
                                className={labelStyle}
                                htmlFor="file_input_back"
                            >
                                صورة البطاقة الشخصيه من الخلف
                            </label>
                            <label htmlFor="file_input_back"
                                className={`${inputStyle} overflow-hidden`} >
                                <span className='bg-gray-300 p-4 -ms-3 mx-4'>اختار صوره</span>
                                {back && back.name}
                            </label>
                            <input
                                className="hidden"
                                id="file_input_back"
                                name='file_input_back'
                                type="file"
                                onChange={handleBackFileChange}
                            />
                            {errors.NationalIdPicBack && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من اضافة صوره لظهر البطاقة</p>}
                        </div>
                    </div>
                    {/* ProfilePic */}
                    <div className="-mx-3 md:flex mb-3">
                        <div className="md:w-full px-3">
                            <label
                                className={labelStyle}
                                htmlFor="file_input"
                            >
                                صوره شخصية
                            </label>
                            <label htmlFor="file_input"
                                className={`${inputStyle} overflow-hidden`} >
                                <span className='bg-gray-300 p-4 -ms-3 mx-4'>اختار صوره</span>
                                {profile && profile.name}
                            </label>
                            <input
                                className="hidden"
                                id="file_input"
                                name="file_input"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div className="-mx-3 md:flex mb-3">
                        <div className="md:w-full px-3">
                            <label className={labelStyle} htmlFor="grid-password">
                                كلمة المرور
                            </label>
                            <input required className={inputStyle} id="grid-password" type="password" placeholder="*******" value={Password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.Password && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من ملء الحقل</p>}
                        </div>
                    </div>
                    {/* Confirm Password */}
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                            <label className={labelStyle} htmlFor="grid-cof-password">
                                نأكيد كلمة المرور
                            </label>
                            <input required className={inputStyle} id="grid-cof-password" type="password" placeholder="*******" value={confPassword} onChange={(e) => confPasswordHadel(e)} />
                            {errors.ConfPass && <p className="text-red-500 text-sm m-1 tracking-wider"> {errors.ConfPass} </p>}
                        </div>
                    </div>
                    <button disabled={isSubmitting}
                        className="flex w-full justify-center rounded-md bg-prime shadow px-3 py-3 text-sm font-semibold leading-6 text-white hover:bg-prime-h focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" type="submit">
                        {
                            !isSubmitting ? "سجل الان" : <i className='pi pi-spin pi-spinner text-lg'></i>
                        }
                    </button>
                    <p className="mt-10 text-center text-xl text-span block sm:hidden">
                        لديك حساب بالفعل؟ {" "}
                        <Link to="/register" className="font-semibold leading-6 text-coral hover:text-lightBlue">
                            تسجيل الدخول
                        </Link>
                    </p>
                </form>
                {/* Sticky Images Component */}
                <div className="bg-white p-8 py-16 pb-14 rounded-lg hidden lg:block md:hidden sm:hidden shadow-md max-w-lg sticky top-20 h-fit">
                    <center>
                        <img src="img/welcome.jpg" width="700" alt="welcome" />
                        <img src="logo.png" width="325" alt="logo" />
                        <p className="text-center text-xl text-span">
                            لديك حساب بالفعل؟ {" "}
                            <Link to="/login" className="font-semibold leading-6 text-coral hover:text-lightBlue">
                                تسجيل الدخول
                            </Link>
                        </p>
                    </center>
                </div>
            </div >
        </div >

    );
};

export default Register;
