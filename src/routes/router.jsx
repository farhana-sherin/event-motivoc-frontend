import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../userLayout/UserLayout";
import ErrorPage from "../Errorpage ";
import { Home } from "../pages/Home";

import Login from "../pages/Login";
import BookingPage from "../pages/BookingPage";
import BookingDetailsPage from "../pages/BookingDetail";
import PaymentSuccess from "../component/PaymentSuccess";
import EventDetail from "../pages/EventDetail";
import SearchEventsPage from "../component/SeerchEventPage";
import EventListPage from "../pages/EventListPage";

export const router = createBrowserRouter([
  {
    path: "/",    
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {

        path: "/event/list",
        element: <EventListPage/>

      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bookings/new",
        element: <BookingPage />,
      },
      {
        path: "/booking/:bookingId", // ✅ Add this route
        element: <BookingDetailsPage />
      },
      {
        path: "/payment/success",
        element: <PaymentSuccess />
      },
      {
        path:"/event/detail/:id",
        element:<EventDetail/>

      },
      {
        path: "/search/:category",
        element: <SearchEventsPage/>,
      },
    ]
  }
]);
