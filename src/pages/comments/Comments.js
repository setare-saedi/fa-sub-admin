import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "./../../axios";
import Pagination from "../../components/pagination/Pagination";
import { IoSearchSharp } from "react-icons/io5";
import { all } from "axios";


export default function Comments() {
  const [allComments, setAllComments] = useState([
    { id: 1, name: 'سارا', msg: 'فیلم خوبی بود', status: 1, postId: 89 },
    { id: 2, name: 'آنا', msg: 'فیلم مسخره ای بود ', status: 1, postId: 9 },
    { id: 3, name: 'مریم', msg: 'جالب', status: 1, postId: 89 },
    { id: 4, name: 'سارا', msg: 'اصلا خوب نبود', status: 0, postId: 45 },
    { id: 5, name: 'ستایش', msg: 'خوب بود', status: 0, postId: 69 },
    { id: 6, name: 'سحر', msg: 'فیلم بدی نبود', status: 0, postId: 89 },
    { id: 7, name: 'ستایش', msg: 'عالی', status: 1, postId: 89 },
    { id: 8, name: 'سحر', msg: 'خیلی خوب', status: 1, postId: 9 },
    { id: 9, name: 'سارا', msg: 'مسخره', status: 0, postId: 89 },
    { id: 10, name: 'ستایش', msg: 'جذاب', status: 1, postId: 189 },
  ]);
  const changeStatus = (e, s) => {
    const index = allComments.findIndex((item) => item.id == e)
    const updateStatus = { ...allComments[index], status: !s }
    const newC = [
      ...allComments.slice(0, index),
      updateStatus,
      ...allComments.slice(index + 1)
    ]
    setAllComments(newC)
  }
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchInputName, setSearchInputName] = useState('')

  const [pageCount, setPageCount] = useState()
  let limitItemsPage = 10
  const [totalData, setTotalData] = useState()



  // useEffect(() => {
  //   getComments()
  // }, []);

  // const getComments = () => {
  //   axios
  //     .get('/', {
  //       params: {
  //         page: 1,
  //         per_page: limitItemsPage,
  //       }
  //     })
  //     .then(response => {
  //       let data = response.data.data;
  //       let items = Object.values(data);
  //       setAllComments(items)
  //       let total = response.data.meta.total
  //       setPageCount(Math.ceil(total / limitItemsPage))
  //       setTotalData(total)
  //     })
  //     .catch(error => console.log(error))
  // }


  // const currentPage = (current) => {
  //   axios
  //     .get('/Comments', {
  //       params: {
  //         page: current + 1,
  //         per_page: limitItemsPage,
  //       }
  //     })
  //     .then((response) => {
  //       let data = response.data.data
  //       let items = Object.values(data);
  //       setAllComments(items)
  //     })
  //     .catch(error => console.log(error))
  // }


  // const chageHandlerCurrentPage = (element) => {

  //   currentPage(element)
  // }

  // const searchHandler = (element) => {
  //   element.preventDefault()
  //   if (searchInputName) {
  //     axios
  //       .get('/comments', {
  //         params: {
  //           name: searchInputName,
  //         }
  //       })
  //       .then((response) => {
  //         let data = response.data.data
  //         let items = Object.values(data);
  //         setAllComments(items)
  //         let total = response.data.meta.total
  //         setPageCount(Math.ceil(total / limitItemsPage))
  //         setTotalData(total)

  //       })
  //       .catch(error => console.log(error))
  //   }
  //   else {
  //     return
  //   }
  // }
  // const resetSearch = () => {
  //   getComments();
  //   setSearchInputName('')
  // }

  return (
    <div>

      <div className=" flex text-sm mt-2 rounded-sm bg-[#0b6170] text-white py-3  ">
        <div className=" border-l-2 pl-5 pr-2 flex gap-2 items-center">
          <span>تعداد کل: </span>
          {/* <span className=" font-bold">{totalData}</span> */}
        </div>
        <div className=" px-5 border-l-2 ">
          <select className=" appearance-none  bg-transparent outline-none border border-[#0b6170] pl-4">
            <option value='0' className=" text-black"> لیست کامنت ها </option>
            <option value='1' className=" text-black">کامنت های فعال</option>
            <option value='2' className="text-black">کامنت های غیر فعال</option>
          </select>
        </div>

        <div className=" px-5 w-4/12">
          <div className=" flex justify-between items-center border-b border-gray-50">
            <input className=" bg-inherit px-1 outline-none pb-0.5" type="text" placeholder="  جستجو براساس نام کاربر...." onChange={(e) => { setSearchInputName(e.target.value) }} />
            <button type="submit" ><IoSearchSharp className=" text-xl" /></button>
            {/* <button type="submit" onClick={searchHandler}><IoSearchSharp className=" text-xl" /></button> */}
          </div>
        </div>
        <div>
          {
            // showSearchBox && <button onClick={resetSearch}> لیست کامنت ها</button>
            showSearchBox && <button > لیست کامنت ها</button>
          }
        </div>
      </div>
      <div>
        {
          allComments.length > 0 ? (<table className="text-center text-sm border border-gray-500 w-full mt-5"  >
            <thead className=" bg-[#e1f9f9] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-2 text-right  py-2" >نام کاربر</th>
                <th className=" px-2 ">متن کامنت </th>
                <th className=" px-2 ">عدم تایید/تایید</th>
              </tr>
            </thead>
            <tbody>
              {allComments.map((item) => (
                <tr key={item.id} className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700">
                  <td className="text-right px-2 py-2">{item.name}</td>
                  <td className=" px-2 py-2">{item.msg}</td>
                  <td>
                    <label className=" inline-flex  cursor-pointer relative  ">
                      <input type="checkbox"
                        checked={item.status}
                        onChange={() => changeStatus(item.id, item.status)}
                        className="sr-only" />
                      <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-5 w-9 rounded-full"></div>
                    </label>

                  </td>


                </tr>
              ))}
            </tbody>
          </table>) : (<div>کامنت یافت نشد.</div>)
        }
        {pageCount > 1 ? (
          <div className=" border border-gray-700">
            {/* <Pagination
              pageCount={pageCount}
              handlePageClick={(element) => chageHandlerCurrentPage(element)}
            /> */}
          </div>
        ) : (<></>)}
      </div>
    </div >
  );
}
