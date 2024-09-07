import axios from "axios";
const config = {
  headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
//add a new theatre
export const AddTheatre = async (payload) => {
  try {
    const response = await axios.post("/theatres/add-theatre", payload, config);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//get all theatres
export const GetAllTheatres = async () => {
  try {
    const response = await axios.get("/theatres/get-all-theatres", config);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//get all theatres by owner
export const GetAllTheatresByOwner = async (payload) => {
  try {
    const response = await axios.post(
      "/theatres/get-all-theatres-by-owner",
      payload,
      config
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//update theatre
export const UpdateTheatre = async (payload) => {
  try {
    const response = await axios.post(
      "/theatres/update-theatre",
      payload,
      config
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//delete theatre
export const DeleteTheatre = async (payload) => {
  try {
    const response = await axios.post(
      "/theatres/delete-theatre",
      payload,
      config
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//add show
export const AddShow = async (payload) => {
  try {
    const response = await axios.post("/theatres/add-show", payload, config);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//get all shows
export const GetAllShowsByTheatre = async (payload) => {
  try {
    const response = await axios.post(
      "/theatres/get-all-shows-by-theatre",
      payload,
      config
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//delete show
export const DeleteShow = async (payload) => {
  try {
    const response = await axios.post("/theatres/delete-show", payload, config);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//Get All Theatres By Movie
export const GetAllTheatresByMovie = async (payload) => {
  try {
    const response = await axios.post(
      "/theatres/get-all-theatres-by-movie",
      payload,
      config
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//Get Show By Id
export const GetShowById = async (payload) => {
  try {
    const response = await axios.post(
      "/theatres/get-show-by-id",
      payload,
      config
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
