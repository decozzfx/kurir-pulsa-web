import React from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IGetPrimaryDataResonse } from "../types";
import ReactHtmlParser from "react-html-parser";

interface SnkPropsTypes {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  primaryData: IGetPrimaryDataResonse | any;
}

const Snk: React.FC<SnkPropsTypes> = ({ isOpen, setIsOpen, primaryData }) => {
  const [showFormModal, setShowFormModal] = React.useState(false);

  React.useEffect(() => {
    setShowFormModal(isOpen);
  }, [isOpen]);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
      <div
        className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
          showFormModal ? "translate-y-0" : "translate-y-full"
        }
            ${showFormModal ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
          <button
            onClick={() => {
              setShowFormModal(false);
              setIsOpen(false);
            }}
            className="absolute top-5 right-3 btn btn-ghost btn-circle"
          >
            <HiOutlineXMark className="text-xl font-bold" />
          </button>
          <span className="text-2xl font-bold text-center w-full">
            Kebijakan Privasi
          </span>
        </div>
        <div className="max-h-96 overflow-auto">
          {ReactHtmlParser(primaryData?.snk)}
        </div>
      </div>
    </div>
  );
};

export default Snk;
