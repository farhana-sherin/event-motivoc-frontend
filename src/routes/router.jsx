import {
  createBrowserRouter,

} from "react-router-dom";
import { UserLayout } from "../userLayout/UserLayout";
import ErrorPage from "../Errorpage ";
import { Home } from "../pages/Home";
import { EventDetails } from "../pages/EventDetails";
import BuyTicket from "../pages/BuyTicket";
import { Payment } from "../pages/Payment";


export const router = createBrowserRouter([
  {
    path: "/",    
    element: <UserLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element:<Home/>,
      },
      {
        path: "/events/:id",
        element: <EventDetails/>,
      },
      {
        path:"/buy-ticket/:id",
        element:<BuyTicket/>
      },
      {
        path:"/payment/:id",
        element:<Payment/>
      }
    ]
   
  },
  
  
]);