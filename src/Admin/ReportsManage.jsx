import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAuthContext } from "../Auth/useAuthContext";
import DialogComponent from "./Component/DialogComponent";

const ReportsManage = () => {
    const { token } = useAuthContext();
    const [Complains, setComplains] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCompId, setSelectedCompId] = useState(null);

    useEffect(() => {
        fetch('/api/Complaints', {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then((data) => {
            setComplains(data);
        }).catch(err => console.log(err));
    }, [token]);

    const columns = [
        {
            name: "بتاريخ", selector: (row) => {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const date = new Date(row.date);
                return date.toLocaleDateString('ar-EG', options);
            }, sortable: true,
            width: '200px',
        },
        { name: "العنوان", selector: row => row.title, sortable: true },
        {
            name: "الأدوات",
            selector: row => (
                <button className="font-medium rounded text-sm bg-red-600 text-white py-2 px-3" onClick={(e) => openDelDialog(e, row.id)}>
                    حذف
                </button>
            ),
            width: '100px'
        },
    ];

    const openDelDialog = (e, id) => {
        setSelectedCompId(id);
        setOpen(true);
    }

    const tragerDel = () => {
        fetch(`/api/Complaints/${selectedCompId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.text();
        }).then(() => {
            setComplains(prevComplains => prevComplains.filter(complain => complain.id !== selectedCompId));
            console.log("Complaint deleted");
        }).catch(err => {
            console.error("Failed to delete complaint:", err);
        });
        setOpen(false);
    }

    const ExpandedComponent = ({ data }) => (
        <div className="p-5 ps-14 shadow-md rounded bg-gray-100">
            <p className="text-xl">{data.description}</p>
        </div>
    );

    return (
        <div className="mt-20 mx-3 rounded-lg">
            <DialogComponent state={open} onCancel={() => setOpen(false)} onDel={tragerDel} />
            <div className="border-2 bg-white border-gray-400 rounded p-3 flex flex-row items-center select-none shadow-md">
                <i className="pi pi-home text-2xl mx-2"></i>
                <span className="text-xl font-bold text-gray-800">لوحةالتحكم</span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800"> إدارة الشكاوى </span>
            </div>
            <div className="mt-5">
                <DataTable
                    className="shadow-md"
                    columns={columns}
                    data={Complains}
                    pagination
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>
        </div>
    );
}

export default ReportsManage;
