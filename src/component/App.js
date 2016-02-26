import React from 'react';
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
const Planpanel = require('./planpanel');
const Hispanel = require('./histroypanel');

const tabContent = [
  <span><Icon type="book" />预案总览</span>,
  <span><Icon type="clock-circle-o" />历史查询</span>
];

function Request(argname){
    var url = location.href;
    var arrStr = url.substring(url.indexOf("?")+1).split("&");
    for(var i =0;i<arrStr.length;i++)
    {
        var loc = arrStr[i].indexOf(argname+"=");
        if(loc!=-1)
        {
            return arrStr[i].replace(argname+"=","").replace("?","");
            break;
        }

    }
    return "";
}

const App = React.createClass({
  componentDidMount(){
    alert(Request('userid'));
  },
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
