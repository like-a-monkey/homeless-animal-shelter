import React from 'react'
import {Tooltip} from 'antd'
import {BASE_URL} from '../../config/constant'
import './index.css'
export default class Contribute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return <div className='pay'>
        <Tooltip placement="top" title='涓滴之水成海洋'>
          <img alt='wechat' src={BASE_URL+'wechat.jpg'}></img>
        </Tooltip>
        <Tooltip placement="top" title='颗颗爱心变希望'>
          <img alt='alipay' src={BASE_URL+'alipay.jpg'}></img>
        </Tooltip>
    </div>
  }
}