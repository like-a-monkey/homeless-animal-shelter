import React from 'react'
import menuList from '../../config/menuList'
import {Menu, Icon } from 'antd'
import {Link, withRouter} from 'react-router-dom'

const { SubMenu } = Menu
class LeftNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  getMenuList = (menuList) => {
    return menuList.map(menu => {
      if(!menu.children) {
        return (<Menu.Item key={menu.key}>
          <Link to={menu.key}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
          </Link>
          </Menu.Item>)
      } else {
        return (<SubMenu key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </span>
          }>  
          {this.getMenuList(menu.children)}
          </SubMenu>)
      }
    }) 
  }
  static getDerivedStateprops() {

  }
  getOpenKeyAndSelected = (url) => {
    const urlArr = url.split('/')
    if(urlArr.length === 3){
      return ['/'+urlArr[1], url]
    } else {
      return [null, url]
    }
  }
  render() {
    const url = this.props.location.pathname
    const [openKey, selectedKey]= this.getOpenKeyAndSelected(url)
    return (
      <div>
        <Menu theme="dark" 
        // '/gather/add'
        selectedKeys={selectedKey}
        // '/gather'
        mode="inline">
        {this.getMenuList(menuList)}
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftNav)