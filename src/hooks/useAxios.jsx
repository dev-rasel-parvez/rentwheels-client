import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://rentwheelsprojects.netlify.app',
  
});

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;
