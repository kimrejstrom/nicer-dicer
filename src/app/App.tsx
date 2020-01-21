import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navigation } from 'components/Navigation/Navigation';
import { Header } from 'components/Header/Header';
import { Home } from 'pages/Home/Home';
import { About } from 'pages/About/About';
import { Roller } from 'pages/Roller/Roller';
import { useServiceWorker, IServiceWorkerContext } from 'useServiceWorker';
import Button from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';

const App: React.FC = () => {
  const {
    isUpdateAvailable,
    updateAssets,
  } = useServiceWorker() as IServiceWorkerContext;

  // Get modal state
  const { title, content } = useSelector(
    (state: RootState) => state.modalVisibility,
  );

  return (
    <div className={`flex flex-col min-h-screen theme`}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <main className="mb-20 bg-gray-100 text-yellow-100 bg-primary-dark flex-grow">
          {isUpdateAvailable && (
            <div className="fixed w-full bottom-0 mb-20">
              <div
                className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none flex justify-center items-center"
                role="alert"
              >
                <span className="flex rounded-full bg-primary-dark px-2 py-1 text-xs font-bold mr-3">
                  New
                </span>
                <div>
                  A new version is available
                  <Button
                    className="hover:bg-primary-dark bg-secondary-dark text-yellow-100 py-1 px-2 border border-yellow-600 rounded ml-4"
                    onClick={updateAssets}
                    title="Update now"
                  />
                </div>
              </div>
            </div>
          )}
          <Header />
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/roller">
              <Roller />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Modal title={title} content={content} />
        </main>
        <Navigation />
      </Router>
    </div>
  );
};

export default App;
