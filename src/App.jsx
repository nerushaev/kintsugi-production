import SharedLayout from "./components/Home/SharedLayout/SharedLayout";
import React from "react";
import Loader from "./components/Loader/Loader";
import ScrollManager from './hooks/scrollManager';
import './App.css';
import useAuthCheck from "./hooks/useAuthCheck";
import RoutesComponent from "./components/RoutesComponent/RoutesComponent";


function App() {
  
  const {isRefreshing} = useAuthCheck();

  return (
    <ScrollManager>
      {isRefreshing && <Loader />}
      <SharedLayout>
        <RoutesComponent />
        </SharedLayout>
    </ScrollManager>
  );
}

export default React.memo(App);
