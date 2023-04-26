import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SecurityContainer from './components/Security/SecurityContainer';
import CEIsContainer from './components/CEI/CEIsContainer';
import './styles.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import { useCallback, useState } from 'react';
import BlankContainer from './components/Security/BlankContainer';

export default function App() {
  const [client, setClient] = useState("");
  const handleSearch = useCallback((inputStr) => {
    console.log(inputStr);
    setClient(inputStr);
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Search onEnter={handleSearch} classNames="mb-2" />
      {client &&
        (<>
          <SecurityContainer client={client} />
          <CEIsContainer client={client} order={"9"} />
        </>)
        // :(<BlankContainer />)
      }
      {/* <Routes>
        <Route path="/" element={<SecurityContainer />} />
      </Routes> */}
    </BrowserRouter>
  );
}
