import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import SleepForm from "./SleepForm";

import Close from "../../../assets/notTrue.png";

const PopEntry = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex-[0.5] flex items-center">
        <button
          type="button"
          onClick={openModal}
          className=" flex items-center gap-3 rounded-full bg-one text-3xl px-7 py-3 font-medium text-white hover:bg-[#0065fc] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <AiOutlinePlus size="1.2em" />
          New Entry
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    className="inline-block fixed right-5 top-5 z-10"
                    onClick={closeModal}
                  >
                    <img src={Close} alt="close" className="w-6" />
                  </button>
                  <SleepForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default PopEntry;
