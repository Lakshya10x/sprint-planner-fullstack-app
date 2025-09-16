import axios from "axios";


export const apiClient = axios.create(
    {
        baseURL:'http://localhost:8080'
    }
);

export const retreiveAllSprints =
            (username) => apiClient.get(`/sprints/${username}`)

export const deleteSprintApi = 
            (username,id) => apiClient.delete(`/sprints/${username}/deleteSprint/${id}`)

export const retreiveSprintApi =
            (username, id) => apiClient.get(`/sprints/${username}/sprint/${id}`)

export const updateSprintApi = 
            (username, id, sprint) => apiClient.put(`/sprints/${username}/sprint/${id}`, sprint)

export const createSprintApi = 
            (username, sprint) => apiClient.post(`/sprints/${username}/sprint`, sprint)

export const executeBasicAuth =
            (token) => apiClient.get(`/sprints/basicAuth`,{
                headers:{
                    Authorization:token
                }
            })