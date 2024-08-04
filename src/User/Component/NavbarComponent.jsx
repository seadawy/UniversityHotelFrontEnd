import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../Auth/useAuthContext";
const NavbarComponent = () => {
    const linkStyle = `px-4 py-2 text-lg hover:bg-prime-h hover:text-white active:bg-cyan-100 font-medium rounded`
    const { user } = useAuthContext();
    return (
        <>
            <nav className="p-5 py-3 shadow-md fixed w-full z-20 top-0 bg-slate-50 flex flex-row items-center justify-between">
                <div className="flex items-center">
                    <h2 className="me-5 text-xl font-bold" style={{ textShadow: "#ccc 1px 1px 1px" }}>نظام الحجوزات اللالكترونى لفندق الجامعة</h2>
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