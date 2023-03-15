import React from "react";
import PropTypes from "prop-types";

import LogOut from "../../../assets/logout.png";
import notTrue from "../../../assets/notTrue.png";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/auth-slice";

const Modal = ({ setModals }) => {
  const handleClose = () => {
    setModals(false);
  };
  const dispatch = useDispatch();

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform  rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[20rem]">
            <div className="absolute top-3 right-2 z-10" onClick={handleClose}>
              <img src={notTrue} alt="close" className="w-6 cursor-pointer" />
            </div>
            <div className="bg-fore drop-shadow-4xl flex items-center justify-evenly rounded px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
              <img
                src={LogOut}
                alt="logout"
                className="w-14 cursor-pointer"
                onClick={() => {
                  dispatch(logout());
                }}
              />
              <div className="text-xl font-semibold leading-6 text-gray-900">
                See you later
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
