import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import SignupButton from "./Signup/SignupButton";
import Sleeping from "../assets/sleeping.png";
import ReactLoading from "react-loading";
import Container from "./Component/Container";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/auth-slice";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { UserExists } from "../features/data/FireStore";

const Components = () => {
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((u) => u.user.user);
  const userId = data?.uid;

  useEffect(() => {
    setLoading(true);
    setError(null);
    onAuthStateChanged(
      auth,
      (user) => {
        setLoading(false);
        if (user) {
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoURL,
            }),
          );
        } else {
          dispatch(logout());
        }
      },
      setError,
    );
  }, [dispatch]);

  const checkUserExists = async () => {
    //! const querySnapshot = await getDocs(collection(db, "users"));
    //! console.log(
    //!   querySnapshot.docs.map((doc) => doc.id).filter((d) => d === userId),
    //! );
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);
    const userExists = querySnapshot.docs.some((doc) => doc.id === userId);
    if (userExists) {
      console.log("User exists!");
      dispatch(UserExists(true));
    } else {
      console.log("User does not exist!");
      dispatch(UserExists(false));
      // Create a new user document
    }

    onSnapshot(usersCollection, (snapshot) => {
      const userExists = snapshot.docs.some((doc) => doc.id === userId);
      if (userExists) {
        console.log("User exists!");
        dispatch(UserExists(true));
      } else {
        console.log("User does not exist!");
        dispatch(UserExists(false));
        // Create a new user document
      }
    });
  };

  useEffect(() => {
    if (userId) {
      checkUserExists();
    }
  }, [userId]);

  return (
    <>
      {loading && (
        <ReactLoading
          type="spinningBubbles"
          color="#5696f6"
          height="8%"
          width="8%"
        />
      )}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && (
        <>
          {data ? (
            <Container data={data} />
          ) : (
            <div className="flex flex-col items-center gap-10">
              <div className="text-3xl flex items-center gap-8">
                <span className="">Sleep Tracker </span>
                <img src={Sleeping} alt="Sleeping" className="w-14" />
              </div>
              <SignupButton />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Components;
