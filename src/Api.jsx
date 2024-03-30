import axios from "axios"
export const BASE_URL = "https://api.themoviedb.org/3" 
export const BASE_IMG = "https://image.tmdb.org/t/p/w500"
export const api_key = "230f37a180f4072c27c74f6840659163"
export const Api = {
    getPopular: (id) => axios.get(`${BASE_URL}/movie/popular` ,{
        params : {
            api_key ,
            page : id
        }
    }),
    getMovie: (id) => axios.get(`${BASE_URL}/movie/${id}`, {
        params : {
            api_key
        }
    }),
    getActor : (id) => axios.get(`${BASE_URL}/movie/${id}/credits`, {
        params : {
            api_key
        }
    }),
    getUser : (id) => axios.get(`${BASE_URL}/credit/${id}`, {
        params : {
            api_key
        }
    }),
    getRecomindation : (id) => axios.get(`${BASE_URL}/movie/upcoming`, {
        params : {
            api_key ,
            page : id
        }
    }),
    getRating: (id) => axios.get(`${BASE_URL}/movie/top_rated`,{
        params: {
            api_key,
            page: id
        }
    })
}