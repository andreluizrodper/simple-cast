import { createContext, useState } from "react";

type routeObj = {
  name: string;
  params?: any;
};

type routeType = {
  route: routeObj;
  setRoute: (route: routeObj) => void;
};

const routeData: routeType = {
  route: { name: "Home" },
  setRoute: (route: routeObj) => route,
};

export const RouteContext = createContext(routeData);

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState<routeObj>(routeData.route);
  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
};
