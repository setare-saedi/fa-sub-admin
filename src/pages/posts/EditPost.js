import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CreatePost.css";
import DataPicker from "./../../components/datePicker/DatePicker";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import axios from "./../../axios";
import Loading from "../../components/loading/Loading";

export default function EditPost() {
  let params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [translators, setTranslators] = useState('')
  const [date, setDate] = useState(new DateObject());
  const [dateConverted, setDateConverted] = useState()
  const [preDate, setPreDate] = useState()
  // const [preDate, setPreDate] = useState(new DateObject())
  const [miladi, setMiladi] = useState();
  const [genres, setGenres] = useState([]);
  const [preGenres, setPreGenres] = useState([]);
  const [idGenres, setIdGenres] = useState();
  const [categories, setCategories] = useState([]);
  const [preCategories, setPreCategories] = useState([]);
  const [idCategories, setIdCategories] = useState([]);
  const [actors, setActors] = useState('');
  const compatibles = [
    "Blu-Ray",
    "BDRip",
    "BRRip",
    "WEB-DL",
    "WEBRip",
    "HDTV",
    "TVRip",
    "DVDRip",
    "HDCAM",
    "HDTS",
  ];
  const [idCompatible, setIdCompatible] = useState([]);
  const [poster, setPoster] = useState();
  const [picturePreview, setPicturePreview] = useState();
  const [status, setStatus] = useState();
  const [imdb, setImdb] = useState();
  const [description, setDescription] = useState();
  const [dataInfo, setDataInfo] = useState()


  useEffect(() => {
    setIsLoading(true)
    //get post 
    const getData = async () => {
      await axios
        .get(`/posts/${params.PostID}`)
        .then((response) => {
          let data = response.data.data;
          setDataInfo(data)
          console.log(data, 'datainfo');
          setTitle(data.title)
          setSlug(data.slug)
          setTranslators(data.translators)
          setIdCategories(data.categories.map(cat => cat.id))
          setPreCategories(data.categories.map((cat) => {
            return {
              id: cat.id,
              value: cat.name
            };
          }))
          setIdCompatible(data.compatible.split(','))
          setActors(data.actors)
          setImdb(data.imdb)
          setDescription(data.summary)
          setStatus(data.status)
          setPoster(data.poster)
          setPicturePreview(data.poster)
          // setPicturePreview('https://dl.fa-sub.ir/series/a/alice-in-borderland/cover.jpg')
        console.log(data.genres,'data.genres');
          let genre = data.genres.map(g => g.id)
          setIdGenres(genre)
          setPreGenres(data.genres.map((genre) => {
            return {
              id: genre.id,
              value: genre.title
            };
          }))
          console.log(preGenres,'pregere');
          setPreDate(data.published_at)
          convertDate(data.published_at)
          setIsLoading(false)
        })
        .catch((error) => {console.error(error)
          setIsLoading(false)}
        );
    }
    getData()
    //get genres
    axios
      .get("/genres")
      .then((response) => {
        let data = response.data.data;
        let items = Object.keys(data).map((key) => {
          return {
            id: data[key].id,
            value: data[key].title,
          };
        });
        setGenres(items);
      })
      .catch((error) => console.error(error));

    //get categories
    axios
      .get("/categories")
      .then((response) => {
        let data = response.data.data;
        // console.log(data, "categories");
        let items = Object.keys(data).map((key) => {
          return {
            id: data[key].id,
            value: data[key].name,
          };
        });
        setCategories(items);
        // console.log(items, categories, "page: categories");
      })
      .catch((error) => console.error(error));
    console.log(actors);


  }, []);

  function handelChangeDate(value) {
    setDate(value);
    console.log(date, 'date selected');
    const newDate = date.convert();
    setMiladi(newDate.format());
  }

  function convertDate(value) {

    console.log(value, 'argoma');

    if (value) {
      const date1 = new DateObject(value).convert(persian, persian_fa)

      console.log(date1, 'date1');
      setDateConverted(date1)
      setDate(dateConverted)
      console.log(dateConverted, 'date converted');
      console.log(date.format(), 'dataformat');
    }
  }

  const changeHandlerGenre = (e) => {
    setIdGenres([...idGenres, Number(e)])
    let newGenre= genres.filter(item => item.id == e)
    setPreGenres([...preGenres, newGenre[0]])
  };

  const removeGenre = (e) => {
    const newIdGenre = idGenres.filter(item => item !== e)
    setIdGenres(newIdGenre)
    let newGenre= preGenres.filter(item => item.id !== e)
    setPreGenres(newGenre)
  }

  const changeHandlerCat = (e) => {
    console.log(e, 'cat');
    let id = e.detail.value;
    let id12 = id.split(",");
    let nid = id12.map(Number);
    setIdCategories(nid);
    return idCategories;
  };


  const changeHandlerCompatibles = (e) => {
    setIdCompatible([...idCompatible, e]);
  };
  const posterHandler = (e) => {
    console.log(e.target.files, 'newpost');
    setPicturePreview(URL.createObjectURL(e.target.files[0]))
    let poster = e.target.files[0]
    setPoster(poster.name)
  }

  const notify = (e) => toast(e);


  const EditPost = (e) => {

    console.log(title, slug, idCompatible, translators, imdb, miladi, status, description, poster, idCategories, idGenres, actors);
    //   e.preventDefault();
    //   axios
    //     .put(`/posts/${params.PostID}`, {
    //       title: title,
    //       slug: slug,
    //       compatible: idCompatible,
    //       translators: translators,
    //       imdb: imdb,
    //       published_at: miladi,
    //       status: status,
    //       summary: description,
    //       poster: poster,
    //       categories: idCategories,
    //       genres: idGenres,
    //       actors: idActors,
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //       notify("اطلاعات با موفقیت ثبت شد.");

    //     })
    //     .catch(function (error) {
    //       let err = error.response.data.errors;
    //       Object.values(err).map((value) => {
    //         notify(value[0]);
    //       });
    //       console.log(error.response);
    //     })
  }


  const removeCompatibel = (e) => {
    console.log(e);
    const newCom = idCompatible.filter(com => com != e)
    setIdCompatible(newCom)
  }
  console.log(preDate, 'predate');

  // console.log(preActors, 'preActors');
  // console.log(idCategories, 'id cat');
  // console.log(idGenres, 'id ge');
  // console.log(idActors, 'id act');
  // console.log(idCompatible, 'id comp1');
  // console.log(imdb, 'imbd');
  return (
    <>
      {
        isLoading && <Loading />
      }
      <div className=" bg-gray-100 p-4 border border-gray-200 rounded-sm">

        {dataInfo ? (< >
          <div className=" grid grid-cols-2 gap-6 mb-4">
            <div>
              <div>
                <label >عنوان</label >
                <input
                  type='text'
                  value={title}
                  className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300"
                  onChange={(element => setTitle(element.target.value))}
                />
              </div>
            </div>
            <div>
              <div>
                <label >اسلاگ</label >
                <input
                  type='text'
                  value={slug}
                  className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300"
                  onChange={(element => setSlug(element.target.value))}
                />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-6 mb-4">
            <div>
              <label>وضعیت</label>
              <select
                className=" w-full px-3 py-2 rounded-sm border border-gray-300 outline-none"
                aria-label="وضعیت"
                onChange={(e) => setStatus(e.target.value)}
              >

                <option value="1" {...status === '1' ? 'selected' : ''} >انتشار</option>
                <option value="2" {...status === '2' ? 'selected' : ''}>پیش نویس</option>
              </select>
            </div>
            <div >
              <label>تاریخ انتشار</label>
              <div className=" w-full border border-gray-300 bg-white rounded-sm">
                <DataPicker preDate={dateConverted} value={date} changeDate={(e) => handelChangeDate(e)} />
              </div>
            </div>
            <div>
              <label>شناسه</label>
              <div className="py-2 px-3 border border-gray-300 bg-white flex items-center justify-between w-full rounded-sm">
                <input
                  className=" outline-none"
                  placeholder="شناسه imdb"
                  aria-label="شناسه imdb"
                  aria-describedby="basic-addon3"
                  onChange={(e) => setImdb(e.target.value)}
                  value={imdb}
                />
                <button variant="outline-secondary" id="button-addon3">
                  <BsSearch />
                </button>
              </div>
            </div>
          </div>
          <div className=" mb-4">
            <div className=" col-span-2">
              <label >بازیگران</label >
              <input
                type='text'
                value={actors}
                className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300"
                onChange={(element => setActors(element.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className=" flex flex-col">
              <label>دسته بندی</label>
              <select className="w-full px-3 py-2 border border-gray-300 outline-none rounded-sm" onChange={(e) => setPreCategories(e)}>
                {
                  categories.map(item => <option key={item.id} value={item.id}>{item.value}</option>)
                }
              </select>
            </div>
            <div className=" col-span-2">
              <label >مترجمان</label >
              <input
                type='text'
                value={translators}
                className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300"
                onChange={(element => setTranslators(element.target.value))}
              />
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-6 mb-4">
            <div className=" col-span-2">
              <div>
                <label>هماهنگ با نسخه</label>
                <div className=" flex flex-wrap gap-2 bg-white py-2 px-2 border border-gray-300 rounded-sm">
                  {
                    idCompatible.map(com => <div key={com} ><button className=" cursor-text border border-gray-300 py-1 pr-2  bg-gray-50 flex justify-between rounded-md" onClick={e => removeCompatibel(com)}>{com}<IoIosClose className=" text-red-500 cursor-pointer mr-2" /></button> </div>)
                  }
                  <select className=" px-3 border border-gray-300 outline-none rounded-md" onChange={e => changeHandlerCompatibles(e.target.value)}>
                    {
                      compatibles.map(item => <option key={item} value={item}>{item}</option>)
                    }
                  </select>
                </div>
              </div>
              <div>
                <label>ژانر  </label>
                <div className=" flex flex-wrap gap-2 bg-white py-2 px-2 border border-gray-300 rounded-sm">
                  {
                    preGenres.map(item => <div key={item.id} ><button className=" cursor-text border border-gray-300 py-1 pr-2  bg-gray-50 flex justify-between rounded-md" onClick={e => removeGenre(item.id)}>{item.value}<IoIosClose className=" text-red-500 cursor-pointer mr-2" /></button> </div>)
                  }
                  <select className=" px-3 border border-gray-300 outline-none rounded-md" onChange={e => changeHandlerGenre(e.target.value)}>
                    {
                      genres.map(item => <option key={item.id} value={item.id}>{item.value}</option>)
                    }
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div controlId="formFileMultiple" className="mb-3">
                <input
                  type="file"
                  multiple
                  onChange={(e) => posterHandler(e)}
                />
              </div>
              <img src={picturePreview} width='150px' height='150px' alt='' />
            </div>
          </div>
          <div>
            <div>
              <CKEditor
                editor={ClassicEditor}
                // data="<p>Hello from CKEditor 5!</p>"

                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                  setDescription(data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
                data={description}
              />
            </div>
          </div>
          <div>
            <div >

              <button className=" mt-6 border border-gray-300 bg-gray-200 px-12 py-2 rounded-md " onClick={EditPost}>
                ثبت اطلاعات
              </button>
            </div>
          </div>
          <div>
            <ToastContainer />
          </div>
        </>) : (<div></div>)}



        <div></div>
      </div>
    </>
  );
}
