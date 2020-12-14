import React, { Component } from 'react'
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './styles/main.module.css'
import fade from './styles/fade.module.css'
import { connect } from 'react-redux'
import { getItems, deleteItems, editItems } from '../../actions/itemActions'
import PropTypes from 'prop-types'
import GoogleLogin from 'react-google-login'
import { client_id } from '../../config'
import { login, logout } from '../../actions/authActions'
import { GoogleLogout } from 'react-google-login'

class Shoppinglist extends Component {
  static protoTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuth: PropTypes.bool
  }

  state = {
    modal: false,
    name: '',
    id: null
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const newItem = {
      name: this.state.name,
      id: this.state.id
    }

    this.props.editItems(newItem)
    this.toggle()
  }

  componentDidMount () {
    this.props.getItems()
  }

  onDeleteClick = id => {
    this.props.deleteItems(id)
  }

  onEditClick = (id, name) => {
    this.setState({ modal: true, name, id })
  }

  responseGoogle = res => {
    console.log(res)
    this.props.login({ token: res.tokenId })
  }

  logoutHandler = () => {
    this.props.logout()
  }

  render () {
    const { items } = this.props.item
    return (
      <Container>
        {this.props.isAuth ? (
          <GoogleLogout
            clientId={client_id}
            buttonText='Logout'
            onLogoutSuccess={this.logoutHandler}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            clientId={client_id}
            buttonText='Login'
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        )}
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames={fade}>
                <ListGroupItem>
                  {this.props.isAuth ? (
                    <Button
                      className={styles.removeBtn}
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                  {this.props.isAuth ? (
                    <Button
                      className={styles.removeBtn}
                      color='primary'
                      size='sm'
                      onClick={this.onEditClick.bind(this, _id, name)}
                    >
                      Edit
                    </Button>
                  ) : null}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Pesanan</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Pesanan</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  value={this.name}
                  placeholder='Masukkan nama pesanan...'
                  onChange={this.onChange}
                />
                <Button color='dark' className={styles.modalAdd} block>
                  Edit Pesanan
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
  getItems,
  deleteItems,
  editItems,
  login,
  logout
})(Shoppinglist)
