import axios from "axios";
const config = {
    headers:{
        'Content-type':'application/json',
        authorization:`Bearer ${localStorage.getItem('token')}`
    }
  };

// make payment
export const MakePayment = async (token, amount) => {
  try {
    const response = await axios.post("/bookings/make-payment", {
      token,
      amount,
    }, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//book shows
export const BookShowTickets = async (payload) => {
  try {
    const response = await axios.post("/bookings/book-show", payload, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//get bookings of a user
export const GetBookingsOfUser = async () => {
  try {
    const response = await axios.get("/bookings/get-bookings", config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
