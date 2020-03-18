import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './home'
import Detail from './detail'

export default class HomeWrap extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <Switch>
          <Route path='/home' component={Home}/>
      </Switch>
    )
  }  
}