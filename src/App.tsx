// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/Error";
import ToasterProvider from "./components/ToasterProvider";
import RemoveAccount from "./pages/RemoveAccount";

function App() {
  const Layout = () => {
    return (
      <div
        id="rootContainer"
        className="px-10 m-0 overflow-visible min-h-screen flex flex-col justify-between"
      >
        <ScrollRestoration />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-hidden">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          // All Roles
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/delete-account",
              element: <RemoveAccount />,
            },
          ],
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <ToasterProvider />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
