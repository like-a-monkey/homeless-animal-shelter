import { Upload, Icon, Modal, message} from 'antd'
import {BASE_URL} from '../../config/constant'
import React from 'react'
//BUG先在总览点击订正 再点击左侧导航栏 图片会保留
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function setFileList(imgs){
  if(imgs && imgs.length > 0){
    return imgs.map((img, index) => {
      img = img.indexOf('.')===-1?(img+'.png'):img
      return {uid: -index,
      name: img,
      status: 'done',
      url:BASE_URL + img}
  })}
  else {
    return []
  }
} 

export default class PicturesWall extends React.Component {
  constructor(props) {
    super(props)
    const fileList = setFileList(this.props.imgs) 
      this.state = {
        previewVisible: false,
        previewImage: '',
        fileList
      }
        
  }
  // componentWillReceiveProps(nextProps){
  //   this.setState({fileList: setFileList(nextProps.imgs)})
  // }
  // static getDerivedStateFromProps(nextProps, preState){
  //   //删除图片时会出错 导致状态始终为done
  //   return {fileList: setFileList(nextProps.imgs)}  
  // }
  componentWillReceiveProps(nextProps) {
    this.setState({fileList: setFileList(nextProps.imgs)})
  }
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  handleChange = async ({ fileList, file }) => {
    if(file.status === 'done') {
      if(file.response.status === 0) {
        message.success('上传成功')
        fileList[fileList.length - 1].name = file.response.data.name
        fileList[fileList.length - 1].url = file.response.data.url
      } else {
        message.error('上传失败')
      }
    } else if(file.status === 'removed') {
      this.props.handleDeleteImgs(file.name)
      message.success('删除成功')
      // 同一在提交时候发送删除请求更加友好
      // const response = await reqDeleteImg(file.name)
      // if(response.status === 0) {
      //   message.success('删除成功')
      // }
    }
    this.setState({ fileList })
    //bug onchange调用一次 必须始终调用setState才会多次调用
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/img/upload"
          accept="image/*"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal 
        visible={previewVisible} 
        footer={null} 
        onCancel={() => this.setState({ previewVisible: false })}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
