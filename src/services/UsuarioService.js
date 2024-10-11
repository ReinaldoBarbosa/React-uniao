import http from '../common/http-common';
const API_URL = "usuario/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const signup = (nome, email, password) => {
    return http.mainInstance.post(API_URL + "signup", {
        nome,
        email,
        password,
    });
};

const signin = async (email, senha) => {
    const response = await http.mainInstance
        .post(API_URL + "signin", {
            email,
            senha,
        });
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const create = data => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('telefone', data.telefone);
    formData.append('infos', data.infos);
    formData.append('cpf_cnpj', data.cpf_cnpj);
    formData.append('senha', data.senha);
    formData.append('nivelAcesso', data.nivelAcesso);

    return http.mainInstance.post(API_URL + "create", formData);
};

const createImage = (file) => {
    const formData = new FormData();
    
    formData.append('file', file);

    return http.multipartInstance.post(API_URL + `createImage`, formData);
}

const update = (id, data) => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('telefone', data.telefone);
    formData.append('email', data.email);
    formData.append('cpf_cnpj', data.cpf_cnpj);
    formData.append('nivelAcesso', data.nivelAcesso);
    return http.mainInstance.put(API_URL + `update/${id}`, formData);
};
const updateComImagem = (id, data, file) => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('telefone', data.telefone);
    formData.append('email', data.email);
    formData.append('file', file);
    formData.append('cpf_cnpj', data.cpf_cnpj);
    formData.append('nivelAcesso', data.nivelAcesso);
    return http.multipartInstance.put(API_URL + `updateComImg/${id}`, formData);
};

const alterarSenha = (id, data) => {
    const formData = new FormData();
    formData.append('senha', data.senha);
 
    return http.mainInstance.put(API_URL + `alterarSenha/${id}`, formData);
};

const findByNome = nome => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};

const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
}

const UsuarioService = {
    findAll,
    findById,
    signup,
    signin,
    logout,
    getCurrentUser,
    create,
    update,
    alterarSenha,
    findByNome,
    inativar,
    createImage,
    updateComImagem
}

export default UsuarioService;