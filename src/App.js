//redux
import { useEffect } from 'react';
import { Provider } from 'react-redux'
import store from './redux/store';
//components
import Home from './components/Home';
import NavBar from './components/NavBar';




function App() {
  useEffect(() => {
 
  }, []); 
  return (
    <Provider
      store={store}
    >
      <Home />
      <NavBar />
    </Provider>
  );
}

export default App;
