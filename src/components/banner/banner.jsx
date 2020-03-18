import React from 'react'
import {Carousel, Tooltip} from 'antd'
import {BASE_URL} from '../../config/constant'
import './banner.css'
export default class Banner extends React.Component{
  constructor(props) {
    super(props)
    this.imgs = [
    {url:'banner1.png', title: '感谢你为我们贡献的一份力'}, 
    {url:'banner2.png', title: '相信在你我共同的努力下'}, 
    {url:'banner3.png', title: '在不久的将来，每个人都能看到'}, 
    {url:'banner4.png', title: '校园里的每个小可爱都能拥有一个家'}]
  }
  render(){
    return (
    <Carousel
    style={{height:0}} 
    dots={false}
    autoplay
    effect="fade"
    className='banner-carousel'>
      {this.imgs.map(img => {
      return (<Tooltip 
      key={img.url}
      placement="top" 
      title={img.title}>
      <img alt='homeless-animal' src={`${BASE_URL}${img.url}`}></img>
      </Tooltip>)})}
    </Carousel>)
    
  }
}