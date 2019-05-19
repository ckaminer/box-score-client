import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Boxscore from './components/boxscore/Boxscore'
import Dashboard from './components/dashboard/Dashboard'

const Router = () => (
  <BrowserRouter>
    <div className="app-container">
      <main>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/boxscore" component={Boxscore} />
          <Route><div>404</div></Route>
        </Switch>
      </main>
    </div>
  </BrowserRouter>
)

export default Router
