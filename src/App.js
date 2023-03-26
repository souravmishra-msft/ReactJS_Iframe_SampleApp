import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import IframeChild from './components/IframeChild';
import IframeParent from './components/IframeParent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/iframe/' element={<IframeParent />} />
          <Route path='/iframe-child/' element={<IframeChild />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
