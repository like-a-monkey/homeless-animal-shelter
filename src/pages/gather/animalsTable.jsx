import React from 'react'
import {Table, Tag, Input, Button} from 'antd'
import LinkButton from '../../components/link-button'
const { Search } = Input
const { Column, ColumnGroup } = Table
export default class AnimalsTable extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false
    }
  }
  tableInit = () => {
    return [{
      title: '小名',
      dataIndex: 'name',
      key: '1',
    },{
      title: '品种',
      dataIndex: 'breed',
      key: '2',
    },{
      title: '流浪地',
      dataIndex: 'place',
      key: '3',
    },{
      title: '标签',
      dataIndex: 'tags',
      key: '4',
      render: tags => (
        <span>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </span>
      )},{
        title: '操作',
        key:'5',
        render: (animal) => (
        <span>
        <Button 
        icon="form"
        onClick={() => this.handleCorrect(animal)}>订正</Button>
        </span>)
      }   
    ]  
  }

  componentDidMount() {
    this.columns = this.tableInit()
    this.setState({data: this.props.searchAnimalList})
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {data: nextProps.searchAnimalList}
  }
  handleCorrect = (animal) => {
    this.props.handleSelect(animal)
    this.setState({})
  }
  render() {
    return (  
    <div>
     <Search
      enterButton
      placeholder="请输入关键字"
      onSearch={this.props.setSearchAnimalList}
      style={{ width: 300, marginBottom: 30}}
    />
     <Table 
      bordered
      loading={this.state.loading}
      rowKey='_id'
      pagination={{defaultPageSize: 10, showQuickJumper: true}}
      dataSource={this.state.data} 
      columns={this.columns} />
    </div>)
  }
}