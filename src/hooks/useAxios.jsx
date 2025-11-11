import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://rentwheels-server-orcin.vercel.app',
  
});

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;
