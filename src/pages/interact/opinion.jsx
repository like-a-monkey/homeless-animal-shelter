import React from 'react'
import {
  Timeline,
  Row,
  Col,
  Input,
  Button,
  message,
  Modal,
  Rate
} from 'antd'
import {reqAdoptRate} from '../../api'
export default class Opinion extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      val: '',
      visible: false,
      rate: 3
    }
  }
  handleSubmit = () => {
    this.setState({val: ''}, () => message.success('提交成功'))
  }
  handleRate = async() => {
    this.setState({visible: false})
    const response = await reqAdoptRate(this.props.location.state._id, this.state.rate)
    if(response.status === 0) {
      message.success('感谢你的评价')
    }
  }
  componentDidMount() {
    if(this.props.location.state) {
      this.setState({visible: true})
    }
  }
  render() {
    const desc = ['糟糕透了', '糟糕', '一般', '还可以', '非常好']
    return <div>
      <Row>
        <Col span={8} style={{marginTop: 150, marginRight:300}}>
          <Timeline mode="alternate">
          <Timeline.Item>1983年5月，深圳大学由国务院正式批准，9月正式宣告成立，并于9月27日开学授课。</Timeline.Item>
          <Timeline.Item color="green">1993年夏季，江泽民题写校名。</Timeline.Item>
          <Timeline.Item color="red">1996年，经国务院学位委员会批准，获硕士学位授权。</Timeline.Item>
          <Timeline.Item >
          2006年，经国务院学位委员会批准，获博士学位授权。深圳国家生化工程技术开发中心成建制整体并入深圳大学。同年，入选国家大学生文化素质教育基地。
          </Timeline.Item>
          <Timeline.Item>2009年10月，由深圳大学与深圳市地铁集团有限公司联合组建轨道交通学院，依托机电与控制工程学院建设、运作和管理。</Timeline.Item>
          <Timeline.Item >
          2010年，获得教育部批准，成为推免生授权单位。
          </Timeline.Item>
          <Timeline.Item >
          截至2019年4月，学校有后海、西丽2个校区，占地总面积2.72平方公里，校园建筑总面积154.3万平方米；
          </Timeline.Item>
          </Timeline>
        </Col>
        <Col span={8} style={{marginTop: 150}}>
          <Input.TextArea
          onChange={(e) => this.setState({val: e.target.value})}
          value={this.state.val}
          placeholder='您的意见将会是我们不断前行的动力'
          autoSize={{ minRows: 8, maxRows: 12}}
          ></Input.TextArea>
          <Button
          onClick={this.handleSubmit}
          type='primary'
          style={{marginTop: 50}}>提交</Button>
        </Col>
      </Row>
      <Modal
      title='请为我们本次服务打分'
      onCancel={() => this.setState({visible: false})}
      visible={this.state.visible}
      footer={<Button onClick={this.handleRate}>确认</Button>}
      >
        <Rate tooltips={desc} 
        onChange={(val) => this.setState({rate: val})} 
        value={this.state.rate} />
      </Modal>
    </div>
  }
}