import axios from "axios";

const apiClient = axios.create(
    {
        baseURL:'http://localhost:8080'
    }
);
export default function retrieveHelloWorldBean()
{

    return axios.get('http://localhost:8080/hello-world-bean');
}

export const retrieveHelloWorldBean11 = () => axios.get('http://localhost:8080/hello-world-bean');

export const retrieveHelloWorlParameter = (username) => apiClient.get(`hello-world/${username}`)