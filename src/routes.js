import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import MainPage from './pages/Main';
import EditorPage from './pages/Editor';

export default function Routes() {
    return (
        <BrowserRouter>
          <Switch>
              <Route path="/" exact component={MainPage}/>
              <Route path="/edit" component={EditorPage}/>
          </Switch>
        </BrowserRouter>
    );
}