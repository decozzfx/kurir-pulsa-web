import React from "react";
import { Link } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { LogoPng } from "../assets/image";
import useStore from "../zustand";
import OpenCloseIndicator from "./OpenCloseIndicator";
import useDetectScroll from "@smakss/react-scroll-direction";
import { useGetPrimaryData } from "../hooks";

const Navbar = () => {
  const { scrollPosition } = useDetectScroll();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const { snkToggle } = useStore();

  const { data: dataPrimary } = useGetPrimaryData();

  const jamBuka = dataPrimary?.[0].jam_buka;
  const jamTutup = dataPrimary?.[0].jam_tutup;

  const navItem = [
    { label: "Home", link: "/" },
    { label: "Kebijakan Privasi", link: "", onclick: snkToggle },
    { label: "About Us", link: "#about" },
    { label: "Contact Support", link: "#contact-support" },
    // { label: "Delete Account", link: "/delete-account" },
    { label: `Buka ${jamBuka} - ${jamTutup}`, link: "" },
  ];

  return (
    // navbar screen
    <div
      className={`fixed z-[3] top-0 left-0 right-0 bg-base-100 w-full flex justify-between px-3 lg:px-10 py-3 xl:py-5 gap-4 xl:gap-0 ${
        scrollPosition.top > 4 ? "shadow-md" : ""
      }`}
    >
      {/* container */}
      <div className="flex gap-3 items-center">
        {/* for mobile */}
        <div className="drawer w-auto p-0 mr-1 lg:hidden">
          <input
            id="drawer-navbar-mobile"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={toggleDrawer}
          />
          <div className="p-0 w-auto drawer-content">
            <label
              htmlFor="drawer-navbar-mobile"
              className="p-0 btn btn-ghost drawer-button"
            >
              <HiBars3CenterLeft className="text-2xl" />
            </label>
          </div>
          <div className="drawer-side z-[99]">
            <label
              htmlFor="drawer-navbar-mobile"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu p-4 w-auto min-h-full bg-base-200 text-base-content">
              <Link
                to={"/"}
                className="flex items-center gap-3 xl:gap-2 mt-1 mb-5"
              >
                <img src={LogoPng} style={{ width: 20 }} alt="logo" />
                <Link to={"/"} className="flex items-center gap-1 xl:gap-2">
                  <span className="text-lg font-bold text-lg-content dark:text-neutral-200">
                    Kurir Pulsa
                  </span>
                </Link>
              </Link>

              <div className="flex flex-col gap-6">
                {navItem.map((nav, idx) => (
                  <Link to={nav.link} key={idx} onClick={nav?.onclick}>
                    <span className="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200 hover:text-slate-400">
                      {nav.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* navbar logo */}
        <img src={LogoPng} style={{ width: 40 }} alt="logo" />
        <Link to={"/"} className="flex items-center gap-1 xl:gap-2">
          <span className="text-[26px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-bold text-lg-content dark:text-neutral-200">
            Kurir Pulsa
          </span>
        </Link>
      </div>

      {/* navbar items to right */}
      <div className="hidden lg:flex items-center gap-4 xl:gap-5 2xl:gap-6 3xl:gap-7 ">
        {navItem.map((nav, idx) => (
          <Link to={nav.link} key={idx} onClick={nav?.onclick}>
            <div className="flex items-center gap-2">
              <span className="text-[26px] leading-[1.2] lg:text-sm xl:text-lg font-bold hover:text-slate-400">
                {nav.label}
              </span>
              {nav.label.includes("Buka") && <OpenCloseIndicator />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
