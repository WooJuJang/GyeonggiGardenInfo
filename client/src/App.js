
import {BrowserRouter,Route} from 'react-router-dom';
import { AuthProvider } from './Components/Auth/GlobalStates';
import Main from './Components/Main';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signin/Signup';
import { useCookies } from 'react-cookie';
import { setCookies } from './Components/Auth/Auth';


function App() {

  return (
    <div className="App">
          <BrowserRouter>
            <Route path="/" exact component={Main}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
          </BrowserRouter>
    </div>
  );
}

export default App;
