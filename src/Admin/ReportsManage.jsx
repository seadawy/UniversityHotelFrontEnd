import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAuthContext } from "../Auth/useAuthContext";

const ReportsManage = () => {
    const { token } = useAuthContext();
    const [Complains, setComplains] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null); // Track expanded row

    const getComp = () => {
        fetch('http://hotelkfs.runasp.net/api/Complaints', {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then((data) => {
            setComplains(data);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getComp();
    }, [token]);

    const hadelSolve = (id) => {
        fetch(`http://hotelkfs.runasp.net/api/Complaints/SolveOrNotSolve/${id}`, {
            method: "put",
            headers: {
                "authorization": `bearer ${token}`
            }
        }).then(res => res.json()).then(data => {
            getComp();
        }).catch(err => console.log(err));
    }

    const columns = [
        {
            name: "بتاريخ",
            selector: (row) => {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const date = new Date(row.date);
                return date.toLocaleDateString('ar-EG', options);
            },
            sortable: true,
            width: '200px',
        },
        { name: "العنوان", selector: row => row.title, sortable: true },
        {
            name: "الأدوات",
            selector: row => (
                <button
                    className={`font-medium rounded text-sm ${row.solved ? "bg-green-600" : "bg-red-600"} text-white py-2 px-3`}
                    onClick={() => hadelSolve(row.id)}
                >
                    {row.solved ? "تم مراجعته" : "تحت المراجعه"}
                </button>
            ),
            width: '150px'
        },
    ];

    const ExpandedComponent = ({ data }) => (
        <div className="p-5 ps-14 shadow-md rounded bg-gray-100">
            <p className="text-xl">{data.description}</p>
        </div>
    );

    const handleRowClick = (row) => {
        setExpandedRow(expandedRow === row.id ? null : row.id);
    };

    return (
        <div className="mt-20 mx-3 rounded-lg">
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
                    pointerOnHover
                    highlightOnHover
                    expandableRowExpanded={row => row.id === expandedRow}
                    onRowClicked={handleRowClick}
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>
        </div>
    );
}

export default ReportsManage;
