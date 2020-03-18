import React from 'react'
import {Form, Input, Col, Row, Select, DatePicker, Button, message, Drawer} from 'antd'
import PictureWall from './picturewall'
import AnimalsTable from './animalsTable'
import {reqUpdateAnimal, getSearchAnimals} from '../../api/index'
import './gather.css'
const { Option } = Select
class Correct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerVisible: true,
      selectedAnimal: {},
      searchAnimalList: [],
    }
    this.pw = React.createRef()
    this.placeList = ['西南', '南区', '文山湖', '文科楼', '斋区', '元平', '留学生宿舍', '杜鹃山', '其他']
    this.animalState = ['流浪中', '被领养', '失踪', '已死亡']
  }
  handleSelect = (selectedAnimal) => {
    this.setState({selectedAnimal})
  }
  handleSubmit = () => {
    this.props.form.validateFields(async(err, values) => {
      if(!err) {
        var imgs = this.pw.current.getImgs()
        const animal = {imgs, ...values}
        animal._id = this.state.selectedAnimal._id
        animal.state = this.state.selectedAnimal.state
        const response = await reqUpdateAnimal(animal)
        if(response.status == 0){
          message.success('修改成功')
          this.props.history.push('/home')
        } else {
        message.error(response.msg)
        }    
        }  
    })
  }
  componentDidMount() {
    if(this.props.location.state){
      this.setState({selectedAnimal: this.props.location.state, drawerVisible: false})
    }
    this.props.location.state = null
    //跳转取值后清空防止数据无法更新 
    this.setSearchAnimalList()
  }
  setSearchAnimalList = async(keyword='') => {
    const response = await getSearchAnimals(keyword)
    if(response.status == 0){
      this.setState({searchAnimalList: response.data})
    } else {
      message.error('初始化列表失败，请检查网络设置')
    }
  }
  render() {
    const {getFieldDecorator} = this.props.form
    const currentState = this.state.selectedAnimal.state
    let name, des, imgs, tags, breed, place, owner, phone, address
    if(this.props.location.state){
      ({name, des, imgs, tags, breed, place, owner, phone, address} = this.props.location.state) 
      //加括号用于给声明过的变量赋值 不加括号会让系统一位{a}为块级代码       
    } else if(this.state.selectedAnimal.name) {
      //用于列表点击是数据更新
      ({name, des, imgs, tags, breed, place, owner, phone, address} = this.state.selectedAnimal)
    }
      return <div>
      <Form layout="vertical" 
      name="normal"
      >
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="小名">
            {getFieldDecorator('name',{
              initialValue: name||'',
              rules:[{required: true, message: '请输入小可爱的名字'}]
            })(<Input placeholder='如没有名字直接输入动物种类即可'></Input>)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="品种">
          {getFieldDecorator('breed',{
              initialValue: breed||'',
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
              initialValue: place,         
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
              initialValue: tags||[],   
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
            label="最新状态"
          >
            <Select placeholder="请从框中勾选状态" 
            onChange={(val) => this.setState({selectedAnimal: {...this.state.selectedAnimal, state: val}})}
            value={currentState}>
            {this.animalState.map((state, index) => <Option value={index} key={state}>{state}</Option>)}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {currentState===1?(<>
        <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="收养人名字">
            {getFieldDecorator('owner',{
              initialValue: owner==0?'':owner,
              rules:[{required: true, message: '请输入收养人名字'}]
            })(<Input placeholder='收养人名字'></Input>)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="收养人手机号码">
          {getFieldDecorator('phone',{
              initialValue: phone||'',
              rules:[{required: true, message: '请输入收养人手机号码'}]
            })(<Input placeholder='收养人手机号码'></Input>)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="收养人地址">
            {getFieldDecorator('address',{
            initialValue: address==0?'':address,
            rules:[{required: true, message: '请输入收养人地址'}]
            })(<Input placeholder="收养人地址" />)}   
          </Form.Item>
        </Col>
      </Row></>
      )
      :null}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="描述">
            {getFieldDecorator('des',{
            initialValue: des||'',
            rules:[{required: true, message: '请输入描述'}]
            })(<Input.TextArea autoSize={{ minRows: 5, maxRows: 5}}
            rows={4} placeholder="请输入改动物状况(越详细越好)" />)}   
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
      *上传图片以便确认
      <PictureWall ref={this.pw} imgs={imgs}></PictureWall>     
      </Col></Row>
      <Form.Item>
      <Button
      icon='upload' 
      type="primary" 
      onClick={this.handleSubmit}>
      提交
      </Button>
      <Button
      icon='form' 
      type="primary" 
      style={{marginLeft:20}}
      onClick={() => this.setState({drawerVisible: true})}
      >
      {this.state.selectedAnimal.name?'订正其他动物':'展开动物列表'}
      </Button>
      </Form.Item>
    </Form>
    <Drawer
    title="流浪动物一览"
    width={720}
    onClose={() => this.setState({drawerVisible: false})}
    visible={this.state.drawerVisible}
    >
    <AnimalsTable 
    handleSelect={this.handleSelect}
    setSearchAnimalList={this.setSearchAnimalList}
    searchAnimalList={this.state.searchAnimalList}></AnimalsTable>
    </Drawer>
    </div>   
    }    
}

export default Form.create({})(Correct)