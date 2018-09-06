import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import MainInterface from '../Page/MainInterface.js';
import ChooseInterface from '../Page/Choose-Interface.js';

export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {ChooseInterface} />
        <Route path="/interface1" component= {MainInterface} />
        <Route path="/interface2" component= {MainInterface} />
        <Route path="/interface3" component= {MainInterface} />
        <Route path="/interface4" component= {MainInterface} />
      </Switch>
    </BrowserRouter>
  );
