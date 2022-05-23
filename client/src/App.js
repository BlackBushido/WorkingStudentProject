import React from 'react';
import {Container} from '@material-ui/core';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {GoogleOAuthProvider} from "@react-oauth/google";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
    return(
        <GoogleOAuthProvider clientId="97723876179-lt0hkkmu6sg1bejjc5p8uve2fgit9c39.apps.googleusercontent.com">
      <BrowserRouter>
          <Container maxidth="lg">
              <Navbar/>
              <Routes>
                  <Route exact path="/"  element={<Home/>} />
                  <Route exact path="/auth" element={<Auth/>} />
              </Routes>
          </Container>
      </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;