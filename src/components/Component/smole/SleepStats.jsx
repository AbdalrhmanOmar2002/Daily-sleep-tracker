import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const checkData = (data) => {
  if (data?.length <= 7) {
    for (let i = 0; (i = 7 - data.length); i++) {
      data.push("00:00");
    }
    return data;
  }
};

const SleepStats = ({ user }) => {
  const [timeSleep, setTimeSleep] = useState(null);
  const [timeWakeUp, setTimeWakeUp] = useState(null);
  const [SleepDur, setSleepDur] = useState(null);
  const [date, setDate] = useState(null);

  const getData = async () => {
    const sleepTimes = user?.user?.map((c) => c.sleep_Time);
    checkData(sleepTimes);

    const WakeUpTimer = user?.user?.map((c) => c.wakeUp_Time);
    checkData(WakeUpTimer);

    const duration = user?.user?.map((c) => c.sleep_Duration);
    checkData(duration);

    const date = user?.user?.map((c) => c.day.substring(5));
    checkData(date);
    // const lastDateUse = date[date.length - 1];

    setTimeSleep(sleepTimes);
    setTimeWakeUp(WakeUpTimer);
    setSleepDur(duration);
    setDate(date);
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <div className="basis-1/2 flex flex-col ">
      <p className="text-3xl">Sleep Stats</p>
      <div className="flex justify-between gap-0 max-xl:hidden">
        <div className="px-8 "></div>
        <div className=" text-fore text-lg leading-[3rem] whitespace-nowrap ">
          Time of sleep
        </div>
        <div className=" text-fore text-lg leading-[3rem] whitespace-nowrap">
          Wake up time
        </div>
        <div className=" text-fore text-lg leading-[3rem] whitespace-nowrap">
          Sleep duration
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex-[0.16] flex flex-col pt-1 items-center justify-evenly gap-2">
          {date?.map((e, i) => (
            <div key={i} className=" text-fore text-lg">
              {e}
            </div>
          ))}
        </div>
        <div className="flex-1 bg-tow rounded-2xl p-4 grid grid-cols-3 gap-4">
          <div className="grid grid-rows-7 text-center gap-4">
            {timeSleep?.map((e, i) => (
              <div key={i} className=" text-fore text-lg">
                {e}
              </div>
            ))}
          </div>
          <div className="grid grid-rows-6 text-center gap-4">
            {timeWakeUp?.map((e, i) => (
              <div key={i} className=" text-fore text-lg">
                {e}
              </div>
            ))}
          </div>
          <div className="grid grid-rows-6 text-center gap-4">
            {SleepDur?.map((e, i) => (
              <div key={i} className=" text-fore text-lg">
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepStats;
