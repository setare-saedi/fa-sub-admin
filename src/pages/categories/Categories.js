import React, { useEffect, useState } from "react";
import "./Categories.css";
import axios from "./../../axios";
import Pagination from "../../components/pagination/Pagination";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LiaWindowClose } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/loading/Loading";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import AddForm from "../../components/addForm/AddForm";

export default function Categories() {
  const notify = (e) => toast(e);
  const [isLoading, setIsLoading] = useState(false)

  const [allCategories, setAllCategories] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchInputName, setSearchInputName] = useState('')
  const [searchInputLatinName, setSearchInputLatinName] = useState('')
  const [searchInputStatus, setSearchInputStatus] = useState('')
  const [showEditBox, setShowEditBox] = useState({ id: '', isShow: false, name: '', slug: '' })
  const [showAdd, setShowAdd] = useState(false)
  const [delBox, setDelBox] = useState({ id: '', isShow: false })

  const [pageCount, setPageCount] = useState()
  let limitItemsPage = 10
  const [totalData, setTotalData] = useState()

  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = () => {
    setIsLoading(true)
    axios
      .get('/categories', {
        params: {
          page: 1,
          per_page: limitItemsPage,
        }
      })
      .then(response => {
        let data = response.data.data;
        let items = Object.values(data);
        setAllCategories(items)
        let total = response.data.meta.total
        setPageCount(Math.ceil(total / limitItemsPage))
        setTotalData(total)
        setIsLoading(false)
      })
      .catch(error => console.log(error))

  }


  const currentPage = (current) => {
    axios
      .get('/categories', {
        params: {
          page: current + 1,
          per_page: limitItemsPage,
        }
      })
      .then((response) => {
        let data = response.data.data
        let items = Object.values(data);
        setAllCategories(items)
      })
      .catch(error => console.log(error))
  }


  const chageHandlerCurrentPage = (element) => {

    currentPage(element)
  }


  const deleteCategory = (element) => {
    setIsLoading(true)
    setDelBox({ id: '', isShow: false })

    console.log(element);
    axios
      .delete(`/categories/${element}`)
      .then(response => {
        console.log(response)
        setIsLoading(false)
        notify('دسته مورد نظر حذف شد.')
        getCategories()
      })
      .catch(error => console.log(error))
  }
  const deleteConfirm = () => {
    deleteCategory(delBox.id)
  }
  const deleteCancel = () => {
    setDelBox({ id: '', isShow: false })
  }
  const searchHandler = (element) => {
    element.preventDefault()
    if (searchInputName || searchInputLatinName || searchInputStatus) {
      axios
        .get('/categories', {
          params: {
            name: searchInputName,
            name_en: searchInputLatinName,
            status: searchInputStatus
          }
        })
        .then((response) => {
          let data = response.data.data
          let items = Object.values(data);
          setAllCategories(items)
          let total = response.data.meta.total
          setPageCount(Math.ceil(total / limitItemsPage))
          setTotalData(total)

        })
        .catch(error => console.log(error))
    }
    else {
      return
    }
  }
  const resetSearch = () => {
    getCategories();
    setSearchInputName('')
    setSearchInputLatinName('')
    setSearchInputStatus('')
  }
  const editCategory = (e) => {
    console.log(e);
    setIsLoading(true)

    axios
      .put(`/categories/${e}`, {
        name: showEditBox.name,
        name_en: showEditBox.slug,
        status: 1,

      }).then(response => {
        console.log(response);
        getCategories()
        setShowEditBox({ id: '', isShow: false, name: '', slug: '' })
        setIsLoading(false)
        getCategories()
        notify('ویرایش انجام شد.')
      })
      .catch(error => console.log(error))
  }
  const save = (e) => {
    console.log(e);
    setIsLoading(true)

    axios
      .post('/categories', {
        name: e[0],
        name_en: e[1],
        status: 1,
      }).then(response => {
        console.log(response)
        setIsLoading(false)
        setShowAdd(false)
        notify('دسته جدید اضافه شد.')
        getCategories()
      })
      .catch(error => {
        console.log(error)
        notify('خطا در انجام عملیات')
        setShowAdd(false)
      })
  }
  return (
    <div className=" ">
      {
        delBox.isShow && <DeleteModal cancel={deleteCancel} confirm={deleteConfirm} />
      }
      {
        isLoading && <Loading />
      }
      <div className=" flex text-sm mt-2  mb-16 rounded-sm bg-[#0b6170] text-white py-5 relative  ">
        <div className=" border-l-2 pl-5 pr-2 flex gap-2 items-center">
          <span>تعداد کل: </span>
          <span className=" font-bold">{totalData}</span>
        </div>
        <div className=" px-5  ">
          <button type="submit" onClick={() => setShowAdd(!showAdd)} className=" flex items-center justify-between gap-4">ایجاد دسته جدید {showAdd ? <FaMinus /> : <IoMdAdd />}</button>
        </div>
        {
          showAdd && <AddForm sendForm={save} />
        }
      </div>

      <div>
        <div className="">
          <ToastContainer position="top-center" autoClose={5000} rtl={true} />
        </div>

        {
          allCategories.length > 0 ? (<table className="text-center text-sm border border-gray-500 w-full mt-5"  >
            <thead className=" bg-[#e1f9f9] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-2  py-2 text-right" >نام</th>
                <th className=" px-2 text-right">نام لاتین</th>
                <th className=" px-2 ">حذف/ویرایش</th>
              </tr>
            </thead>
            <tbody>

              {allCategories.map((cat) => (
                <tr key={cat.id} className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700">
                  {showEditBox.isShow && showEditBox.id == cat.id ?
                    <>
                      <td className="text-right px-2 py-2">
                        <input type="text" value={showEditBox.name} onChange={(element => setShowEditBox({ ...showEditBox, name: element.target.value }))} className=" border-b border-gray-400 outline-none bg-inherit placeholder:text-gray-700 text-black" />
                      </td>
                      <td className="text-right px-2 py-2">
                        <input type="text" value={showEditBox.slug} onChange={(element => setShowEditBox({ ...showEditBox, slug: element.target.value }))} className=" border-b border-gray-400 outline-none bg-inherit placeholder:text-gray-700 text-black" />
                      </td>
                      <td className=" px-2 py-2 ">
                        <div className=" flex items-center  justify-center gap-5 text-2xl " >
                          <button
                            className=""
                            onClick={() => (setShowEditBox({ id: '', isShow: !showEditBox.isShow, name: '', slug: '' }))}
                          >
                            <LiaWindowClose className=" text-red-600" />
                          </button>
                          <button onClick={() => editCategory(cat.id)}>
                            <IoMdCheckboxOutline className=" text-green-600" />
                          </button>
                        </div>
                      </td>
                    </>

                    : <>
                      <td className="text-right px-2">{cat.name}</td>
                      <td className="text-right px-2 py-2">{cat.name_en}</td>
                      <td className=" px-2 py-2 ">
                        <div className=" flex items-center  justify-center gap-5 text-2xl " >
                          <button
                            className=""
                            onClick={() => setDelBox({ id: cat.id, isShow: true })}
                          >
                            <MdDeleteForever className=" text-red-600" />
                          </button>
                          <button onClick={() => (setShowEditBox({ id: cat.id, isShow: !showEditBox.isShow, name: cat.name, slug: cat.name_en }))}>
                            <BiSolidEdit />
                          </button>
                        </div>
                      </td>
                    </>
                  }
                </tr>
              ))}
            </tbody>
          </table>) : (<div><Loading /></div>)
        }
        {pageCount > 1 ? (
          <div className=" border border-gray-700">
            <Pagination
              pageCount={pageCount}
              handlePageClick={(element) => chageHandlerCurrentPage(element)}
            />
          </div>
        ) : (<></>)}
      </div>
    </div >
  );
}
