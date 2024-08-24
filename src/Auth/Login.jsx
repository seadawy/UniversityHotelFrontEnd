import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export default function Login() {
    const { login } = useAuthContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setError] = useState();
    const [loading, setLoading] = useState(false);

    const submitFormHandeling = (e) => {
        setLoading(true);
        e.preventDefault();
        let loginDataForm = {
            'email': email, 'password': password
        }

        fetch('/api/HotelAuth/gettoken', {
            method: 'POST',
            body: JSON.stringify(loginDataForm),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res => res.json())).then((data) => {
            if (data.isAuthenticated) {
                localStorage.setItem('token', data.token);
                login(data.token);
            } else {
                setError(data.errors.pubErr);
            }
            setLoading(false);
        }).catch(err => console.log(err));
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8 bg-gray-50">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Logo"
                        src="img/loginAvatar.webp" width="320"
                        className="mx-auto"
                    />
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        سجل الدخول الى حسابك
                    </h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm py-5">
                    {err && <p className="bg-red-200 border-4 text-lg p-2 px-3 mb-5 text-red-950 border-red-700">بيانات التسجيل خاطئه ,حاول مجددا</p>}
                    <form onSubmit={(e) => submitFormHandeling(e)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-lg font-bold leading-6 text-gray-900">
                                البريد الالكترونى
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-lg font-bold leading-6 text-gray-900">
                                    كلمة المرور
                                </label>
                             {/*    <div className="text-sm">
                                    <a href="#" className="font-semibold text-base text-gray-500 text-charcoal hover:text-prime-lh">
                                        نسية كلمة المرور ؟
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-navy sm:text-lg sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="flex w-full justify-center rounded-md bg-prime shadow px-3
                                py-3 text-sm font-semibold leading-6 text-white hover:bg-prime-h 
                                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                type="submit"
                            >
                                {
                                    !loading ? "تسجيل الدخول" : <i className='pi pi-spin pi-spinner text-lg'></i>
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-xl text-span">
                        ليس لديك حساب ؟ {" "}
                        <Link to="/register" className="font-semibold leading-6 text-yellow-500 hover:text-indigo-300">
                            سجل الان
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
