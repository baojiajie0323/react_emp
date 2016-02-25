import React from 'react';
import { Icon,Row,Col,Button } from 'antd';

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

          <Button id="btn_plantest" type="ghost" size="large">
            <Icon type="caret-circle-o-right" />
          预案演练
          </Button>
          <Button id="btn_planstart" type="primary" size="large">
            <Icon type="caret-circle-o-right" />
          预案执行
          </Button>
        </div>
        <div id='planstep'>
        </div>
      </div>
    );
  },
});

export default Planinfo;