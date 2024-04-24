
export default function DeleteModal({cancel, confirm}) {

    return (
        <div className="  absolute top-0 z-50 right-0 w-full h-screen bg-opacity-70 bg-gray-900">
            <div className="text-center bg-gray-50 py-12 w-max mx-auto px-20 absolute top-[30%] right-[35%]">
                <div className=" mb-6">
                    آیا از حذف این مورد مطمئن هستید؟
                </div>
                <div className=" flex  justify-center gap-12">
                    <div>
                        <button className=" bg-gray-300 px-10 py-1" onClick={cancel}>
                            کنسل
                        </button>
                    </div>
                    <div>
                        <button className=" bg-red-400 px-10 py-1" onClick={confirm}>
                            حذف
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}