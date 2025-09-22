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
import ViewAllBooking from "../pages/ViewAllBooking";
import Notifications from "../component/Notification";
import BecomeOrganizerPage from "../pages/BecomeOrganizerPage";
import OrganizerDashboard from "../pages/OrganizerDashboard";
import OrganizerEvents from "../component/OrganizerEventList";
import OrganizerEventList from "../component/OrganizerEventList";
import OrganizerEventDetails from "../component/OrganizerEventDetails";
import OrganizerBooked from "../component/OrganizerBooked";
import EventCreation from "../pages/EventCreation";

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
        path: "view/all/booking",
        element: <ViewAllBooking/>,

      },
      {
        path: "/notification",
        element: <Notifications />,

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
      {
        path: "/become-organizer",
        element: <BecomeOrganizerPage />,
      },
      {
        path:"/dashboard",
        element:<OrganizerDashboard/>

      },
      {
        path:"/OrganizerEventList",
        element:<OrganizerEventList />

      },{
        path: "/OrganizerEventDetail/:id",
        element: <OrganizerEventDetails />
      },{
        path: "/Organizerbooking/details/:id",
        element: <OrganizerBooked />

      },{
         path: "event/create/",
         element:<EventCreation />
      }
    ]
  }
]);
