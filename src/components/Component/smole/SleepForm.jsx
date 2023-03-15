import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import moment from "moment";
import Alert from "@mui/material/Alert";

const GetDuration = (day, sleep, wakeUp) => {
  const sleepTime = new Date(`${day}T${sleep}:00`);
  const wakeUpTime = new Date(`${day}T${wakeUp}:00`);
  let sleepDuration =
    Math.abs(wakeUpTime.getTime() - sleepTime.getTime()) / 1000 / 60 / 60;
  sleepDuration = sleepDuration.toFixed(2);
  return sleepDuration;
};

const SleepForm = () => {
  const Day = moment().format("yyyy-MM-D");
  const Hours = moment().format("HH:mm");
  const [day, setDay] = useState(Day);
  const [sleep, setSleep] = useState(Hours);
  const [wakeUp, setWakeUp] = useState("01:25");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const user = useSelector((e) => e.user.user);

  const handleReset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDay(Day);
    setSleep(Hours);
    setWakeUp("01:25");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    const newSleepData = {
      id: user.uid,
      day: day,
      sleep_Time: sleep,
      wakeUp_Time: wakeUp,
      sleep_Duration: GetDuration(day, sleep, wakeUp),
    };

    console.log(newSleepData);
    const updatedUserData = {
      user: Array.isArray(userData?.user)
        ? [...userData.user, newSleepData]
        : [newSleepData],
    };

    await setDoc(userRef, updatedUserData)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
      setError(false);
    }, 5000);
  }, [error, success]);

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="relative md:grid md:grid-cols-3 md:gap-6">
          <div className="top-6 left-6 cursor-pointer text-center">
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={user?.photoUrl}
              alt="logo"
              referrerPolicy="no-referrer"
              onClick={() => setModals(true)}
            />
          </div>
          <div className="w-full">
            <h1>{user?.displayName}</h1>
          </div>
          <div className="mt-5 md:col-span-3 md:mt-0">
            <form onSubmit={handleSubmit} action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="first-name"
                        className="flex justify-between space-x-2 text-sm font-medium leading-6 text-gray-900"
                      >
                        Select the date
                      </label>
                      <input
                        type="date"
                        name="sleep-day"
                        id="sleep-day"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="time-you-sleep"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        What time did you sleep?
                      </label>
                      <input
                        type="time"
                        name="time-sleep"
                        id="time-sleep"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                        value={sleep}
                        onChange={(e) => setSleep(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="time-you-wakeUp"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        What time did you sleep?
                      </label>
                      <input
                        type="time"
                        name="time-wakeUp"
                        id="time-wakeUp"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                        value={wakeUp}
                        onChange={(e) => setWakeUp(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {loading ? (
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-evenly sm:px-6">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-evenly sm:px-6">
                    <button
                      onClick={handleReset}
                      className="inline-flex justify-center rounded-md bg-fore py-2 px-8 text-sm font-semibold text-white shadow-sm hover:bg-[#50555a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-one py-2 px-8 text-sm font-semibold text-white shadow-sm hover:bg-[#0065fc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        {success && (
          <Alert severity="success">Data sending successful! 🎉</Alert>
        )}
        {error && (
          <Alert severity="error">Sorry! there are some problems</Alert>
        )}
      </div>
    </>
  );
};

export default SleepForm;
