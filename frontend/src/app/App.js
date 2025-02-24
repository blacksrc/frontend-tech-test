import React from 'react';
import loadable from '@loadable/component';
import Loading from './components/Loading';
import Header from './components/Header';
import './assets/stylesheets/app.scss';

// This is do to lazy loading effect while components are mounting in react router
const MainComponents = loadable(() => import('./RoutesLoader'), {
  fallback: <Loading />
});

const App = () => {
  return (
    <main className="main-wrapper">
      <Header />
      <MainComponents />
    </main>
  );
};

export default App;
