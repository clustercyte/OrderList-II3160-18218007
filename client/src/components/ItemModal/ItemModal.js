import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import styles from './ItemModal.module.css'
import { connect } from 'react-redux'
import { addItems } from '../../actions/itemActions'
import PropTypes from 'prop-types'

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }

  static propTypes = {
    isAuth: PropTypes.bool
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
      name: this.state.name
    }

    this.props.addItems(newItem)
    this.toggle()
  }

  render () {
    return (
      <div>
        {this.props.isAuth ? (
          <Button
            color='dark'
            className={styles.addButton}
            onClick={this.toggle}
          >
            Tambah Pesanan
          </Button>
        ) : (
          <h4 className='mb-3 ml-4'> Login untuk menambahkan pesanan</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Menambahkan pesanan</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Pesanan</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Masukkan nama pesanan...'
                  onChange={this.onChange}
                />
                <Button color='dark' className={styles.modalAdd} block>
                  Tambah pesanan
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { addItems })(ItemModal)
