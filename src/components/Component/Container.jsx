import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./smole/Modal";
import PopEntry from "./smole/PopEntry";
import Graph from "./smole/Graph";
import Sleep from "../../assets/sleeping.png";

const Container = ({ data: { photoUrl } }) => {
  const [userExists, setUserExists] = useState(false);
  const [modals, setModals] = useState(false);
  const userExistsFromRedux = useSelector((u) => u.fire.exist);
  const isLoading = !userExistsFromRedux || !userExists;

  const showModals = () => <Modal setModals={(e) => setModals(e)} />;

  useEffect(() => {
    if (userExistsFromRedux) {
      setUserExists(userExistsFromRedux);
    }
  }, [userExistsFromRedux]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <div className="fixed top-6 left-6 ">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white cursor-pointer"
          src={photoUrl}
          alt="logo"
          referrerPolicy="no-referrer"
          onClick={() => setModals(true)}
        />
        {modals && showModals()}
      </div>
      <div className="h-full py-20 px-24 max-lg:px-16 max-md:px-12 flex flex-col items-center justify-evenly">
        <div className="flex items-center gap-4  text-[2.5rem] max-md:text-2xl font-sans font-semibold leading-6 text-gray-900 flex-[0.4] ">
          Daily Sleep Tracker
          <img src={Sleep} alt="Sleep" className="w-16" />
        </div>
        <PopEntry />
        {userExists && <Graph />}

        {isLoading && (
          <div className="flex-[2.5] w-full flex items-center justify-center">
            {!isLoading
              ? "Loading..."
              : "You haven't added any entries yet. You can add one by clicking the button above."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
