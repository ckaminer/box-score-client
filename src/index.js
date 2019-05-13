import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './styles.css'

const App = ({ name }) => (
  <div>
    Hello
    { name }
  </div>
)

App.propTypes = {
  name: PropTypes.string,
}

App.defaultProps = {
  name: 'Charlie',
}

const mountNode = document.getElementById('app')
ReactDOM.render(<App name="Jane" />, mountNode)
