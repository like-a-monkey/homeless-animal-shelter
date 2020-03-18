import React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Select,
  InputNumber,
  Radio,
  Checkbox,
  Button,
  Modal,
  AutoComplete,
  message
} from 'antd'
import {getSearchAnimals, reqAdoptAnimal} from '../../api/index'
import LinkButton from '../../components/link-button'
const { Option } = Select
const AutoCompleteOption = AutoComplete.Option;

class Adopt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animalsNameList: [],
      Options: [],
      confirm: false,
    }
    this.e_mailList = ['@qq.com', '@foxmail.com', '@163.com', '@googlemail.com', '@msn.com'] 
    this.tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 9,
        },
      },
    }
    this.formItemLayout = {
      labelCol: {
        span: 9 
      },
      wrapperCol: {
        span: 6 
      }
    }
    this.prefixSelector = (
      <Select style={{ width: 70 }}>
        <Option value="weibo">微博</Option>
        <Option value="qq">QQ</Option>
        <Option value="wechat">微信</Option>
      </Select>
  )
  }
  agreementInfo = () => {
    const that = this
    Modal.info({
      title: '请仔细阅读以下协议:',
      content: (
        <div>
          <p>（1）符合领养动物基本条件：年满18周岁，有合法的身份证明，有固定住所、正当职业或经济能力者，未满18周岁者需由家长陪同，取得家长同意并签字。</p>
          <p>（2）在领养流浪动物(以下简称领养动物)前，征得家庭成员一致同意；签署领养协议后，不得因为家人反对、婚姻、生育、工作变动、动物不听话、动物生病等原因抛弃领养动物</p>
          <p>（3）为领养动物提供适合的食物，提供洁净的饮用水，做到科学喂养。</p>
          <p>（4）每年按时为领养动物体检和免疫（包括疫苗、驱虫），领养动物生病时积极治疗。</p>
          <p>（5）对领养时尚未绝育的领养动物，按照建议绝育时间进行绝育。</p>
          <p>（6）在住所为领养动物提供适当的活动空间并保证领养动物的安全，不得散养，不得将所领养动物异用和商业用途。</p>
          <p>（7）对领养的狗必须按照相关要求办理养犬登记，做到依法、文明养犬。</p>
          <p>（8）带领养的狗出门必须栓好牵引绳，未成年人不得单独遛狗。</p>
        </div>
      )
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields(async(err, values) => {
      if(!err) {
        console.log(values)
        const response = await reqAdoptAnimal(values)
        if(response.status == 0) {
          message.success('领养成功')
        } else {
          message.error('出错啦')
        }
      }
    })
  }
  componentDidMount() {
    this.getAllAnimalsList()  
    this.agreementInfo()
  }
  getAllAnimalsList = async() => {
    const response = await getSearchAnimals('')
    const validList = []
    response.data.forEach(animal => {
      if(animal.state === 0) validList.push({name: animal.name, _id: animal._id})
    })
    this.setState({animalsNameList: validList})
  }
  render() {
  const {getFieldDecorator} = this.props.form
  return (
      <Form
      onKeyDown={(e) => {if(e.keyCode==13) e.preventDefault()}}
      // 防止
      {...this.formItemLayout}
      >
         <Form.Item
          label="请选择您心仪的小可爱">
          {getFieldDecorator('pet',{
              rules:[{required: true, message: '请选择您心仪的小可爱'}]
            })(<Select showSearch filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>{this.state.animalsNameList.map(animal => <Option value={animal._id} key={animal._id}>{animal.name}</Option>)}</Select>)}
        </Form.Item>
        <Form.Item
          label="姓名">
          {getFieldDecorator('name',{
              rules:[{required: true, message: '请输入您的名字'}]
            })(<Input placeholder='真实姓名'></Input>)}
        </Form.Item>
        <Form.Item
          label="性别">
          {getFieldDecorator('gender',{
              rules:[{required: true, message: '请选择性别'}]
            })( <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio></Radio.Group>)}
        </Form.Item>
        <Form.Item
          label="年龄">
        <Tooltip 
          trigger={'focus'}
          title="我们并不鼓励未成年人领养">
          {getFieldDecorator('age',{
              rules:[{required: true, message: '请输入您的年龄'},
              {pattern:/(1[89]|[2-9][0-9])/, message: '我们并不鼓励未成年人领养'}]
            })(<InputNumber 
            max={99} ></InputNumber>)}
        </Tooltip>
        </Form.Item>
        <Form.Item
          label="学号">
          {getFieldDecorator('sID',{
              rules:[{required: true, message: '请输入您的学号'},
              {pattern:/^(20)[12]\d{7}$/, message:'请输入正确学号'}]
            })(<Input></Input>)}
        </Form.Item>
        <Form.Item
          label="地址">
          {getFieldDecorator('address',{
              rules:[{required: true, message: '请输入您的住址'}]
            })(<Input></Input>)}
        </Form.Item>
        <Form.Item
          label="手机号码">
          {getFieldDecorator('phone',{
              rules:[
                {required: true, message: '请输入您的手机号'},
                {pattern:/^1[3456789]\d{9}$/, message:'请输入正确的手机号码方便联系'}]
            })(<Input></Input>)}
        </Form.Item>
        <Form.Item
          label="邮箱">
          {getFieldDecorator('e_mail',{
              rules:[
              {required: true, message: '请输入您的邮箱'},
              {pattern:/^\S+@\S+$/, message:'请输入正确的邮箱号方便联系'}]
            })(<AutoComplete 
            onSearch={(val) => this.setState({Options: this.e_mailList.map(mail => val + mail)})} 
            >
              {this.state.Options.length && this.state.Options.map(email => (<Option key={email} value={email}>
              {email}
              </Option>))}
              </AutoComplete>)}
        </Form.Item>
        <Form.Item
          label="其他联系方式(选填)">
          {getFieldDecorator('contact',{
            })(<Input addonBefore={this.prefixSelector} style={{ width: '100%' }} />
            )}
        </Form.Item>
        <Form.Item
          label="学业状态">
          {getFieldDecorator('state',{
              rules:[{required: true, message: '请输入您的学业状态'}]
            })(<Select >
              <Option value='0'>本科在读</Option>
              <Option value='1'>本科毕业</Option>
              <Option value='2'>硕士在读</Option>
              <Option value='3'>硕士毕业</Option>
              </Select>)}
        </Form.Item>
        <Form.Item {...this.tailFormItemLayout}>
        <Checkbox 
        onChange={(e) => this.setState({confirm: e.target.checked})}
        checked={this.state.confirm}>我已阅读并同意
        <LinkButton onClick = {() => this.agreementInfo()}>动物领养协议</LinkButton>
        </Checkbox>
        </Form.Item>
        <Form.Item {...this.tailFormItemLayout}>
          <Button 
          onClick={this.handleSubmit}
          disabled={!this.state.confirm}
          type="primary">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create({})(Adopt)