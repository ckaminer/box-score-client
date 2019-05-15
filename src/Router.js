import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Boxscore from './boxscore/Boxscore'

const Router = () => (
  <BrowserRouter>
    <div>
      <main>
        <Switch>
          <Route component={Boxscore} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
)

export default Router
