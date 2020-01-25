import React, { useEffect } from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import ttiPolyfill from 'tti-polyfill';
import { useHistory } from 'react-router-dom';

export const initializeGA = () => {
  ReactGA.initialize('UA-156819290-1');

  ttiPolyfill.getFirstConsistentlyInteractive().then(tti => {
    ReactGA.timing({
      category: 'Load Performace',
      variable: 'Time to Interactive',
      value: tti!,
    });
  });

  const callback = (list: PerformanceObserverEntryList) => {
    list.getEntries().forEach((entry: any) => {
      switch (entry.entryType) {
        case 'navigation':
          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Server Latency',
            value: entry.responseStart - entry.requestStart,
          });
          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Download Time',
            value: entry.responseEnd - entry.responseStart,
          });
          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Total app load time',
            value: entry.responseEnd - entry.requestStart,
          });
          break;
        case 'mark':
          ReactGA.timing({
            category: 'App Render Performace',
            variable: entry.name,
            value: entry.duration + 0.01, // Bump, as 0 throws a warning
          });
          break;
        case 'measure':
          ReactGA.timing({
            category: 'App Render Performace',
            variable: entry.name,
            value: entry.duration + 0.01, // Bump, as 0 throws a warning,
          });

          break;
        case 'paint':
          ReactGA.timing({
            category: 'Paint',
            variable: entry.name,
            value: entry.startTime,
          });
          break;
        case 'resource':
          ReactGA.timing({
            category: 'First Meaningful Paint',
            variable: entry.name,
            value: entry.responseEnd,
          });
          break;
        default:
          break;
      }
    });
  };

  var observer = new PerformanceObserver(callback);
  observer.observe({
    entryTypes: ['navigation', 'paint', 'resource', 'mark', 'measure'],
  });
};

const logPageView = (history: any, options: FieldsObject) => {
  history.listen((location: Location) => {
    const page = location.pathname || window.location.pathname;
    ReactGA.set({ page, ...options });
    ReactGA.pageview(page);
  });
};

export const withTracker = (
  WrappedComponent: React.ComponentType<any>,
  options: FieldsObject = {},
) => {
  return (props: any) => {
    const history = useHistory();

    useEffect(() => {
      logPageView(history, options);
    }, [history]);

    return <WrappedComponent {...props} />;
  };
};
