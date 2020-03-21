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
      <div>
        <img src={require('../../assets/new.jpg')} alt='logo' className='logo'></img>
      </div>
    )
  }
}