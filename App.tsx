import { useEffect } from "react";
import { RouteProvider } from "./src/contexts/route";
import mobileAds from "react-native-google-mobile-ads";

import Routes from "./src/Routes";
import { UserProvider } from "./src/contexts/user";
import { PodcastProvider } from "./src/contexts/podcast";

export default function App() {
  useEffect(() => {
    (async () => {
      await mobileAds()
        .initialize()
        .then((res) => console.log(res));
    })();
  }, []);

  return (
    <UserProvider>
      <RouteProvider>
        <PodcastProvider>
          <Routes />
        </PodcastProvider>
      </RouteProvider>
    </UserProvider>
  );
}
