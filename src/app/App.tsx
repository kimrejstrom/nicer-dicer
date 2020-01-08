import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Home } from 'pages/Home/Home';
import { About } from 'pages/About/About';
import { Footer } from 'components/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { ThemeMode } from 'features/theme/themeSlice';

const App: React.FC = () => {
  // Get theme from Redux
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <div
      className={`theme ${
        theme === ThemeMode.LIGHT ? 'mode-light' : 'mode-dark'
      }`}
    >
      <Router>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <main className="bg-gray-100 dark:text-yellow-100 dark:bg-primary-dark flex-grow">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
