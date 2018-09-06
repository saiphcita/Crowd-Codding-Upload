import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import InterfaceBosses from '../Page/InterfaceBosses.js';
import FirstInterface from '../Page/FirstInterface.js';

export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {FirstInterface} />
        <Route path="/interface1" component= {InterfaceBosses} />
        <Route path="/interface2" component= {InterfaceBosses} />
        <Route path="/interface3" component= {InterfaceBosses} />
        <Route path="/interface4" component= {InterfaceBosses} />
      </Switch>
    </BrowserRouter>
  );
