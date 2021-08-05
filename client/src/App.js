
import {BrowserRouter,Route} from 'react-router-dom';
import Main from './Components/Main';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signin/Signup';
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
