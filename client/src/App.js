import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Container } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import { AppNavbar, Shoppinglist, ItemModal } from './components'
import store from './store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <AppNavbar />
          <Container>
            <ItemModal />
            <Shoppinglist />
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App
