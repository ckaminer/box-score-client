import React from 'react'
import ReactDOM from 'react-dom'

import Router from './Router'
import './styles.css'
import '../node_modules/materialize-css/dist/css/materialize.min.css'

const App = () => (
  <Router />
)

const mountNode = document.getElementById('app')
ReactDOM.render(<App />, mountNode)
