import logo from './logo.svg';
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
function App() {
  return (
    <div className=" ">
      <Navbar></Navbar>
      <Home></Home>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
