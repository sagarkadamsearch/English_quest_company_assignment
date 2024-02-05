import logo from './logo.svg';
import './App.css';
import RoutePages from './Pages/RoutePages';
import Navbar from './Components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <RoutePages/>
    </div>
  );
}

export default App;
