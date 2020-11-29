import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import MainPage from './pages/Main';
import EditorPage from './pages/Editor';
import CreatorPage from './pages/Creator';

export default function Routes() {
    return (
        <BrowserRouter>
          <Switch>
              <Route path="/" exact component={MainPage}/>
              <Route path="/edit" component={EditorPage}/>
              <Route path="/create" component={CreatorPage}/>
          </Switch>
        </BrowserRouter>
    );
}