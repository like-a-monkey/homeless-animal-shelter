import React from 'react'
import {Layout} from 'antd'
import LeftNav from '../../components/left-nav/left-nav'
import Head from '../../components/header'
import {Route, Switch} from 'react-router-dom'
import Home from '../../pages/home/home'
import Adopt from '../../pages/adopt/adopt'
import Add from '../../pages/gather/add'
import Correct from '../../pages/gather/correct'
import Contribute from '../../pages/contribute/contribute'
import Comment from '../../pages/interact/commentPage'
import Opinion from '../../pages/interact/opinion'
const { 
  Header, 
  Content, 
  Footer, 
  Sider 
} = Layout
export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
        <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, minHeight:100 }} >
            <Head></Head>
          </Header>
          <Content 
          style={{ margin: '0 16px'}}>
            <Switch>
            <Route path='/gather/correct' component={Correct}/>
            <Route path='/gather/add' component={Add}/>
            <Route path='/adopt' component={Adopt}/>
            <Route path='/contribute' component={Contribute}/>
            <Route path='/interact/comment' component={Comment}/>
            <Route path='/interact/opinion' component={Opinion}/>
            <Route path='/' component={Home}/>
            </Switch>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff'}}>Bill is a cat.</div> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>chat us at 839361598@qq.com</Footer>
        </Layout>
      </Layout>
    )
  }
}
