import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../Auth/useAuthContext";
const NavbarComponent = () => {
    const linkStyle = `px-2 sm:px-4 py-2 sm:text-lg hover:bg-prime-h hover:text-white active:bg-cyan-100 font-medium rounded`
    const { user } = useAuthContext();
    return (
        <>
            <nav className="sm:p-5 px-3  py-3 shadow-md fixed w-full z-20 top-0 bg-slate-50 flex flex-row items-center justify-between">
                <div className="flex items-center">
                    <img src="logo.png" className="sm:w-16 w-12" alt="logo" />
                    <h2 className="me-5 sm:text-3xl font-bold ms-5 ">فندق الجامعة</h2>
                </div>
                {!user && (
                    <div className="flex gap-2">
                        <NavLink to="/register" className={`${linkStyle}`} >
                            <i className="pi pi-user-plus me-3"></i>
                            مستخدم جديد
                        </NavLink>
                        <NavLink to="/" className={`${linkStyle}`} >
                            <i className="pi pi-user me-3"></i>
                            تسجيل الدخول
                        </NavLink>
                    </div>
                )}
            </nav>
        </>
    );
}

export default NavbarComponent;