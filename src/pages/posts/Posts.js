import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";
import axios from "./../../axios";
import Pagination from "./../../components/pagination/Pagination";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { GrPowerCycle } from "react-icons/gr";
import Loading from "../../components/loading/Loading";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Posts() {
  const notify = (e) => toast(e);

  const [delBox, setDelBox] = useState({ id: '', isShow: false })

  const [isLoading, setIsLoading] = useState(false)
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchInputTitle, setSearchInputTitle] = useState('')
  const [searchInputImdb, setSearchInputImdb] = useState('')
  const [searchInputCategory, setSearchInputCategory] = useState('')
  const [pageCount, setPageCount] = useState()
  let limitItemsPage = 10
  const [totalData, setTotalData] = useState()
  useEffect(() => {
    getAllPosts();
    getCategory()
  }, []);

  const getCategory = () => {
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

      })
      .catch(error => console.log(error))

  }
  function getAllPosts() {
    setIsLoading(true)
    axios
      .get("/posts", {
        params: {
          page: 1,
          per_page: limitItemsPage,
        }
      })
      .then((response) => {
        let data = response.data.data;
        let items = Object.values(data);
        setAllPosts(items);
        let total = response.data.meta.total
        setPageCount(Math.ceil(total / limitItemsPage))
        setTotalData(total)
        setIsLoading(false)
      })
      .catch((error) => console.error(error));
  }

  const currentPage = (current) => {
    axios
      .get('/posts', {
        params: {
          page: current + 1,
          per_page: limitItemsPage,
        }
      })
      .then((response) => {
        let data = response.data.data
        let items = Object.values(data);
        setAllPosts(items)
      })
      .catch(error => console.log(error))
  }

  const chageHandlerCurrentPage = (element) => {

    currentPage(element)
  }

  const deletePost = (e) => {
    setIsLoading(true)
    setDelBox({ id: '', isShow: false })
    axios
      .delete(`/posts/${e}`)
      .then((response) => {
        console.log(response);
        setIsLoading(false)
        notify('پست مورد نظر حذف شد.')
      })
      .catch((error) => {
        console.log(error.response);
      });
    getAllPosts();
  };
  const deleteConfirm = () => {
    deletePost(delBox.id)
  }
  const deleteCancel = () => {
    setDelBox({ id: '', isShow: false })
  }
  const restorePost = (e) => {
    console.log(e);
    setIsLoading(true)
    axios
      .post(`/posts/restore/${e}`)
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        notify("پست مورد نظر بازگردانی شد.");
      })
      .catch((error) => {
        console.log(error.response);
      })
    getAllPosts()
  }

  const searchHandler = (element) => {
    element.preventDefault()
    console.log(searchInputCategory, 'cate');
    if (searchInputTitle || searchInputImdb || searchInputCategory) {
      axios
        .get('/posts', {
          params: {
            title: searchInputTitle,
            imdb: searchInputImdb,
            categories: searchInputCategory
          }
        })
        .then((response) => {
          let data = response.data.data
          let items = Object.values(data);
          setAllPosts(items)
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
    getAllPosts();
    setSearchInputTitle('')
    setSearchInputImdb('')
    setSearchInputCategory('')
    setShowSearchBox(false)
  }

  const changeStatus = (e, s, t) => {
    setIsLoading(true)
    axios
      .put(`/posts/${e}`, {
        title: t,
        slug: '',
        status: s,
      })
      .then(function (response) {
        console.log(response);
        setIsLoading(false)
        notify("اطلاعات با موفقیت ثبت شد.");

      })
      .catch(function (error) {
        let err = error.response.data.errors;
        Object.values(err).map((value) => {
          notify(value[0]);
          setIsLoading(false)

        });
        console.log(error.response);
      })
    getAllPosts()
  }
  return (
    <div className=" ">
      {
        delBox.isShow && <DeleteModal cancel={deleteCancel} confirm={deleteConfirm} />
      }
      {
        isLoading && <Loading />
      }
      <div className=" flex text-sm mt-2 rounded-sm bg-[#0b6170] text-white py-3  ">
        <div className=" border-l border-gray-50 px-4">
          تعداد پست ها:
          <span className=" pr-2 font-bold">
            {totalData}
          </span>
        </div>
        <div className=" border-l border-gray-50 px-4">
          حذف شده ها
        </div>
        {
          !showSearchBox ?
            <div className=" px-4">
              <button className="" onClick={() => {
                setShowSearchBox(true)
              }}>جستجو</button>
            </div>
            :
            <div className=" px-4">
              <button className="" onClick={resetSearch}>لیست پست ها</button>
            </div>
        }

      </div>

      {
        showSearchBox && <form>
          <div className="bg-[#0b6170] py-3 flex items-center gap-4 px-4 mb-5 text-sm">
            <div className=" flex justify-between  w-2/6">
              <input value={searchInputTitle} onChange={(e) => { setSearchInputTitle(e.target.value) }} className="  outline-none w-full p-1.5 rounded-sm " type="text" placeholder="عنوان پست ..." />
            </div>
            <div className=" flex justify-between w-2/6 ">
              <input value={searchInputImdb} onChange={(e) => { setSearchInputImdb(e.target.value) }} className=" outline-none w-full p-1.5 rounded-sm " type="text" placeholder=" شناسه IMDB" />
            </div>
            <div className=" w-1/6">
              <select className="w-full outline-none p-1.5 rounded-sm" onChange={(e) => { setSearchInputCategory(e.target.value) }}>
                {
                  allCategories.map(cat => <option value={cat.id}>{cat.name}</option>)
                }
              </select>
            </div>
            <div className=" w-1/6">
              <button onClick={searchHandler} className="w-full bg-white py-2 px-10 font-bold rounded-sm ">
                جستجو
              </button>
            </div>
          </div>
        </form>
      }

      <div className="">
        <ToastContainer position="top-center" autoClose={10000} rtl={true} />
      </div>
      {allPosts ?
        <table className="text-center text-sm border border-gray-500 w-full mt-5">
          <thead className=" bg-[#e1f9f9] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-2  py-2" >#</th>
              <th className=" px-2 ">عنوان</th>
              <th className=" px-2 ">شناسه IMDB</th>
              <th className=" px-2">نویسنده</th>
              <th className=" px-2  ">وضعیت</th>
              <th className=" px-2 ">تاریخ انتشار</th>
              <th className=" px-2">حذف/ویرایش</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.map((item, index) => (
              <tr key={item.id} className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700">
                <td className=" px-2 py-2">{index + 1}</td>
                <td className="text-right px-2 py-2"> {item.title}  </td>
                <td className=" px-2 py-2">{item.imdb}</td>
                <td className="px-2 py-2">{item.user.name}</td>
                <td className=" px-2 pt-2">
                  <label className=" inline-flex  cursor-pointer relative  ">
                    <input type="checkbox"
                      checked={item.status}
                      onChange={() => changeStatus(item.id, !item.status, item.title)}
                      className="sr-only" />
                    <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-5 w-9 rounded-full"></div>
                  </label>
                </td>
                <td className="px-2  py-2">{item.published_at}</td>
                <td className=" px-2 py-2 ">
                  <div className=" flex items-center  justify-center gap-5 text-2xl " >
                    {item.deleted_at ?
                      (
                        <button className="btn-icon"
                          onClick={() => restorePost(item.id)}
                        >
                          <GrPowerCycle />
                        </button>
                      ) : (
                        <button onClick={() => setDelBox({ id: item.id, isShow: true })}>
                          <MdDeleteForever className=" text-red-600" />
                        </button>

                      )}
                    <Link to={`/edit-post/${item.id}`}><BiSolidEdit /></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        :
        <Loading />
      }
      {pageCount > 1 &&
        <div className=" border border-gray-700">
          <Pagination
            pageCount={pageCount}
            handlePageClick={(element) => chageHandlerCurrentPage(element)}
          />
        </div>
      }
    </div>
  );
}
