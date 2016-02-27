import React from 'react';
import { Menu, Icon,Row,Col,Button,Modal,Popconfirm,Form,Input } from 'antd';
const SubMenu = Menu.SubMenu;
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Planinfo = require('./planinfo');

var Planpanel = React.createClass({
  componentDidMount() {

  },
  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  },
  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd']);
    }
    callback();
  },

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },
  getInitialState() {
    return {
      current: "4",
      visible: false
    };
  },
  handleAddPlan() {
    this.setState({
      visible: true
    });
  },
  handleAddGroup() {
    this.setState({
      visible: true
    });
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  },
  handleOk() {
    this.setState({
      ModalText: '对话框将在两秒后关闭',
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  },
  handleCancel() {
    console.log('点击了取消');
    this.setState({
      visible: false
    });
  },
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 4, message: '名称至少为 4 个字符' },
        { validator: this.userExists },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
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
                <Popconfirm title="请问您要添加分组还是预案？"
                onConfirm={this.handleAddPlan} onCancel={this.handleAddGroup} okText="预案" cancelText="分组">
                  <Button type="primary">
                    <Icon type="plus" />
                    增加
                  </Button>
                </Popconfirm>
                <Button type="ghost">
                  <Icon type="edit" />
                  修改
                </Button>
                <Popconfirm title="确定要删除吗？" >
                  <Button type="ghost">
                    <Icon type="delete" />
                    删除
                  </Button>
                </Popconfirm>
              </ButtonGroup>
            </div>
          </Col>
          <Col span="19" className="panel">
            <Planinfo />
          </Col>
          <Modal title="新建预案"
            visible={this.state.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}>
            <Form horizontal form={this.props.form}>
              <FormItem
                {...formItemLayout}
                label="预案名称："
                hasFeedback
                help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')} required>
                <Input {...nameProps} placeholder="请输入预案名称" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="预案描述：" required>
                <Input type="textarea" placeholder="请输入预案描述" id="control-textarea" rows="3" />
              </FormItem>
              <FormItem>
                <span style={{margin:'10px 12%',width:'50%'}} className="ant-line" ></span>
                <Button id="btnaddstep" type="primary" size='small'>
                  <Icon type="tags-o" />
                  新建步骤
                </Button>
              </FormItem>
            </Form>
          </Modal>
        </Row>
    );
  },
});

Planpanel = createForm()(Planpanel);

export default Planpanel;
