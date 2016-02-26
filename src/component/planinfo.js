import React from 'react';
import { Icon,Row,Col,Button,Alert,Tooltip  } from 'antd';

const Planinfo = React.createClass({
  getInitialState() {
    return {
    };
  },
  render() {
    return (
      <div>
        <div id="plandetail">
          <div id="planlogo">
            <Icon type="book"/>
            <p id="text_planname">系统瘫痪</p>
          </div>
          <p id="text_createuser">创建人：<span>root</span></p>
          <p id="text_createtime">创建时间：<span>2015-02-25 16:16:23</span></p>
          <p id="text_plandetail">预案描述：<span>系统无法正常运行，需要及时解决</span></p>

          <Tooltip placement="top" title="您可以点击进行预演">
            <Button id="btn_plantest" type="ghost" size="large">
              <Icon type="caret-circle-o-right" />
            预案演练
            </Button>
          </Tooltip>
          <Button id="btn_planstart" type="primary" size="large">
            <Icon type="caret-circle-o-right" />
          预案执行
          </Button>
        </div>
        <span style={{margin:'30px 4%',width:'92%'}} className="ant-line" ></span>
        <div id='planstep'>
          <Row type="flex" justify="start">
            <Col span="1" offset="1">
              <Icon style={{fontSize:'24px',marginTop:'20px'}} type="tags-o" />
            </Col>
            <Col span="16" offset="1" >
              <Alert message="打电话" description="通知所有技术员工进场修复问题通题" type="info" />
              <a className="btnDetail"><Icon type="file-text" /></a>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="1" offset="1">
              <Icon style={{fontSize:'24px',marginTop:'20px'}} type="tags-o" />
            </Col>
            <Col span="16" offset="1" >
              <Alert message="打电话" description="通知所有技术员工进场修复问题通题" type="info" />
              <a className="btnDetail"><Icon type="file-text" /></a>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="1" offset="1">
              <Icon style={{fontSize:'24px',marginTop:'20px'}} type="tags-o" />
            </Col>
            <Col span="16" offset="1" >
              <Alert message="打电话" description="通知所有技术员工进场修复问题通题" type="info" />
              <a className="btnDetail"><Icon type="file-text" /></a>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="1" offset="1">
              <Icon style={{fontSize:'24px',marginTop:'20px'}} type="tags-o" />
            </Col>
            <Col span="16" offset="1" >
              <Alert message="打电话" description="通知所有技术员工进场修复问题通题" type="info" />
              <a className="btnDetail"><Icon type="file-text" /></a>
            </Col>
          </Row>

        </div>
      </div>
    );
  },
});

export default Planinfo;
