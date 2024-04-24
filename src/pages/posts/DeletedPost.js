import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";
import axios from "./../../axios";
import { HiOutlineTrash } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { GrPowerCycle } from "react-icons/gr";
import Pagination from "../../components/pagination/Pagination";
import { BallTriangle } from 'react-loader-spinner'


export default function DeletedPost() {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

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
          deleted_at:true
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
    setShowModal(true)

    axios
      .get("/posts", {
        params: {
          page: 1,
          per_page: limitItemsPage,
          deleted_at:true
        }
      })
      .then((response) => {
        let data = response.data.data;
        let items = Object.values(data);
        setAllPosts(items);
        setShowModal(false)
        let total = response.data.meta.total
        setPageCount(Math.ceil(total / limitItemsPage))
        setTotalData(total)
      })
      .catch((error) => console.error(error));
  }

  const currentPage = (current) => {
    axios
      .get('/posts', {
        params: {
          page: current + 1,
          per_page: limitItemsPage,
          deleted_at:true
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

  const restorePost = (e) => {
    console.log(e);

    setShowModal(true)
    axios
      .post(`/posts/restore/${e}`)
      .then((response) => {
        console.log(response)

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
            categories: searchInputCategory,
            deleted_at:true,
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
  }


  return (
    <div>
      {/* <Modal

        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#fff"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </Modal.Body>

      </Modal> */}
      <div className="posts-operator">
        <div>
          
          <button className="btn1 btn-search" onClick={() => {
            setShowSearchBox(!showSearchBox)
            console.log(showSearchBox, ' show searchBox');
          }}>جستجو</button>
        </div>
        {showSearchBox ? (<div>
            <form>
              <input placeholder="name..." type="text" value={searchInputTitle} onChange={(e) => { setSearchInputTitle(e.target.value) }} />
              <input placeholder="imdb..." type="text" value={searchInputImdb} onChange={(e) => { setSearchInputImdb(e.target.value) }} />
              <select onChange={(e) => { setSearchInputCategory(e.target.value) }}>
                {
                 allCategories.map(cat => <option value={cat.id}>{cat.name}</option>)
                }
               
               
              </select>
              <button type="submit" onClick={searchHandler}>جستجو</button>
            </form>
            <button onClick={resetSearch}>پاک کردن</button>

          </div>) : (<></>)}
        <div>
          <span>تعداد کل: {totalData}</span>
        </div>
      </div>
      {allPosts ? (
        <table className="table" variant="dark" striped hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>عنوان</th>
              <th>شناسه IMDB</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>تاریخ انتشار</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.imdb}</td>
                {/* <td>{item.user.name}</td> */}
                <td></td>
                {/* <td>
                  {item.status ? (
                    <Form.Check checked type="switch" id="custom-switch" />
                  ) : (
                    <Form.Check type="switch" id="custom-switch" />
                  )}
                </td> */}
                <td>{item.published_at}</td>
                <td>
                 
                      <button className="btn-icon"
                        onClick={() => restorePost(item.id)}
                      >
                        <GrPowerCycle className="op-icon" />
                      </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Is loading ....</div>
      )}
      {pageCount > 1 ? (<Pagination
          pageCount={pageCount}
          handlePageClick={(element) => chageHandlerCurrentPage(element)}
        />) : (<></>)}
    </div>
  );
}
