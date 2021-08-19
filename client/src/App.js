
import {BrowserRouter,Route} from 'react-router-dom';
import GardenLocation from './Components/GgGardenLocation/GardenLocation';
import Main from './Components/Main';
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';
import UserInfo from './Components/User/UserInfo';

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
