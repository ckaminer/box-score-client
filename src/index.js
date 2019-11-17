import React from 'react'
import ReactDOM from 'react-dom'

import Router from './Router'
import Navbar from './components/navbar/Navbar'
import './styles.css'
import '../node_modules/materialize-css/dist/css/materialize.min.css'

const App = () => (
  <div>
    <Navbar />
    <Router />
  </div>
)

const mountNode = document.getElementById('app')
ReactDOM.render(<App />, mountNode)
