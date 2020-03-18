import React from 'react'
import {Form, Input, Col, Row, Select, DatePicker, Button, message} from 'antd'
import Banner from '../../components/banner/banner'
import PictureWall from './picturewall'
import {reqAddAnimal} from '../../api/index'
import './gather.css'
const { Option } = Select
class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.pw = React.createRef()
    this.placeList = ['西南', '南区', '文山湖', '文科楼', '斋区', '元平', '留学生宿舍', '杜鹃山', '其他']
  }
  handlesubmit = () => {
    this.props.form.validateFields(async(err, values) => {
      if(!err) {
        var imgs = this.pw.current.getImgs()
        const animal = {imgs, ...values}
        const response = await reqAddAnimal(animal)
        if(response.status == 0){
          message.success('添加成功')
          this.props.history.push('/home')
        } else {
        message.error(response.msg)
        }    
        }
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return <div>
      <Form layout="vertical" 
      name="normal"
      >
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="小名">
            {getFieldDecorator('name',{
              initialValue: '',
              rules:[{required: true, message: '请输入小可爱的名字'}]
            })(<Input placeholder='如没有名字直接输入动物种类即可'></Input>)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="品种">
          {getFieldDecorator('breed',{
              initialValue: '',
              rules:[{required: true, message: '请输入小可爱的品种'}]
            })(<Input placeholder='如不知道品种直接输入动物种类即可'></Input>)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="流浪地"
          >
            {getFieldDecorator('place',{
             
              rules:[{required: true, message: '请输入流浪地'}]
            })(<Select placeholder="请从框中选择你发现它的地点">
              {this.placeList.map(place => <Option value={place} key={place}>{place}</Option>)}
              </Select>)}         
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="标签"
          >
            {getFieldDecorator('tags',{
              
              rules:[{required: true, message: '请输入小可爱标签'}]
            })(<Select mode="tags"
              placeholder="可以输入一个或多个">
              </Select>)}     
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="手机(选填)"
          >
            <Input placeholder="仅用于告知其后续" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="发现时间(选填)"
          >
            <DatePicker style={{ width: '100%' }}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="描述">
            {getFieldDecorator('des',{
            initialValue: '',
            rules:[{required: true, message: '请输入描述'}]
            })(<Input.TextArea autoSize={{ minRows: 5, maxRows: 5}}
            rows={4} placeholder="请输入改动物状况(越详细越好)" />)}   
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
      *上传图片以便确认
      <PictureWall ref={this.pw}></PictureWall>     
      </Col></Row>
      <Form.Item>
      <Button 
      icon='upload' 
      type="primary" 
      onClick={this.handlesubmit}>
      提交
      </Button>
      </Form.Item>
    </Form>
    <Banner className='banner'></Banner>
    </div>
  }
}

export default Form.create({})(Add)