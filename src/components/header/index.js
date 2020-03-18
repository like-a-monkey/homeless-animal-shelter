import React from 'react'
import './header.css'
export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className='header'>
      <img src={require('../../assets/new.jpg')} alt='logo' className='logo'></img>
      </div>
    )
  }
}