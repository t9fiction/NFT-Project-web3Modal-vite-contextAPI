import { Install } from './components/Install';
import Home from './components/Home';
import {GlobalStore} from './context/GlobalState'
import Disconnect from './components/Disconnect';

function App() {
  const { getModalConnect } = GlobalStore();
  if (window.ethereum) {
    return(
      <div>
      <button onClick={()=>getModalConnect()}>Connect Wallet</button>
      <Disconnect />
      <Home />
      </div>
      )
  } else {
    return <Install />
  }
}

export default App;