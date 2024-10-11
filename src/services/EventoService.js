import http from '../common/http-common';
const API_URL = "evento/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const create = (file, data, email) => {
    console.log(data.dataEvento);
    
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('cep', data.cep);
    formData.append('dataEvento', data.dataEvento);
    formData.append('horaInicio', data.horaInicio);
    formData.append('vagas', data.vagas);
    formData.append('file', file)
    formData.append('numero', data.numero);
    formData.append('infos', data.infos);
    formData.append('statusEvento', data.statusEvento);

    return http.multipartInstance.post(API_URL + `create/${email}`, formData);
};

const alterarInfo = (id, data) => {

    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('infos', data.infos);
    formData.append('horaInicio', data.horaInicio);
    formData.append('dataEvento', data.dataEvento);
    formData.append('vagas', data.vagas);
    formData.append('cep', data.cep);
    formData.append('numero', data.numero);

    return http.mainInstance.put(API_URL + `alterarInfo/${id}`, formData);
};



const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};

const marcarComoLida = (id) => {
    return http.mainInstance.put(API_URL + `marcarComoLida/${id}`);
};

const MensagemService = {
    findAll,
    findById,
    create,
    inativar,
    marcarComoLida,
    alterarInfo
}

export default MensagemService;
