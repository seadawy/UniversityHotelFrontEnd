import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function RequestManage() {
    return (
        <>
            <div className="card mt-20">
                <div className="border-2 bg-white border-gray-400 rounded mb-5 p-3 flex flex-row items-center select-none shadow-md">
                    <i className="pi pi-home text-2xl mx-2"></i>
                    <span className="text-xl font-bold text-gray-800">لوحةالتحكم</span>
                    <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                    <span className="text-xl font-bold text-gray-800"> إدارة الطلبات </span>
                </div>
                <Accordion>
                    <AccordionTab header="طلب قيد الانتظار">
                        <p className="m-0">
                        </p>
                    </AccordionTab>
                    <AccordionTab header="طلب مقبول">
                        <p className="m-0">
                        </p>
                    </AccordionTab>
                    <AccordionTab header="استلم الغرفه">
                        <p className="m-0">
                        </p>
                    </AccordionTab>
                    <AccordionTab header="غادر الغرفه">
                        <p className="m-0">
                        </p>
                    </AccordionTab>
                    <AccordionTab header=" طلب مرفوض">
                        <p className="m-0">
                        </p>
                    </AccordionTab>
                </Accordion>
            </div>
        </>
    )
}
