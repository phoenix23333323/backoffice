import RoutesComponent from './components/RoutesComponent';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RoutesComponent />
      </div>
    </Provider>
  );
}

export default App;
