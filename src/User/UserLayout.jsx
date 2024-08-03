import NavbarComponent from "./Component/NavbarComponent";
import { Outlet } from 'react-router-dom';
import { useAuthContext } from "../Auth/useAuthContext";
import SidebarComponent from "./Component/SidebarComponent";
const UserLayout = () => {
    const { user } = useAuthContext();
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <NavbarComponent />
            </header>

            <div className="flex flex-1 w-full">
                {user && (<SidebarComponent />)}
                <main className={`flex-1 ${user ? '' : 'mt-16'}`}>
                    <Outlet />
                </main>
            </div>
        </div>

    );
}

export default UserLayout;