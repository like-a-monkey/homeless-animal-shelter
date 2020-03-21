import React from 'react'
import {
  Card, 
  List, 
  Carousel, 
  Input, 
  Tag, 
  Button
} from 'antd'
import {withRouter} from 'react-router-dom'
import {BASE_URL} from '../../config/constant'
import './detail.css'
const {Item} = List
const {Search} = Input
class Detail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }
    this.stateHash = ['流浪中', '被领养', '失踪', '已死亡']
  }
  render() {
    const selectedAnimal = this.props.animal || {}
    console.log(selectedAnimal)
    const title = (<Search 
      placeholder="不是理想类型?搜索一下说不定会遇上对的它呢" 
      onSearch={keyword => this.props.handleSearch(keyword)}
      style={{width:380}} 
      enterButton />)
    return (<>
    <Card title={title}> 
    <Carousel 
    className='detail-carousel'
    effect="fade" style={{width:230,}} autoplay>
    {selectedAnimal.imgs.length?selectedAnimal.imgs.map(img => {
    return <img key={img}
    alt='animalPic'
    src={img.indexOf('.')===-1?BASE_URL+img+'.png':BASE_URL+img}
    />}):<img alt='default_pic' src={BASE_URL+'default.jpg'} />}
    </Carousel>         
    <List>
      <Item className='left'>
        <span>小名:{selectedAnimal.name}</span>
      </Item>
      <Item className='left'>
        <span >品种:{selectedAnimal.breed}</span>
      </Item>
      <Item className='left'>
        <span>标签:
        {selectedAnimal.tags.map((tag, index) => {
        return (<Tag className='myTag' 
        color='blue'
        key={index} 
        onClick={() => this.props.handleSearch(tag)}>
        {tag}></Tag>)})}
        </span>
      </Item>
      <Item className='left'>
        <span>流浪地:{selectedAnimal.place}</span>
      </Item>
      <Item className='left'>
        <span>描述:{selectedAnimal.des}</span>
      </Item>
      <Item className='left'>
        <span>状态:{this.stateHash[selectedAnimal.state]}</span>
      </Item>
      <Item className='left'>
        <span>主人:{selectedAnimal.owner==0?'暂无':selectedAnimal.owner}</span>
      </Item>
      <Item className='left'>
        <span>主人联系方式:{selectedAnimal.phone || '暂无'}</span>
      </Item>
      <Item className='left'>
        <span>主人地址:{selectedAnimal.address==0?'暂无':selectedAnimal.address}</span>
      </Item>         
    </List>
  </Card>
      <Button 
      icon='form'
      type='primary'
      onClick={() => this.props.history.push('/gather/correct', selectedAnimal)}
       >信息有误?需要订正?</Button></>
  )
  }
}
export default withRouter(Detail)