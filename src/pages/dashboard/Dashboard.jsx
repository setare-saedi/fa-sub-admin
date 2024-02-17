import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Calender from "../../components/calender/Calender";
import Analytics from "../../components/charts/areaChart/Analytics";
import CircleChart from "../../components/charts/circleChart/CircleChart";
import Table from "../../components/table/table";
import Counter from "../../components/counter/Counter";


export default function Dashboard() {
    const posts = [
        { id: 1, text: 'لورم ایپسوم جدید 1', date: '22/11/1042' },
        { id: 2, text: 'لورم ایپسوم جدید 2', date: '12/10/1042' },
        { id: 3, text: 'لورم ایپسوم جدید 3', date: '22/10/1042' },
        { id: 4, text: 'لورم ایپسوم جدید 4', date: '15/12/1042' },
        { id: 5, text: 'لورم ایپسوم جدید 5', date: '17/12/1042' },
        { id: 6, text: 'لورم ایپسوم جدید 6', date: '16/11/1042' },
        { id: 7, text: 'لورم ایپسوم جدید 7', date: '19/12/1042' },
        { id: 8, text: 'لورم ایپسوم جدید 8', date: '18/12/1042' },
        { id: 9, text: 'لورم ایپسوم جدید 9', date: '16/10/1042' },
    ]
    const postTitle = [
        { id: 1, title: 'متن پست' },
        { id: 2, title: 'تاریخ انتشار' }
    ]

    const comments=[
        {id:1, text:'متن ساختگی لورم ایپسوم 1', date: '24/8/1402'},
        {id:2, text:'متن ساختگی لورم ایپسوم 2', date: '14/10/1402'},
        {id:3, text:'متن ساختگی لورم ایپسوم 3', date: '12/11/1402'},
        {id:4, text:'متن ساختگی لورم ایپسوم 4', date: '13/12/1402'},
        {id:5, text:'متن ساختگی لورم ایپسوم 5', date: '28/10/1402'},
        {id:6, text:'متن ساختگی لورم ایپسوم 6', date: '29/9/1402'},
        {id:7, text:'متن ساختگی لورم ایپسوم 7', date: '30/10/1402'},
    ]
    const commentTitle=[
        {id:1, title:'متن نظر'},
        {id:2, title:'تاریخ ارسال'},
    ]

    return (
        <div className=" grid grid-cols-12 gap-4">
            {/* sidebar */}
            <div className=" col-span-2 ">
                <Sidebar />
            </div>
            {/* content */}
            <div className=" col-span-10  mt-3">
                {/* row1 */}
                <div className=" grid grid-cols-9 gap-3 mb-4 ml-4">
                    <div className=" col-span-3 border border-gray-300 bg-gray-50">
                        <CircleChart />
                        <div className=" text-center text-sm">
                            دسته بندی پست ها
                        </div>
                    </div>
                    {/* table */}
                    <div className=" col-span-4  ">
                        <Table data={posts} titles={postTitle} caption='آخرین پست ها'/>
                    </div>
                    <div className=" col-span-2 ">
                        <Calender />
                        <div className=" flex justify-between items-center px-2 pt-6 pb-2 border-b-2 border-[#0b6170]">
                            <p>
                                پست های امروز:
                            </p>
                            <p className=" text-[#0b6170] font-bold text-xl">  123</p>
                        </div>
                    </div>
                </div>
                {/* row2 */}
                <div className=" grid grid-cols-10 gap-3 ml-4" >

                    <div className=" col-span-4">
                        <div className=" flex gap-2 mb-2">
                            <div className=" w-1/3 text-center p-2">
                                <p className="">پست ها</p>
                                <p className=" font-bold text-2xl text-[#0b6170] border-b-2 border-[#0b6170]">
                                    <Counter count={48} />
                                </p>
                            </div>
                            <div className=" w-1/3 text-center p-2">
                                <p className="">
                                    نظرات
                                 </p>
                                <p className=" font-bold text-2xl text-[#0b6170] border-b-2 border-[#0b6170]">
                                <Counter count={58} />
                                </p>
                            </div>
                            <div className=" w-1/3 text-center p-2">
                                <p className=""> کاربران</p>
                                <p className=" font-bold text-2xl text-[#0b6170] border-b-2 border-[#0b6170]">
                                <Counter count={8} />
                                </p>
                            </div>
                        </div>
                        <div className=" border border-gray-300 p-1">
                           <Table data={comments} titles={commentTitle} caption='نظرات جدید'/>
                        </div>
                    </div>

                    <div className=" col-span-6 bg-gray-50 border border-gray-300 p-2">
                        <Analytics />
                    </div>

                </div>

            </div>

        </div >
    )
}