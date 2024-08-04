import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../Auth/useAuthContext";
import { useState } from "react";

const SidebarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const { logout } = useAuthContext();
    const linkStyle = `p-5 border-4 border-prime-h flex items-center gap-4 w-60 bg-prime-h text-white rounded text-xl shadow hover:bg-prime`;
    return (
        <div className="relative">
            <button onClick={toggleSidebar} className="fixed flex items-center top-2.5 left-4 sm:hidden px-3 py-2 rounded-full bg-prime hover:bg-prime-h text-white z-50">
                {isOpen ? <i className="pi pi-times"></i> : <i className="pi pi-bars"></i>}
            </button>
            <div className={`fixed sm:sticky sm:top-5 mt-12 -top-3 right-0 h-full sm:h-screen bg-slider shadow-md w-72 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'}`}>
                <div className="sticky top-20 w-full py-8 flex items-center flex-col gap-3">
                    <NavLink to='/profile' className={linkStyle} onClick={toggleSidebar}>
                        <i className="pi pi-id-card text-3xl"></i>
                        الصفحة الشخصيه
                    </NavLink>
                    <NavLink to='/rooms' className={linkStyle} onClick={toggleSidebar}>
                        <i className="pi pi-th-large text-3xl"></i>
                        الغرف المتوفره
                    </NavLink>
                    <NavLink to='/requests' className={linkStyle} onClick={toggleSidebar}>
                        <i className="pi pi-calendar text-3xl"></i>
                        الطلبات
                    </NavLink>
                    <NavLink to='/reports' className={linkStyle} onClick={toggleSidebar}>
                        <i className="pi pi-flag text-3xl"></i>
                        الشكاوى
                    </NavLink>
                    <button onClick={logout} className={`${linkStyle} font-semibold`}>
                        <i className="pi pi-sign-out text-3xl"></i>
                        <span className="text-sm">تسجيل الخروج</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SidebarComponent;