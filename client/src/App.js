
import {BrowserRouter,Route} from 'react-router-dom';
import CropRecommend from './Components/CropRecommend/CropRecommend';
import Crops from './Components/CropRecommend/Crops';
import GardenLocation from './Components/GgGardenLocation/GardenLocation';
import Main from './Components/Main';
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';
import UserInfo from './Components/User/UserInfo';
import { UserInfoProvider } from './UserInfoContext';

function App() {

  return (
    <div className="App">
      <UserInfoProvider>
          <BrowserRouter>
            <Route path="/" exact component={Main}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/userinfo" component={UserInfo}/>
            <Route path="/gardenlocation" component={GardenLocation}/>
            <Route path="/croprecommend" component={CropRecommend}/>
            <Route path="/crops" component={Crops}/>
          </BrowserRouter>
      </UserInfoProvider>
    </div>
  );
}

export default App;
