// axios
import axios from 'axios'
const token = localStorage.getItem('token')

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://setare.fa-sub.ir/api/v1' ,
  // timeout: 1000,
   headers: {
    "content-type": "multipart/form-data",
    'Authorization': 'Bearer ' + token
  }
})



export default axiosIns