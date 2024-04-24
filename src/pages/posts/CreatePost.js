import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import DataPicker from "./../../components/datePicker/DatePicker";
import { DateObject } from "react-multi-date-picker";

import Tagify from "./../../components/tagify/Tagify";
import TagifyWithoutId from "../../components/tagify/TagifyWithoutId";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from './../../components/form/Input'
import Button from "./../../components/form/Button";
import { requiredValidator, minValidator, maxValidator, emailValidator } from "./../../validators/rules"
import { useForm } from "./../../hooks/useForm"

import { BsSearch } from "react-icons/bs";
import axios from "./../../axios";


import ImageUploading from 'react-images-uploading';


export default function CreatePost() {


  const [date, setDate] = useState(new DateObject());
  console.log(date, 'date');
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([]);
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

  const [idGenres, setIdGenres] = useState();
  const [idCategories, setIdCategories] = useState([]);
  const [miladi, setMiladi] = useState();
  const [idCompatible, setIdCompatible] = useState();
  const [poster, setPoster] = useState();
  const [picturePreview, setPicturePreview] = useState();
  const [status, setStatus] = useState();
  const [imdb, setImdb] = useState();
  const [description, setDescription] = useState();

  const [formState, onInputHandler] = useForm({
    title: {
      value: "",
      isValid: false
    },
    slug: {
      value: "",
      isValid: false
    },
    translator: {
      value: "",
      isValid: false
    },
    actors: {
      value: "",
      isValid: false
    }

  }, false)

  const changeHandlerGenre = (e) => {
    let id = e.target.value;
    let id12 = id.split(",");
    let nid = id12.map(Number);
    setIdGenres(nid);
    return idGenres;
  };


  const changeHandlerCompatibles = (e) => {
    let com = e.target.value;
    setIdCompatible(com);
    return idCompatible;
  };
  const posterHandler = (e) => {
    console.log(e.target.files[0], 'newpost');
    setPicturePreview(URL.createObjectURL(e.target.files[0]))
    setPoster(e.target.files[0])
  }

  const notify = (e) => toast(e);

  useEffect(() => {
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


  }, []);

  const savePost = (e) => {
    e.preventDefault();
    console.log('click submit');

    const newDate = date
    setMiladi(newDate.convert().format());
    console.log(miladi, 'miladi');

    const imgdata = new FormData()
    imgdata.append('fileupload', poster)

    console.log(formState.inputs.title.value, formState.inputs.slug.value, idCompatible, formState.inputs.translator.value, imdb,
      miladi, 'miladi', status, description, poster, 'poster', imgdata,'url', idCategories, idGenres, formState.inputs.actors.value
    );

    // {
    //   title: formState.inputs.title.value,
    //       slug: formState.inputs.slug.value,
    //     compatible: idCompatible,
    //     translators: formState.inputs.translator.value,
    //     imdb: imdb,
    //     published_at: miladi,
    //     status: status,
    //     summary: description,
    //     poster: imgdata,
    //     categories: idCategories,
    //     genres: idGenres,
    //     actors: formState.inputs.actors.value,
    // }
    const data = new FormData()
    data.append('poster', poster)
    data.append('title', formState.inputs.title.value)
    data.append('imdb', imdb)
    data.append('status', status)

    axios
      .post("/posts", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response);
        notify("اطلاعات با موفقیت ثبت شد.");

      })
      .catch((error) => {
        let err = error.response.data.errors;
        Object.values(err).map((value) => {
          notify(value[0]);
        });
        console.log(error.response);
      });
  };


  
  return (
    <>
      <div className=" bg-gray-100 p-4 border border-gray-200 rounded-sm">

        <form className="" onSubmit={savePost} method="post" encType="multipart/form-data">
          <div className=" grid grid-cols-2 gap-6 mb-4">
            <div>
              <label>
                عنوان
              </label>
              <Input
                type="text"
                element="input"
                id="title"
                className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300"
                placeholder="عنوان..."
                validations={[
                  requiredValidator(),
                  minValidator(4),

                ]}
                onInputHandler={onInputHandler}
              />

            </div>
            <div>
              <label>
                اسلاگ
              </label>
              <Input
                type="text"
                element="input"
                id="slug"
                className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300"
                placeholder="اسلاگ..."
                validations={[
                  requiredValidator(),
                  minValidator(4),
                ]}
                onInputHandler={onInputHandler}
              />

            </div>
          </div>
          <div className=" grid grid-cols-3 gap-6 mb-4">
            <div>
              <label>
                وضعیت
              </label>
              <select
                className=" w-full px-3 py-2 rounded-sm border border-gray-300 outline-none"
                aria-label="وضعیت"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option selected disabled>وضعیت</option>
                <option value="1">انتشار</option>
                <option value="2">پیش نویس</option>
              </select>
            </div>
            <div>
              <label>
                تاریخ انتشار
              </label>
              <div className=" w-full border border-gray-300 bg-white rounded-sm">
                <DataPicker value={date} changeDate={(e) => setDate(e)} preDate={date} />
              </div>
            </div>
            <div>
              <label>
                شناسه imdb
              </label>
              <div className="py-2 px-3 border border-gray-300 bg-white flex items-center justify-between w-full rounded-sm outline-none">
                <input
                  className="outline-none"
                  placeholder="شناسه imdb"
                  aria-label="شناسه imdb"
                  aria-describedby="basic-addon3"
                  onChange={(e) => setImdb(e.target.value)}
                />
                <button variant="outline-secondary" >
                  <BsSearch />
                </button>
              </div>
            </div>

          </div>
          <div className=" grid grid-cols-2 gap-6">
            <div>
              <label>
                هماهنگ با نسخه
              </label>
              <TagifyWithoutId
                infos={compatibles}
                changeHandler={(e) => changeHandlerCompatibles(e)}
                title="هماهنگ با نسخه ...."
              />
            </div>
            <div>
              <label>
                دسته بندی
              </label>
              <select className="w-full px-3 py-1.5 border border-gray-300 outline-none rounded-sm" onChange={e => setIdCategories(e.target.value)}>
                {
                  categories.map(cat => <option key={cat.id} value={cat.id}>{cat.value}</option>)
                }
              </select>
            </div>

          </div>

          <div className=" grid grid-cols-3 gap-6">
            <div className=" col-span-2">
              <div>
                <label>
                  ژانر
                </label>
                <Tagify
                  infos={genres}
                  changeHandler={(e) => changeHandlerGenre(e)}
                  title="ژانر ...."
                />
              </div>
              <div className="mb-3">
                <label>
                  بازیگران
                </label>
                <Input
                  type="text"
                  element="input"
                  id="actors"
                  className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300"
                  placeholder="بازیگران..."
                  validations={[
                    requiredValidator(),
                    minValidator(4),

                  ]}
                  onInputHandler={onInputHandler}
                />
              </div>
              <div>
                <label>
                  مترجمان
                </label>
                <Input
                  type="text"
                  element="input"
                  id="translator"
                  className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300"
                  placeholder="مترجمان..."
                  validations={[
                    requiredValidator(),
                    minValidator(8),

                  ]}
                  onInputHandler={onInputHandler}
                />
              </div>
            </div>
            <div className="mb-3" >
              <label>
                تصویر پست
              </label>
              <div controlId="formFileMultiple" className="mb-3">
                <input
                  name="poster"
                  type="file"
                  multiple
                  onChange={(e) => posterHandler(e)}
                />

              </div>
              <img src={picturePreview} width='120px' height='120px' />
            </div>
            
          </div>

          <div>
            <div className=" mt-2">
              <label>
                توضیحات
              </label>
              <CKEditor
                editor={ClassicEditor}
                // data="<p>Hello from CKEditor 5!</p>"

                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log({ event, editor, data });
                  setDescription(data);
                }}
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <Button
                className={`border border-gray-300 px-10 py-2 mt-4 bg-gray-50 rounded-sm ${formState.isFormValid
                  ? "bg-green-500"
                  : "bg-gray-200"
                  }`}
                type="submit"

                disabled={!formState.isFormValid}
              >
                <span className="login-form__btn-text">ثبت اطلاعات</span>
              </Button>
            </div>
          </div>
          <div>
            <ToastContainer />
          </div>
        </form>

      </div>
    </>
  );
}
