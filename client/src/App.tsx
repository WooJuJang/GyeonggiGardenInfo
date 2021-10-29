
import {BrowserRouter,Route} from 'react-router-dom';
import CropRecommend from './Components/CropRecommend/CropRecommend';
import Crops from './Components/CropRecommend/Crops';
import GardenLocation from './Components/GgGardenLocation/GardenLocation';
import Main from './Components/Main';
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';
import UserInfo from './Components/User/UserInfo';
import TokenError from './Components/Error/TokenError';
import GardenCalendar from './Components/GardenCalendar/GardenCalendar';
import MyGarden from './Components/MyGarden/MyGarden';


const App =()=>{
  return (
    <div className="App">
           <BrowserRouter>
           
             <Route path="/" exact component={Main}/>
            <Route path="/signin" component={Signin}/>
             <Route path="/signup" component={Signup}/>
             <Route path="/userinfo" component={UserInfo}/>
             <Route path="/tokenerror" component={TokenError}/>
             <Route path="/gardenlocation" component={GardenLocation}/>
             <Route path="/croprecommend" component={CropRecommend}/>
             <Route path="/crops" component={Crops}/>
            <Route path="/gardencalendar" component={GardenCalendar}/>
             <Route path="/mygarden" component={MyGarden}/>

           </BrowserRouter>
    </div>
  );
}

export default App;
