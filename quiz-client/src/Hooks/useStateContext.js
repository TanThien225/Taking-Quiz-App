import React, { createContext, useContext, useEffect, useState } from "react";

//---Context API--
export const stateContext = createContext();

const getFreshContext = () => {
  //local rong thi tao moi
  if (localStorage.getItem("context") === null) {
    localStorage.setItem(
      "context",
      JSON.stringify({
        testerId: 0,
        timeSpend: 0,
        selectedOption: [],
      })
    );
  }
  return JSON.parse(localStorage.getItem("context"));
};

export default function useStateContext() {
  const { context, setContext } = useContext(stateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
    //   setContext({...context,timeSpend: 1,}); khong can nua vi da dinh nghia setContext moi ben useStateCOntext khoong can destructuring nhieu lan ch can
    //   setContext({ timeSpend: 1 });
    resetContext: () => {
      localStorage.removeItem("context");
      setContext(getFreshContext());
    },
  };
}

export function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());
  //khi context thay doi thi setCOntext thuc thi chung ta cungx phai cap nhat laij trong localstorage
  //moi khi change trong context, call back function thu 1 se duoc invoke
  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(context));
  }, [context]);
  return (
    <stateContext.Provider value={{ context, setContext }}>
      {children}
    </stateContext.Provider>
  );
}
