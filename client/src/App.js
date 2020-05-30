import React, { Component } from "react";
import { Provider } from "react-redux";
import { Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import { AppNavbar, Shoppinglist, ItemModal } from "./components";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
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
    );
  }
}

export default App;
