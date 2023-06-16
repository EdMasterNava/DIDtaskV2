import React from 'react';
//Page Switcher
import { Route, Routes } from 'react-router-dom';
//Main Pages that will be assigned to specific endpoints 
import Home from './pages/Home';
import JobForm from './pages/JobForm';
import Earn from './pages/Earn';
import WhatsDID from './pages/WhatsDID';
import Navbar from './pages/modules/components/Navbar';
import UpgradeFullDid from './pages/UpgradeFullDid';
import MyCredentials from './pages/MyCredentials';
import MyTasks from './pages/MyTasks';
import MyCtypes from './pages/MyCtypes';
import MyClaims from './pages/MyClaims';

import { EvmProvider } from './pages/modules/components/EvmAuth';
import { KeystoreProvider } from './pages/modules/components/KeyProvider';
import { DidProvider } from './pages/modules/components/DidProvider';
import AppProvider from './pages/modules/components/AppProvider';
import CTypeProvider from './pages/modules/components/CTypeProvider';

function App() {
  return (
    <>
      <KeystoreProvider>
        <DidProvider>
          <AppProvider>
            <CTypeProvider>
              <EvmProvider>
                <Navbar />
                <Routes>
                  <Route path="/DIDtaskV2/" element={<Home />} />
                  <Route path="/job-form" element={<JobForm />} />
                  <Route path="/earn" element={<Earn />} />
                  <Route path="/whatsDID" element={<WhatsDID />} />
                  <Route path="/upgrade" element={<UpgradeFullDid />} />
                  <Route path="/my-credentials" element={<MyCredentials />} />
                  <Route path="/my-tasks" element={<MyTasks />} />
                  <Route path="my-ctypes" element={<MyCtypes />} />
                  <Route path="my-claims" element={<MyClaims />} />
                </Routes>
              </EvmProvider>  
            </CTypeProvider>  
          </AppProvider>
        </DidProvider>
      </KeystoreProvider>
    </>
  );
}

export default App;