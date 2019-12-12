import ReactGA from "react-ga";

import Config from "./config";

const initialise = () => {
  ReactGA.initialize("UA-153176648-1", {
    titleCase: false,
  });

  ReactGA.ga("set", "checkProtocolTask", null);
  ReactGA.set({ dimension1: `${chrome.runtime.getManifest().version}` });
};

/**
 * 
 * @param {string} page 
 */
const pageview = (page) => {
  ReactGA.pageview(page);
}

/**
 * 
 * @param {{action: string, category: string, label: string}} event 
 */
const event = ({ action, category, label }) => {
  ReactGA.event({ action, category, label });
};

const exported = {
  initialise,
  pageview,
  event,
};

export default Object.keys(exported).reduce((methods, methodName) => {
  const { sendAnalytics } = Config;
  return { ...methods, [methodName]: sendAnalytics ? exported[methodName] : () => { } }
}, {});
