import { useCallback } from "react";
import ReactGA from "react-ga";

import Config from "../config";

const useGa = () => {
  const { sendAnalytics } = Config;

  const initialise = useCallback(() => {
    if (!sendAnalytics) {
      return;
    }
    ReactGA.initialize("UA-153176648-1", {
      titleCase: false,
    });

    ReactGA.ga("set", "checkProtocolTask", null);
    ReactGA.set({ dimension1: `${chrome.runtime.getManifest().version}` });
  }, [sendAnalytics]);

  const pageview = useCallback((page) => {
    if (!sendAnalytics) {
      return;
    }
    ReactGA.pageview(page);
  }, [sendAnalytics]);

  const event = useCallback(({ action, category, label }) => {
    if (!sendAnalytics) {
      return;
    }
    ReactGA.event({ action, category, label });
  }, [sendAnalytics]);

  return {
    initialise,
    pageview,
    event,
  };
};

export default useGa;
