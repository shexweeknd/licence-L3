import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router}/>
      </header>
    </div>
  );
}

export default App;
