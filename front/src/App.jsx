import useInterceptorsAxiosPrivate from './hooks/useInterceptorsAxiosPrivate';

import Background from './components/Background';
import RoutesComponent from './components/RoutesComponent';

const App = () => {
  const interceptorsAxiosPrivate = useInterceptorsAxiosPrivate();

  return (
    <div className="App">
      <Background />
      <div className="main">
        <RoutesComponent />
      </div>
    </div>
  );
};

export default App;
