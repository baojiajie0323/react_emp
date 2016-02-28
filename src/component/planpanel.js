import React from 'react';
import { Menu, Icon,Row,Col,Button,Modal,Popconfirm,Form,Input,Alert,QueueAnim } from 'antd';
const SubMenu = Menu.SubMenu;
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Planinfo = require('./planinfo');
const Action = require('../flux/actions/vssActions');
const Store = require('../flux/stores/vssStore');

var Planpanel = React.createClass({
  componentDidMount() {
    Store.addChangeListener(Store.notifytype.planload,this.planloadfinish);
    Store.addChangeListener(Store.notifytype.changesel,this.changesel);
  },
  getInitialState: function() {
    return {
      _plangroup: Store.getplangroup(),
      current: "4",
      visible: false,
      stepitems:[]
    };
  },
  planloadfinish(){
    this.setState({
      _plangroup: Store.getplangroup()
    })
  },
  changesel(planid){
    this.setState({
      _plangroup: Store.getplangroup(),
      current:planid.toString()
    })
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
  handledelplan() {
    Action.delplan(this.state.current);
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  },
  sendAddPlan() {
    Action.addplan($('#planname').val(),$('#input_plandetail').val());
    this.setState({
      visible: false
    });
  },
  handleCancel() {
    console.log('点击了取消');
    this.setState({
      visible: false
    });
  },
  handleDeleteStep:function(item){
    let items = this.state.stepitems;
    for (var i = 0; i < items.length; i++) {
      if(items[i].key == item){
        items.splice(i,1);
      }
    }
    this.setState({
      stepitems:items
    });
  },
  handleAddStep() {
    let items = this.state.stepitems;
    var keys = Date.now();
    items.push(<Row key={keys} type="flex" justify="start">
      <Col span="1" offset="3">
        <Icon style={{fontSize:'16px',marginTop:'10px'}} type="tags-o" />
      </Col>
      <Col span="15" offset="1" >
        <Alert message={"打电话" + new Date().getMinutes() + new Date().getSeconds()} type="info" style={{marginLeft:'10px'}} />
        <a onClick={function(){this.handleDeleteStep(keys)}.bind(this)} className="btndelete"><Icon type="delete" /></a>
      </Col>
    </Row>);
    this.setState({
      stepitems:items
    })
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

    var subarray = [];
    for (var i = 0; i < this.state._plangroup.length; i++) {
      var groupid = this.state._plangroup[i].id;
      if(groupid == 1)
        continue;
      var key = 'group' + groupid;
      var menu = Store.getplanlistbygroupid(groupid).map(function(plan){
        var plankey = plan.id;
        return <Menu.Item key={plankey}>{<span><Icon type="book" /><span>{plan.name}</span></span>}</Menu.Item>
      });
      var submenu =  <SubMenu key={key} title={<span><Icon type="folder" /><span>{this.state._plangroup[i].name}</span></span>}>
      {menu}
      </SubMenu>
      subarray.push(submenu);
    }

    var menu = Store.getplanlistbygroupid(1).map(function(plan){
      var plankey = plan.id;
      return <Menu.Item key={plankey}>{<span><Icon type="book" /><span>{plan.name}</span></span>}</Menu.Item>
    });

    subarray.push(menu);

    var menu = <Menu
      onClick={this.handleClick}
      defaultOpenKeys={['groupall']}
      selectedKeys={[this.state.current]}
      mode="inline">
      <SubMenu key="groupall" title={<span><Icon type="folder" /><span>所有预案</span></span>}>
        {subarray}
      </SubMenu>
    </Menu>

    return (
        <Row id="planpanel">
          <Col id="planlist" span="5" className="panel" >
            {menu}
            <div id="operatebtngroup">
              <ButtonGroup size="large">
                <Button onClick={this.handleAddPlan} type="primary"><Icon type="plus" />增加</Button>
                <Button type="ghost">
                  <Icon type="edit" disabled />
                  修改
                </Button>
                <Popconfirm title="确定要删除吗？" onConfirm={this.handledelplan}>
                  <Button type="ghost">
                    <Icon type="delete" />
                    删除
                  </Button>
                </Popconfirm>
              </ButtonGroup>
            </div>
          </Col>
          <Col span="19" className="panel">
            <Planinfo planid={this.state.current} />
          </Col>
          <Modal title="新建预案"
            visible={this.state.visible}
            onOk={this.sendAddPlan}
            onCancel={this.handleCancel}>
            <Form horizontal form={this.props.form}>
              <FormItem
                {...formItemLayout}
                label="预案名称："
                hasFeedback
                help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')} required>
                <Input {...nameProps} id="planname" placeholder="请输入预案名称" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="预案描述：" required>
                <Input type="textarea" placeholder="请输入预案描述" id="input_plandetail" rows="3" />
              </FormItem>
              <FormItem>
                <span style={{margin:'10px 12%',width:'50%'}} className="ant-line" ></span>
                <Button id="btnaddstep" onClick={this.handleAddStep} type="primary" size='small'>
                  <Icon type="tags-o" />
                  新建步骤
                </Button>
              </FormItem>
              <QueueAnim component="ul" style={{marginTop:'-20px'}} type={['right', 'left']}>
                {this.state.stepitems}
              </QueueAnim>
            </Form>
          </Modal>
        </Row>
    );
  },
});

Planpanel = createForm()(Planpanel);

export default Planpanel;
