import './App.css';

import { Navbar } from './pages/Navbar';
import { Routes, Route } from 'react-router-dom';
import { About } from './pages/About'
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Footer } from './pages/Footer';
import { ForgotPassword } from './components/ForgotPassword'
import { Services } from './pages/Services'
import {ViewImage} from './components/ViewImage'
// import { RoleAPI } from './components/RoleAPI'
// import { ChildScheduleAPI } from './components/ChildScheduleAPI';
// import { VisitorCategoryAPI } from './components/VisitorCategoryAPI'
// import { DeliverableAPI } from './components/DeliverableAPI';
// import {SecurityGuardAPI} from './components/SecurityGuardAPI'
// import { MemberAPI } from './components/MemberAPI';
// import { VehicleAPI } from './components/VehicleAPI';
// import {SecurityGuardAttendanceAPI} from './components/SecurityGuardAttendanceAPI'
// import {VisitorAPI} from './components/VisitorAPI'
// import {HouseAPI} from './components/HouseAPI'
// import { UserAPI } from './components/UserAPI';
import { ListMembersAPI } from './components/ListMembersAPI';
import { Profile } from './components/Profile';
import {VisitorForm} from './components/VisitorForm'
import {VehicleForm} from './components/VehicleForm'
import {ChildScheduleForm} from './components/ChildScheduleForm'
import {ListVisitorsAPI} from './components/ListVisitorsAPI'
import { UpdateForm } from './components/UpdateForm';

function App() {

  return (
    <div>

      <Navbar />
      
      <Home />
     
      {/* <RoleAPI />
      <ChildScheduleAPI />
      <VisitorCategoryAPI />
      <DeliverableAPI/>
      <SecurityGuardAPI />
      <MemberAPI/>
      <VehicleAPI/>
      <SecurityGuardAttendanceAPI />
      <VisitorAPI />
      <HouseAPI />
      <UserAPI/> */}

      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<SignupForm />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path='/listmembers' element={<ListMembersAPI/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path="/addvisitor" element={<VisitorForm />}></Route>
        <Route path="/addvehicle" element={<VehicleForm />}></Route>
        <Route path="/childschedule" element={<ChildScheduleForm />}></Route>
        <Route path='/listvisitors' element={<ListVisitorsAPI/>}></Route>
        <Route path='listmembers/update/:id1/:id2' element={<UpdateForm/>}></Route>
        
        <Route path="/viewimage" element={<ViewImage />}></Route>
      </Routes>
      <Footer />

    </div>
  );
}

export default App;