import React, { useEffect, useRef, useState } from "react";
import SleepStats from "./SleepStats";
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Line } from "react-chartjs-2";

const Graph = () => {
  const [userData, setUserData] = useState(null);
  const user = useSelector((u) => u.user.user);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sleep Duration",
      },
    },
  };
  const labels = userData?.user?.map(({ day }) => day?.substring(5));
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: userData?.user?.map(({ sleep_Duration }) => sleep_Duration),
        borderColor: "rgb(109, 166, 248)",
        backgroundColor: "rgb(238, 244, 254)",
      },
    ],
  };

  const getData = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const city = docSnap.data();
        setUserData(city);
      } else {
        console.log("No such document!");
      }
    });
  };
  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);
  return (
    <div className="flex-[2.5] w-full flex items-center justify-center gap-16 max-md::gap-0 ">
      <div className="basis-1/2 flex flex-col ">
        <p className="text-3xl">Sleep Stats</p>
        <Line data={data} options={options} />
      </div>
      <SleepStats user={userData} options={options} />
    </div>
  );
};

export default Graph;
