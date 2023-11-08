import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import PublicRoute from "./PublicRoute"
import PublicLayout from "../components/PublicLayout";
import Home from "../page/Home"
// import Detail from "../page/Detail";
import Wallet from "../page/Wallet";
// import Assets from "../page/Assets";
// import Admin from "../page/Admin";

const publicRoute = [
    {
        index: true,
        path: "home",
        component: <Home />,
        exact: true,
        restrict: true,
    },
    // {
    //     index: true,
    //     path: "detail/:address",
    //     component: <Detail />,
    //     exact: true,
    //     restrict: true,
    // },
    {
        index: true,
        path: "wallet",
        component: <Wallet />,
        exact: true,
        restrict: true,
    },
    // {
    //     index: true,
    //     path: "assets",
    //     component: <Assets />,
    //     exact: true,
    //     restrict: true,
    // },
    // {
    //     index: true,
    //     path: "admin",
    //     component: <Admin />,
    //     exact: true,
    //     restrict: true,
    // },
];

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="home" />} />
                <Route path="/" element={<PublicRoute />}>
                    <Route element={<PublicLayout />}>
                        {publicRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                            />
                        ))}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
