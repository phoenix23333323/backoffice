import { AuthProvider } from './features/auth/AuthProvider.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

import Background from './components/Background';
import RoutesComponent from './components/RoutesComponent';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <div className="App">
          <Background />
          <div className="main">
            <RoutesComponent />
          </div>
        </div>
      </Provider>
    </AuthProvider>
  );
}

export default App;
