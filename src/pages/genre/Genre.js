import { React, useState, useEffect } from "react";
import "./Genre.css";
import axios from "./../../axios";
import Pagination from "../../components/pagination/Pagination";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import Loading from "../../components/loading/Loading";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LiaWindowClose } from "react-icons/lia";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddForm from "../../components/addForm/AddForm";

export default function Genre() {
  const notify = (e) => toast(e);

  const [isLoading, setIsLoading] = useState(false)
  const [allGenres, setAllGenres] = useState([]);
  const [showAdd, setShowAdd] = useState(false)
  const [showEditBox, setShowEditBox] = useState({ id: '', isShow: false, name: '', slug: '' })
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('')

  const [delBox, setDelBox] = useState({ id: '', isShow: false })

  const [pageCount, setPageCount] = useState()
  let limitItemsPage = 10
  const [totalData, setTotalData] = useState()
  const getGeners = () => {
    setIsLoading(true)
    axios
      .get('/genres', {
        params: {
          page: 1,
          per_page: limitItemsPage,
        }
      })
      .then(response => {
        let data = response.data.data;
        let items = Object.values(data);
        setAllGenres(items)
        let total = response.data.meta.total
        setPageCount(Math.ceil(total / limitItemsPage))
        setTotalData(total)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    getGeners()

  }, []);
  const editGenre = (element) => {
    setIsLoading(true)
    axios
      .put(`genres/${element}`,
        {
          title: showEditBox.name,
          slug: showEditBox.slug,
        }).then(response => {
          console.log(response)
          setShowEditBox({ id: '', isShow: !showEditBox.isShow, name: '', slug: '' })
          setIsLoading(false)
          notify('ویرایش انجام شد.')
          getGeners()
        })
      .catch(error => console.log(error))
  }


  const currentPage = (current) => {
    axios
      .get('/genres', {
        params: {
          page: current + 1,
          per_page: limitItemsPage,
        }
      })
      .then((response) => {
        let data = response.data.data
        let items = Object.values(data);
        setAllGenres(items)
      })
      .catch(error => console.log(error))
  }


  const chageHandlerCurrentPage = (element) => {

    currentPage(element)
  }

  const deleteGenre = (element) => {
    setIsLoading(true)
    setDelBox({ id: '', isShow: false })
    axios
      .delete(`/genres/${element}`)
      .then(response => {
        console.log(response)
        setIsLoading(false)
        notify('ژانر مورد نظر حذف شد.')
        getGeners()
      })
      .catch(error => console.log(error))
  }


  const searchHandler = (element) => {
    element.preventDefault()
    if (searchInputValue) {
      axios
        .get('/genres', {
          params: {
            title: searchInputValue
          }
        })
        .then((response) => {
          let data = response.data.data
          let items = Object.values(data);
          setAllGenres(items)
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
    getGeners();
    setSearchInputValue('')
  }
  const deleteConfirm = () => {
    deleteGenre(delBox.id)
  }
  const deleteCancel = () => {
    setDelBox({ id: '', isShow: false })
  }

  const save = (e) => {
    setIsLoading(true)
    axios
      .post('/genres', {
        title: e[0],
        slug: e[1],
      }).then(response => {
        setIsLoading(false)
        setShowAdd(false)
        notify('ژانر جدید اضافه شد.')
        getGeners()
      })
      .catch(error => {
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


      <div className=" flex text-sm mt-2 mb-16 rounded-sm bg-[#0b6170] text-white py-5 relative">
        <div className=" border-l-2 pl-5 pr-2 flex gap-2 items-center">
          <span>تعداد کل: </span>
          <span className=" font-bold underline ">{totalData}</span>
        </div>
        <div className="  border-l-2 px-5 ">
          <button type="submit" onClick={() => setShowAdd(!showAdd)} className=" flex items-center justify-between gap-4">ایجاد ژانر جدید {showAdd ? <FaMinus /> : <IoMdAdd />}</button>
        </div>
        <div className=" px-5 w-3/12">
          <div className=" flex justify-between items-center border-b border-gray-50">
            <input className=" bg-inherit px-1 outline-none placeholder:text-gray-50" type="text" placeholder="جستجو براساس نام ژانر..." onChange={(e) => { setSearchInputValue(e.target.value) }} />
            <button type="submit" onClick={searchHandler}><IoSearchSharp className=" text-xl" /></button>
          </div>
        </div>
        <div>
          {
            showSearchBox && <button onClick={resetSearch}> لیست ژانر</button>
          }
        </div>
        {
          showAdd && <AddForm sendForm={save} />
        }
      </div>

      <div className="">
        <ToastContainer position="top-center" autoClose={5000} rtl={true} />
      </div>
      {allGenres ? (
        <table className=" text-sm border border-gray-500 mt-5 w-full">
          <thead className=" bg-[#e1f9f9] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-2 py-2 text-right w-2/6">عنوان</th>
              <th className=" px-2 text-right w-2/6">اسلاگ</th>
              <th className=" px-2  w-2/6">حذف/ویرایش</th>
            </tr>
          </thead>
          <tbody>
            {allGenres.map((item) => (
              <tr key={item.id} className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700">

                {showEditBox.isShow && showEditBox.id == item.id ?
                  <>
                    <td className="text-right px-2 py-2">
                      <input type="text" value={showEditBox.name} onChange={(element => setShowEditBox({ ...showEditBox, name: element.target.value }))} className=" border-b border-gray-400 outline-none bg-inherit placeholder:text-gray-700 text-black" />
                    </td>
                    <td className=" px-2 py-2">
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
                        <button onClick={() => editGenre(item.id)}>
                          <IoMdCheckboxOutline className=" text-green-600" />
                        </button>
                      </div>
                    </td>
                  </>

                  : <>
                    <td>{item.title}</td>
                    <td className=" px-2 py-2">{item.slug}</td>
                    <td className=" px-2 py-2 ">
                      <div className=" flex items-center  justify-center gap-5 text-2xl " >
                        <button
                          className=""
                          onClick={() => setDelBox({ id: item.id, isShow: true })}
                        >
                          <MdDeleteForever className=" text-red-600" />
                        </button>
                        <button onClick={() => (setShowEditBox({ id: item.id, isShow: !showEditBox.isShow, name: item.title, slug: item.slug }))}>
                          <BiSolidEdit />
                        </button>
                      </div>
                    </td>
                  </>
                }


              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div><Loading /></div>
      )}
      {pageCount > 1 ? (
        <div className=" border border-gray-700">
          <Pagination
            pageCount={pageCount}
            handlePageClick={(element) => chageHandlerCurrentPage(element)}
          />
        </div>) : (<></>)}
    </div>
  );
}
