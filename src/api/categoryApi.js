/* eslint-disable prettier/prettier */
import axiosClient from "./axiosClient";

const categoryApi = {
    getAll(params) {
        const url = '/Category/GetAll';
        return axiosClient.get(url, {params});
    },

    get(id){
        const url = `/Category/GetAll/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/ACategory/AddCategory';
        return axiosClient.post(url, data);
    },

    update(data){
        //const url = `/User/GetAll/${data.id}`;
        const url =`/ACategory/EditCategory`;
        //return axiosClient.patch(url,data);
        return axiosClient.put(url,data);
    },

    remove(id){
        const url = `ACategory/DeleteCategory?id=${id}`;
        return axiosClient.delete(url);
    }
};

export default categoryApi;
