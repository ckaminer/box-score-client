import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './components/dashboard/Dashboard'

const Router = (props) => {
  const { activeLeague } = props
  return (
    <BrowserRouter>
      <div className="app-container">
        <main>
          <Switch>
            <Route exact path="/" render={() => (<Dashboard activeLeague={activeLeague} />)} />
            <Route><div>404</div></Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
}

Router.propTypes = {
  activeLeague: PropTypes.string,
}

Router.defaultProps = {
  activeLeague: 'NBA',
}

export default Router
