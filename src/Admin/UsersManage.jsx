import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Auth/useAuthContext";

const UsersManage = () => {
    const { token } = useAuthContext();
    const [Users, setUsers] = useState([]);
    const [UsersFilter, setUsersFilter] = useState([]);

    useEffect(() => {
        fetch('http://hotelkfs.runasp.net/api/HotelAuth/allUsers', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then((data) => {
            setUsers(data);
            setUsersFilter(data);
        }).catch(err => console.log(err));
    }, []);

    const columns = [
        { name: "الاسم", selector: row => row.fullName, sortable: true, width: "280px" },
        {
            name: "الرقم قومى",
            selector: row => row.nationalId,
        },
        { name: "البريد الالكترونى", selector: row => row.email, sortable: true, width: "300px" },
        { name: "الهاتف", selector: row => row.phoneNumber ? row.phoneNumber : "لا يوجد", sortable: true },
        {
            name: "الأدوات",
            selector: row => (
                <div className="flex gap-3 justify-center items-center">
                    <Link className="rounded bg-blue-600 text-lg text-white py-1 px-4 flex gap-3 items-center" to={`/Users/View/${row.userName}`}>
                        <i className="pi pi-eye"></i>
                        مراجعة البيانات
                    </Link>

                </div>
            ),
        },
    ];

    const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const newData = Users.filter(row =>
            row.fullName.toLowerCase().includes(searchTerm) ||
            row.nationalId.toLowerCase().includes(searchTerm) ||
            row.region.toLowerCase().includes(searchTerm) ||
            row.email.toLowerCase().includes(searchTerm) ||
            (row.phoneNumber ? row.phoneNumber.toLowerCase().includes(searchTerm) : false)
        );
        setUsersFilter(newData);
    }

    return (
        <div className="mt-20 mx-3 rounded-lg">
            <div className="border-2 bg-white border-gray-400 rounded p-3 flex flex-row items-center select-none shadow-md">
                <i className="pi pi-home text-2xl mx-2"></i>
                <span className="text-xl font-bold text-gray-800">لوحةالتحكم</span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800"> إدارة المستخدمين </span>
            </div>
            <div className="mt-5">
                <input className="border p-2 outline-none float-end mb-2 shadow focus:ring-prime-lh focus:ring-2 rounded" type="text" name="search" placeholder="بحث ..." onChange={handleFilter} />
                <DataTable
                    className="shadow-md"
                    columns={columns}
                    data={UsersFilter}
                    pagination
                />
            </div>
        </div>
    );
}

export default UsersManage;
