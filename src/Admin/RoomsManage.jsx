import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";
import DialogComponent from "./Component/DialogComponent";
import { useAuthContext } from "../Auth/useAuthContext";

const RoomsManage = () => {
    const { token, user } = useAuthContext();
    const [rooms, setRooms] = useState([]);
    const [roomsFilter, setRoomsFilter] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    useEffect(() => {
        fetch('/api/Rooms')
            .then(res => res.json())
            .then((data) => {
                setRooms(data);
                setRoomsFilter(data);
            })
            .catch(err => console.log(err));
    }, []);

    const columns = [
        { name: "رقم الغرفة", selector: row => row.roomNumber, sortable: true, width: "150px" },
        {
            name: "الحالة",
            selector: row => row.isCheckedIn ? <Tag severity="danger" className='min-w-24 rounded-xl' value="محجوزه" /> : <Tag severity="info" className='min-w-24 rounded-xl' value="متاحه" />,
            sortable: true,
            width: "150px"
        },
        { name: "السعر", selector: row => row.guestPrice, sortable: true, width: "180px" },
        { name: "السعر للموظف", selector: row => row.stuffPrice, sortable: true },
        { name: "المنطقة", selector: row => row.regionName, sortable: true },
        {
            name: "الأدوات",
            selector: row => (
                <div className="flex gap-3 justify-center items-center">
                    {user.role != "Receptionist" ?
                        <>
                            <Link className="rounded bg-prime text-white text-lg py-1 px-3 flex gap-3 items-center" to={`/RoomsManage/Edit/${row.id}`}>
                                <i className="pi pi-pen-to-square"></i>
                                تعديل الغرفة
                            </Link>
                            <button className="font-medium rounded text-sm bg-red-600 text-white py-2 px-3" onClick={() => openDelDialog(row.id)}>
                                حذف
                            </button>
                        </> : <p className="text-gray-400 text-lg">ليس لديك صلحيات</p>
                    }
                </div >
            ),
        },
    ];

    const handleFilter = (e) => {
        const newData = rooms.filter(row => row.roomNumber.toLowerCase().includes(e.target.value.toLowerCase()));
        setRoomsFilter(newData);
    }

    const openDelDialog = (id) => {
        setSelectedRoomId(id);
        setOpen(true);
    }

    const triggerDel = () => {
        fetch(`/api/Rooms/DeleteRoom/${selectedRoomId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 204) {
                const newData = rooms.filter(row => row.id !== selectedRoomId);
                setRoomsFilter(newData);
                setRooms(newData);
            } else {
                return res.json();
            }
        }).then(data => {
            if (data) {
                console.log(data);
            }
        }).catch(err => console.log(err));
        setOpen(false);
    }

    return (
        <div className="mt-20 mx-3 rounded-lg">
            <DialogComponent state={open} onCancel={() => setOpen(false)} onDel={triggerDel} />
            <div className="border-2 bg-white border-gray-400 rounded p-3 flex flex-row items-center select-none shadow-md">
                <i className="pi pi-home text-2xl mx-2"></i>
                <span className="text-xl font-bold text-gray-800">لوحةالتحكم</span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800"> إدارة الغرف </span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800"> عرض الغرف </span>
            </div>
            <div className="mt-5">
                <input className="border p-2 outline-none float-end mb-2 shadow focus:ring-prime-lh focus:ring-2 rounded" type="text" name="search" placeholder="بحث ..." onChange={handleFilter} />
                <DataTable
                    className="shadow-md rounded-lg"
                    columns={columns}
                    data={roomsFilter}
                    pagination
                />
            </div>
        </div>
    );
}

export default RoomsManage;
