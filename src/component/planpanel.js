import React from 'react';
import { Menu, Icon,Row,Col,Button } from 'antd';
const SubMenu = Menu.SubMenu;
const ButtonGroup = Button.Group;
const Planinfo = require('./planinfo');


const Planpanel = React.createClass({
  getInitialState() {
    return {
      current: "4"
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  },
  render() {
    return (
        <Row id="planpanel">
          <Col id="planlist" span="5" className="panel" >
            <Menu
              onClick={this.handleClick}
              defaultOpenKeys={['sub1','sub3']}
              selectedKeys={[this.state.current]}
              mode="inline">
              <SubMenu key="sub1" title={<span><Icon type="folder" /><span>所有预案</span></span>}>
                <SubMenu key="sub2" title={<span><Icon type="folder" /><span>自然灾害</span></span>}>
                  <Menu.Item key="1">{<span><Icon type="book" /><span>地震</span></span>}</Menu.Item>
                  <Menu.Item key="2">{<span><Icon type="book" /><span>暴雪</span></span>}</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="folder" /><span>设备故障</span></span>}>
                  <Menu.Item key="3">{<span><Icon type="book" /><span>停电</span></span>}</Menu.Item>
                  <Menu.Item key="4">{<span><Icon type="book" /><span>系统瘫痪</span></span>}</Menu.Item>
                </SubMenu>
                <Menu.Item key="5">{<span><Icon type="book" /><span>犯人越狱</span></span>}</Menu.Item>
              </SubMenu>
            </Menu>
            <div id="operatebtngroup">
              <ButtonGroup size="large">
                <Button type="primary">
                  <Icon type="plus" />
                  增加
                </Button>
                <Button type="ghost">
                  <Icon type="edit" />
                  修改
                </Button>
                <Button type="ghost">
                  <Icon type="delete" />
                  删除
                </Button>
              </ButtonGroup>
            </div>
          </Col>
          <Col span="19" className="panel">
            <Planinfo />
          </Col>
        </Row>
    );
  },
});

export default Planpanel;
