import React from 'react';
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
const Planpanel = require('./planpanel');
const Hispanel = require('./histroypanel');

const tabContent = [
  <span><Icon type="book" />预案总览</span>,
  <span><Icon type="clock-circle-o" />历史查询</span>
];

const App = React.createClass({
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab={tabContent[0]} key="1"><Planpanel /></TabPane>
        <TabPane tab={tabContent[1]} key="2"><Hispanel /></TabPane>
      </Tabs>
    );
  },
});

export default App;
