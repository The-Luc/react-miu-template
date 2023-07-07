import { useState } from 'react';
import './App.css';
import SignInSide from './templates/sign-in-side/SignInSide';
import Dashboard from './templates/dashboard/Dashboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
