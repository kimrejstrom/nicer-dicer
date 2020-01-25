import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navigation } from 'components/Navigation/Navigation';
import { Header } from 'components/Header/Header';
import { Home } from 'pages/Home/Home';
import { Info } from 'pages/Info/Info';
import { Roller } from 'pages/Roller/Roller';
import { Modal } from 'components/Modal/Modal';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { withTracker, initializeGA } from 'utils/analyticsTracker';
import { About } from 'pages/About/About';
import { UpdateNotification } from 'components/UpdateNotification/UpdateNotification';

// Google Analytics
initializeGA();

const App: React.FC = () => {
  // Global Modal state
  const { title, content } = useSelector(
    (state: RootState) => state.modalVisibility,
  );

  return (
    <div className="flex flex-col min-h-screen theme desktop-bg">
      <div className="m-auto bg-primary-dark w-full max-w-lg shadow-xxl relative min-h-screen">
        <Router>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <main className="mb-20 bg-gray-100 text-yellow-100 bg-primary-dark flex-grow">
            <UpdateNotification />
            <Header />
            <Switch>
              <Route path="/info" component={withTracker(Info)} />
              <Route path="/about" component={withTracker(About)} />
              <Route path="/roller" component={withTracker(Roller)} />
              <Route path="/" component={withTracker(Home)} />
            </Switch>
            <Modal title={title} content={content} />
          </main>
          <Navigation />
        </Router>
      </div>
    </div>
  );
};

export default App;
