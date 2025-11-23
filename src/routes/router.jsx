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

import BecomeOrganizerPage from "../pages/BecomeOrganizerPage";
import OrganizerDashboard from "../pages/OrganizerDashboard";
import OrganizerEvents from "../component/organizerevents";
import OrganizerEventList from "../component/OrganizerEventList";
import OrganizerEventDetails from "../component/OrganizerEventDetails";
import OrganizerBooked from "../component/OrganizerBooked";

import CancelledBookings from "../component/CancelledBookings";
import AllBookings from "../component/AllBooking";
import OrganizerAnalytics from "../component/OrganizerAnalytics";
import AdminApprovedEvents from "../component/AdminapprovedEvent";
import CreateEvent from "../component/createEvent";
import UpdateEvent from "../component/UpdateEvent";
import OrganizerNotifications from "../component/OrganizerNotification";
import CustomerNotifications from "../component/CustomerNotification";
import CreateSupportTicket from "../component/CreateSupportTicket";
import EventReviewPage from "../component/EventReviewpage";
import OrganizerEventRatings from "../component/OrganizerRating";
import Register from "../pages/RegisterForm";
import ProfilePage from "../component/customerprofile";
import WishlistPage from "../component/WhishlistFull";
import UserAuth from "./protectedroutes/UserAuth";
import LearnMorePage from "../component/LearnMpre";
import RecommendedEvents from "../component/airecommendation";



export const router = createBrowserRouter([
  {
    path: "/",    
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />

      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />
      },
      

      {
        path: "auth",
        element: <UserAuth />,
        children: [
          {
            path: "event/list", // ✅ relative
            element: <EventListPage />
          },
          {
            path: "view/all/booking",
            element: <ViewAllBooking />
          },
          {
            path: "bookings/new", // ✅ no leading slash
            element: <BookingPage />
          },
          {
            path: "booking/:bookingId", 
            element: <BookingDetailsPage />
          },
          
          {
            path:"event/detail/:id",
            element:<EventDetail/>
          },
          {
            path:"recommendations",
            element:<RecommendedEvents/>
          },
          {
            path: "search/:category",
            element: <SearchEventsPage/>
          },
          {
            path: "become-organizer",
            element: <BecomeOrganizerPage />
          },
          {
            path:"dashboard",
            element:<OrganizerDashboard/>
          },
          {
            path:"OrganizerEventList",
            element:<OrganizerEventList />
          },
          {
            path:"organizer/events",
            element:<OrganizerEvents />
          },
          {
            path: "OrganizerEventDetail/:id",
            element: <OrganizerEventDetails />
          },
          {
            path: "Organizerbooking/details/:id",
            element: <OrganizerBooked />
          },
          {
            path: "event/create",
            element: <CreateEvent/>
          },
          {
            path: "event/update/:id",
            element: <UpdateEvent />
          },
          {
            path:"cancelled/booking",
            element:<CancelledBookings />
          },
          {
            path:"organizer/bookings",
            element:<AllBookings />
          },
          {
            path:"organizer/analytics",
            element:<OrganizerAnalytics />
          },
          {
            path:"admin/approved/events",
            element:<AdminApprovedEvents/>
          },
          {
            path:"organizer/notification",
            element:<OrganizerNotifications />
          },
          {
            path: "my/notification",
            element: <CustomerNotifications />
          },
          {
            path: "support-ticket/create",
            element: <CreateSupportTicket />
          },
          {
            path: "event/:id/reviews",
            element: <EventReviewPage />
          },
          {
            path: "organizer/rating",
            element: <OrganizerEventRatings />
          },
          {
            path: "profile/:id",
            element: <ProfilePage/>
          },
          {
            path: "wishlist",
            element: <WishlistPage />
          },
          {
            path: "learn/more",
            element: <LearnMorePage/>
          }
        ]
      }
      
      
      
      
    ]
  }
]);
