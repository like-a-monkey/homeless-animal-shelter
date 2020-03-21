import React from 'react'
import { Card, Row, Col, Pagination, Drawer, message} from 'antd'
import './home.css'
import {getHomelessAnimals, getSearchAnimals} from '../../api/index'
import {BASE_URL} from '../../config/constant'
import Detail from './detail'
const { Meta } = Card
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum:1,
      animalsList: [],
      renderList: [],
      total:0,
      pages:0,
      loading: true,
      drawerVisible: false,
      selected:0
    }
  }
  componentDidMount() {
    this.getAnimalList()
  }
  getAnimalList = async (pageNum) => {
    const result = await getHomelessAnimals(pageNum)
    const {pages, total, list} = result.data
    this.setState({animalsList:list, total, pages, renderList:list})
  }
  onChange = pageNum => {
    const {animalsList} = this.state
    this.setState({pageNum})
    if(animalsList.length>6){
      this.setState({renderList: animalsList.slice((pageNum-1)*6,pageNum*6)})
    } else {
      this.getAnimalList(pageNum)
    }
  }
  getAnimalCol = (animalsList) => {
    return animalsList.map(animal => {
      return (
      <Col span={5}
      key={animal._id}>
        <Card
        hoverable
        className='home-card'
        style={{width: 230, height: 340}}
        onClick={() => this.handleDrawer(animal)}
        cover={<img 
          className='home-pic'
          alt="animal" 
          src={animal.imgs.length?(animal.imgs[0].indexOf('.')===-1?BASE_URL+`${animal.imgs[0]}.png`:BASE_URL+`${animal.imgs[0]}`):BASE_URL+'default.jpg'}
          />}
        >
          <Meta title={animal.name} description={animal.place} />
        </Card>
      </Col>)
    })
  }
  handleDrawer = (animal) => {
    this.setState({drawerVisible: true, selected: animal})
  }
  handleSearch = async (keyword) => {
    const result = await getSearchAnimals(keyword)
    console.log(result)
    if(result.data.length) {
      this.setState({
        animalsList: result.data, 
        drawerVisible: false, 
        total: result.data.length, 
        pageNum: 1, 
        renderList: result.data
      })
    } else {
      message.info('好像没有你想要的呢?试试换个关键词?')
    }
  }
  getAnimalRow = (animalsList) => {
    const newAnimalsList = animalsList.slice(0, 6)
    const num = newAnimalsList.length
    if(num>3){
      return (<>
      <Row gutter={[40, 40]} type="flex" justify="start">
      {this.getAnimalCol(newAnimalsList.slice(0,3))}
      </Row>
      <Row gutter={[40, 40]} type="flex" justify="start">
      {this.getAnimalCol(newAnimalsList.slice(3))}
      </Row></>)
    } else {
      return (<Row gutter={[40, 40]} type="flex" justify="start">
      {this.getAnimalCol(newAnimalsList.slice(0))}
      </Row>)
    }
    
  }

  render() { 
    const {total, selected, renderList} = this.state
    return <div className='overview'>   
     {renderList.lenth || this.getAnimalRow(renderList)}
     {total?(<Pagination 
      className='home-pagination'
      pageSize={6}
      total={total}
      current={this.state.pageNum} onChange={this.onChange}  />):null}
      <Drawer
          width={600}
          placement="right"
          closable={false}
          onClose={() =>  this.setState({drawerVisible: false})}
          visible={this.state.drawerVisible}
        >
          <Detail animal={selected} handleSearch={this.handleSearch}></Detail>
        </Drawer>  
    </div>
  }
}