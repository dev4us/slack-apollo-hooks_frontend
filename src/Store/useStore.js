import { useState } from "react";

const useStore = () => {
  const [store, setStore] = useState({ selectedChannelId: 1 });

  return {
    store,
    setStore
  };
};

export default useStore;
