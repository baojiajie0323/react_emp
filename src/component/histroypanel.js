import React from 'react';
import { TreeSelect,Icon,Row,Col,Button,Select,DatePicker,Table   } from 'antd';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const treeData = [{
  label: '自然灾害',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '地震',
    value: '0-0-0',
    key: '0-0-0',
  }, {
    label: '暴雪',
    value: '0-0-1',
    key: '0-0-1',
  }],
},
{
  label: '设备故障',
  value: '0-1',
  key: '0-1',
  children: [{
    label: '停电',
    value: '0-1-0',
    key: '0-1-0',
  }, {
    label: '系统瘫痪',
    value: '0-1-1',
    key: '0-1-1',
  }],
},
{
  label: '犯人越狱',
  value: '0-2',
  key: '0-2'
}];

const columns = [{
  title: '预案名称',
  dataIndex: 'planname',
  key: 'planname',
  render(text) {
    return <a href="#">{text}</a>;
  }
}, {
  title: '开始执行时间',
  dataIndex: 'begintime',
  key: 'begintime',
}, {
  title: '结束执行时间',
  dataIndex: 'endtime',
  key: 'endtime',
}, {
  title: '报告类型',
  dataIndex: 'reporttype',
  key: 'reporttype',
}, {
  title: '执行人',
  dataIndex: 'reportuser',
  key: 'reportuser',
}, {
  title: '备注',
  dataIndex: 'remarks',
  key: 'remarks',
}, {
  title: '操作',
  key: 'operation',
  render(text, record) {
    return (
      <span>
        <a href="#">详情</a>
      </span>
    );
  }
}];
const data = [{
  key: '1',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '2',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '3',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '4',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '5',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '6',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '7',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '8',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '9',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '10',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '11',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '12',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '13',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '14',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
  key: '15',planname: '火警1',begintime: '2016-02-25 14:22:32',endtime: '2016-02-25 14:22:32',reporttype:'演练报告',reportuser:'root',remarks:'电话无法接通'},{
}];

function onChange(value) {
  console.log('From: ', value[0], ', to: ', value[1]);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}

const Hispanel = React.createClass({
  getInitialState() {
    return {
      iconLoading: false,
    };
  },
  onChange(value) {
    console.log('onChange ', value, arguments);
    this.setState({ value });
  },
  enterIconLoading() {
    this.setState({ iconLoading: true });
  },
  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      multiple: true,
      treeCheckable: true,
      searchPlaceholder: '所有预案',
      treeDefaultExpandAll: true
    };
    return (
        <Row id="hispanel">
          <Col span="5" className="panel" >
            <div id="querylist">
              <TreeSelect style={{width:'100%',marginBottom:'20px'}} {...tProps} />
              <Select size="large" style={{width:'100%',marginBottom:'20px'}} defaultValue="0" onChange={handleChange}>
                <Option value="0">所有类型报告</Option>
                <Option value="1">演练报告</Option>
                <Option value="2">执行报告</Option>
              </Select>
              <RangePicker style={{width:'100%',marginBottom:'20px'}} onChange={onChange} />
              <div>
                <Button id='btnquery' type="primary" size='large' style={{width:'80px'}} loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                  <Icon type="search" />查询
                </Button>
              </div>
            </div>
          </Col>
          <Col span="19" className="panel">
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
    );
  },
});

export default Hispanel;
