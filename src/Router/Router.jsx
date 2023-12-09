import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Page/Home/Home";
import MainRoute from "../Layout/MainRoute";
import Survey from "../Component/Survey/Survey";
import AddSurvey from "../Component/AddSurvey/AddSurvey";
import SurveyDetails from "../Component/SurveyDetails/SurveyDetails";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import Dashboard from "../Page/Dashboard/Dashboard/Dashboard";
import AdminHome from "../Page/Dashboard/Admin/AdminHome/AdminHome";
import AllUser from "../Page/Dashboard/Admin/AllUser/AllUser";
import ManageSurvey from "../Page/Dashboard/Admin/ManageSurvey/ManageSurvey";
import Payment from "../Page/Dashboard/Admin/Payment/Payment";
import SurveyResponse from "../Page/Dashboard/Admin/SurveyResponse/SurveyResponse";
import Pricing from "../SharePage/Pricing/Pricing";
import IsAdmin from "../IsAdmin/IsAdmin";
import SurveyorHome from "../Page/Dashboard/Surveyor/SurveyorHome/SurveyorHome";
import UserResponse from "../Page/Dashboard/Surveyor/UserResponse/UserResponse";
import AdminResponse from "../Page/Dashboard/Surveyor/AdminResponse/AdminResponse";
import UpdateSurvey from "../Page/Dashboard/Surveyor/UpdateSurvey/UpdateSurvey";
import SurveyUpdate from "../Component/SurveyUpdate/SurveyUpdate";
import IsSurveyor from "../IsSurveyor/IsSurveyor";

//todo make responsive

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainRoute></MainRoute>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/survey',
                element: <PrivetRoute><Survey></Survey></PrivetRoute>
            },
            {
                path: '/dashboard',
                element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>
            },
            {
                path: '/surveyDetails/:id',
                element: <PrivetRoute><SurveyDetails></SurveyDetails></PrivetRoute>
            },
            {
                path: '/pricing',
                element: <Pricing></Pricing>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/home',
                element:<IsAdmin><AdminHome></AdminHome></IsAdmin> 
            },
            {
                path : '/dashboard/admin/allUser',
                element:<IsAdmin><AllUser></AllUser></IsAdmin>
            },
            {
                path : '/dashboard/admin/manageSurvey',
                element:<IsAdmin><ManageSurvey></ManageSurvey></IsAdmin> 
            },
            {
                path : '/dashboard/admin/payment',
                element: <IsAdmin><Payment></Payment></IsAdmin>
            },
            {
                path : '/dashboard/admin/surveyResponse',
                element: <IsAdmin><SurveyResponse></SurveyResponse></IsAdmin>
            },
            // surveyor route
            {
                path: '/dashboard/surveyor/home',
                element: <IsSurveyor><AdminHome></AdminHome></IsSurveyor>  
            },
            {
                path: '/dashboard/surveyor/create-survey',
                element:<IsSurveyor><AddSurvey></AddSurvey></IsSurveyor> 
            },
            {
                path:'/dashboard/surveyor/user-response',
                element:<IsSurveyor><UserResponse></UserResponse></IsSurveyor> 
            },
            {
                path: '/dashboard/surveyor/admin-response',
                element:<IsSurveyor><AdminResponse></AdminResponse></IsSurveyor> 
            },
            {
                path: '/dashboard/surveyor/survey-response',
                element:<IsSurveyor><SurveyResponse></SurveyResponse></IsSurveyor> 
            },
            {
                path: '/dashboard/surveyor/update-survey',
                element:<IsSurveyor><UpdateSurvey></UpdateSurvey></IsSurveyor> 
            },
            {
                path: '/dashboard/surveyor/survey/update/:id',
                element:<IsSurveyor><SurveyUpdate></SurveyUpdate></IsSurveyor> 
            }
        ]
    }
]);

export default router