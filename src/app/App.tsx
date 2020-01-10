import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Home } from 'pages/Home/Home';
import { About } from 'pages/About/About';

const App: React.FC = () => {
  return (
    <div className={`flex flex-col min-h-screen theme`}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <main className="mb-20 bg-gray-100 text-yellow-100 bg-primary-dark flex-grow">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
        <Header />
      </Router>
    </div>
  );
};

export default App;
