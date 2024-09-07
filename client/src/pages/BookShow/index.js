import React, { useEffect } from "react";
import { message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetShowById } from "../../apicalls/theatres";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { BookShowTickets, MakePayment } from "../../apicalls/booking";
function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({
        showId: params.id,
      });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show ? show.totalSeats : 0;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="flex gap-1 flex-col p-2 card">
        {Array.from(Array(rows).keys()).map((seat, index) => {
          return (
            <div className="flex gap-1 justify-center">
              {Array.from(Array(columns).keys()).map((column, index) => {
                const seatNumber = seat * columns + column + 1;
                let seatClass = "seat";

                if (selectedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " selected-seat";
                }

                if (show.bookedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " booked-seat";
                }

                return (
                  seat * columns + column + 1 <= totalSeats && (
                    <div
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        users: user._id,
        seats: selectedSeats,
        transactionId,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-between card p-2 items-center">
        <div>
          <h1 className="text-sm">{show ? show.theatre.name : ""}</h1>
          <h1 className="text-sm">{show ? show.theatre.address : ""}</h1>
        </div>
        <div>
          <h1 className="text-2xl uppercase">
            {show ? show.movie.title : ""} ({show ? show.movie.language : ""})
          </h1>
        </div>
        <div>
          <h1 className="text-sm">
            {moment(show ? show.date : Date).format("MMM Do yyyy")} -{" "}
            {moment(show ? show.time : Date, "HH:mm").format("hh:mm A")}
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-2">{getSeats()}</div>

      {selectedSeats.length > 0 && (
        <div className="mt-2 flex justify-center gap-2 items-center flex-col">
          <div className="flex justify-center">
            <div className="flex uppercase card p-2 gap-3">
              <h1 className="text-sm">
                <b>Selected Seats:</b> {selectedSeats.join(" , ")}
              </h1>
              <h1 className="text-sm">
                <b>Total Price:</b> {selectedSeats.length * show.ticketPrice}
              </h1>
            </div>
          </div>
          <StripeCheckout
            currency="INR"
            token={onToken}
            amount={show ? selectedSeats.length * show.ticketPrice * 100 : 0}
            billingAddress
            stripeKey={process.env.stripe_key}
          >
            <Button title="Book Now" />
          </StripeCheckout>
        </div>
      )}
    </div>
  );
}

export default BookShow;
