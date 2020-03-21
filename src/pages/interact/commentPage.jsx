import React from 'react'
import './index.css'
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import {
  reqAddComment,
  getCommentList,
  reqUpdateComment
} from '../../api/index'
import {
  Comment,
  Avatar,
  Row,
  Col,
  Icon,
  Drawer,
  Input,
  Button,
  message
} from 'antd'
import Cookies from 'js-cookie'
export default class CommentPage extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      commentList: [],
      formatedList: [],
      visible: false,
      val: '',
      replyTarget: {},
      name: ''
    }
    this.close_id = []
  }
  componentDidMount() {
    this.CookieInit()
    //初始化cookie
    // reqAddComment('我是子子评论了', '5e7450088b92a018e844dfd0')
    this.setCommentList()
    //异步获取评论列表
  }
  formateTime = (time) => {
    const [year, month, day] = [time.getDay(), time.getFullYear(), time.getMonth()+1]
    return year + '/' + month + '/' + day
  }
  CookieInit = () => {
    if(!Cookies.get('userid')) Cookies.set('userid', Date.now(), {expires: 15})
    this.userid = Cookies.get('userid')
  }
  setCommentList = async (close_id = []) => {
    const response = await getCommentList()
    if(response.status === 0) {
      const formatedList = this.commentListInit(response.data, [], close_id, false)
      this.setState({commentList: response.data, formatedList})
    }
  }
  commentListInit = (commentList, initArr=[], targetArr=[], flag) => {
    if(!initArr.length) initArr = commentList.filter(c => c.pid == 0)
    initArr.forEach(comment => {
      comment.children = commentList.filter(com => com.pid === comment._id)
      if(comment.children.length) {
        if(targetArr.indexOf(comment._id) !== -1){
          comment.children.visible = !flag
        } else {
          comment.children.visible = flag
        }
        this.commentListInit(commentList, comment.children, targetArr)
      }
    })
    return initArr
  }
  handleLike = async(comment, attitude) => {
    //_id attitude
    await reqUpdateComment({_id: comment._id, attitude})
    this.setCommentList(this.close_id)
  }
  handleToggle = (comment) => {
    const index = this.close_id.indexOf(comment._id)
    let e = index === -1 ? this.close_id.push(comment._id):this.close_id.splice(index, 1)
    const {commentList} = this.state
    const formatedList = this.commentListInit(commentList, [], this.close_id, false)
    this.setState({formatedList})
    // 解决方案一 
    // comment.children.visible = !comment.children.visible
    // this.setState({formatedList: this.state.formatedList})
    // 方案二
  }
  handleComment = async() => {
    const {val, replyTarget, name} = this.state
    if(replyTarget.name) {
      if(replyTarget.name !== '匿名' &&  replyTarget.name.trim() === name && name !== '匿名') {
        message.info('请不要同名评论哦')
        return
      } else if(!(name.trim() || val.trim())) {
        message.info('请输入有效内容')
        return
      }
      //回复
      const response = await reqAddComment(val, replyTarget._id, name)
      console.log(response)
      if(response.status === 0) {
        message.success('回复成功')
        this.close_id.push(replyTarget._id)
        this.setState({visible: false, val: '', name: ''})
      }
    } else {
      //发表评论
      const response = await reqAddComment(val, '', name)
      console.log(response)
      if(response.status === 0) {
        message.success('评论成功')
        this.setState({visible: false, val: '', name: ''})
      }
    }
    this.setCommentList(this.close_id)
  }
  renderComment = (formatedList) => {
    return formatedList.map(comment => {
      let fold, lcolor, dcolor
      dcolor = lcolor = '#BABCBE'
      if(comment.children.length) {
        if(comment.children.visible) {
          fold = (<>收起...<Icon type='up'></Icon></>)
        } else {
          fold = (<>展开...<Icon type='down'></Icon></>)
        }
      }
      if(comment.cHistory) {
        if(comment.cHistory.hasOwnProperty(this.userid)) {
          comment.cHistory[this.userid] === 1 ? lcolor='#1890FF':dcolor='#1890FF'
        }
      }
      return (<Comment
        key={comment._id}
        actions={[
          <span>
          <Icon type='like'
          style={{color: lcolor}}
          onClick={() => this.handleLike(comment, 1)}
          ></Icon><span>{comment.like}</span>
          </span>,
          <span>
          <Icon 
          style={{color: dcolor}}
          onClick={() => this.handleLike(comment, 0)}
          type='dislike'></Icon><span>{comment.dislike}</span>
          </span>,
          <span
          onClick={() => this.setState({visible: true, replyTarget: comment})}
          key="comment-nested-reply-to">&nbsp;&nbsp;&nbsp;回复评论</span>,
          <span 
          onClick ={() => this.handleToggle(comment) }
          style={{marginLeft: 120}}>
          {fold}
          {/* <>展开...<Icon type='down'></Icon></> */}
          </span>
          ]}
        datetime={comment.time.slice(0, 10)}
        author={<span>{comment.name}</span>}
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={<p>{comment.content}</p>}
        >
          {comment.children && comment.children.visible ? this.renderComment(comment.children):null}
        </Comment>)
      })
    }
  render() {
    return <div>
      <Button 
      onClick={() => this.setState({visible: true, replyTarget: {}, val: ''})}
      icon='wechat'
      type='primary'>来发表你自己的评论吧</Button>
      <Row>
      <Col span={12}>
      {this.state.commentList.length ? this.renderComment(this.state.formatedList):null}
      </Col>
      </Row>
      <Drawer
        title={this.state.replyTarget.name ? '回复:@'+this.state.replyTarget.name:'发表一些新鲜的评论吧'}
        width={680}
        onClose={() => this.setState({visible: false})}
        visible={this.state.visible}
        bodyStyle={{ paddingBottom: 80 }}>
        <Row>
          <Col 
          style={{marginBottom: 20}}
          span={8}>
            <Input 
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
            prefix={<Icon type='user'></Icon>}
            placeholder="输入一个有个性的名字吧">
            </Input>
          </Col>
        </Row>
        <Row>
          <Col 
          style={{marginBottom: 20}}
          span={13}>
            <Input.TextArea
            placeholder='说点什么吧'
            autoSize={{minRows: 4, maxRows: 8}}
            value={this.state.val}
            onChange={(e) => this.setState({val: e.target.value})}
            ></Input.TextArea> 
          </Col>
        </Row>
        <Picker 
        style={{marginBottom: 30}}
        set='apple'
        onSelect={(emo) => this.setState({val: this.state.val+emo.native}) }>
        </Picker>
        <Row>
        <Button
        type='primary'
        onClick={this.handleComment}
        >发&nbsp;&nbsp;&nbsp;表</Button>
        </Row>
      </Drawer>
    </div>
  }
}