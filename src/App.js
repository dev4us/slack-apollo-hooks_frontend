import React from "react";
import useStore from "./Store/useStore";
import ChannelList from "./Components/ChannelList";

const App = () => {
  const { store, setStore } = useStore();

  return (
    <>
      <ChannelList store={store} setStore={setStore} />
    </>
  );
};

export default App;
