import http from '../common/http-common';
const API_URL = "candidatura/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const create = data => {
    const formData = new FormData();
    formData.append('usuario', data.usuario);
    formData.append('evento', data.evento);
  
    return http.mainInstance.post(API_URL + "create", formData);
};

const admitido = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};


const CandidaturaServices = {
    findAll,
    findById,
    create,
    admitido
}

export default CandidaturaServices;