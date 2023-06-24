import axios from "axios";
const config = {
    headers:{
        'Content-type':'application/json',
        authorization:`Bearer ${localStorage.getItem('token')}`
    }
  };
//add a new movie
export const AddMovie = async (payload) => {
    try {
        const response = await axios.post("/movies/add-movie", payload,config);
        return response.data;
    } catch (error) {
        return error.response;
    }
}
// get all movies
export const GetAllMovies = async () => {
    try {
        const response = await axios.get("/movies/get-all-movies",config);
        return response.data;
    } catch (error) {
        return error.response;
    }
}
// update a movie
export const UpdateMovie = async (payload) => {
    try {
        const response = await axios.post("/movies/update-movie", payload,config);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// delete a movie
export const DeleteMovie = async (payload) => {
    try {
        const response = await axios.post("/movies/delete-movie", payload,config);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//get a movie by Id
export const  GetMovieById = async (id) => {
    try {
        const response = await axios.get(`/movies/get-movie-by-id/${id}`,config);
        return response.data;
    } catch (error) {
        return error.response;
    }
}