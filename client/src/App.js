
import {BrowserRouter,Route} from 'react-router-dom';
import GardenLocation from './Components/GardenLocation';
import Main from './Components/Main';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signin/Signup';
import UserInfo from './Components/UserInfo';

function App() {

  return (
    <div className="App">
          <BrowserRouter>
            <Route path="/" exact component={Main}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/userinfo" component={UserInfo}/>
            <Route path="/gardenlocation" component={GardenLocation}/>
          </BrowserRouter>
    </div>
  );
}

export default App;
