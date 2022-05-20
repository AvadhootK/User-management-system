import http from "../http-common";

const getAll = () => {
    return http.get("http://localhost:8081/users/")
};

const get = id => {
    return http.get(`http://localhost:8081/users/${id}`)
}

const create = data => {
    return http.post("http://localhost:8081/users/add",data)
}

const update = (id,data) => {
    return http.put(`http://localhost:8081/users/${id}`,data)
}

const remove = id => {
    return http.delete(`http://localhost:8081/users/${id}`)
}

const removeAll = () => {
    return http.delete(`http://localhost:8081/users/`)
}

const findByName = user_name => {
    return http.get(`http://localhost:8081/users/?user_name=${user_name}`)
}

const methods = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
}

export default methods