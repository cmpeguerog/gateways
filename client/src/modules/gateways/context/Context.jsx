import React, {
  memo,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useReducer,
} from "react";

const Context = createContext(null);

export const useGateways = function () {
  return useContext(Context);
};

const Layout = ({children}) => {
  const context = useGateways();
  return typeof children === "function"
    ? children(context)
    : children;
};

const GatewaysProvider = function ({children}) {
  const value = useMemo(
    () => ({
      filters: { name: "" },
      gateways: [],
      create: false,
      fetch: true,
    }),
    []
  );

  const updater = useCallback(
    (state, value) => ({
      ...state,
      ...value,
    }),
    []
  );

  const [state, updateGatewaysCtx] = useReducer(
    updater,
    value,
    undefined
  );

  return (
    <Context.Provider value={{...state, updateGatewaysCtx}}>
      <Layout>{children}</Layout>
    </Context.Provider>
  );
};

export default memo(GatewaysProvider);
