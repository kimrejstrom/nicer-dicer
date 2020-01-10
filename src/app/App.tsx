import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navigation } from 'components/Navigation/Navigation';
import { Header } from 'components/Header/Header';
import { Home } from 'pages/Home/Home';
import { About } from 'pages/About/About';
import { Roller } from 'pages/Roller/Roller';

const App: React.FC = () => {
  return (
    <div className={`flex flex-col min-h-screen theme`}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <main className="mb-16 bg-gray-100 text-yellow-100 bg-primary-dark flex-grow">
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
        </main>
        <Navigation />
      </Router>
    </div>
  );
};

export default App;
