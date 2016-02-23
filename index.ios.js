'use strict';
import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SegmentedControlIOS,
  AlertIOS,
  AppRegistry,
  Image,
} = React;
var HomePage = require('./Class/View/HomeListView');
var RandPage = require('./Class/View/RandListView');
var CollectPage = require('./Class/View/CollectListView');
var TabBarNavigator = require('./Class/NativeTabbar/MainNavigator');


var style = StyleSheet.create({
  rootView: {
    flex: 1
  },
  tabContentStyle: {
    flex: 1,
    backgroundColor: 'ebebeb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#333333',
    marginBottom: 25,
    fontSize: 17
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowImage: {
    width: 200,
    height: 200,
    transform:[{rotate: '-45deg'}],
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    top: 0
  }
});

class TabTwo extends Component {
  constructor(props) {
    super(props);
    this.props.navComponent.setNavItems({
      title: {
        component: (
          <TouchableOpacity style={[style.navItem, {marginRight: 7}]}>
            <Image style={{width: 20, height: 20}} source={{uri: shareImg}}/>
          </TouchableOpacity>
        ),
        event: function() {
          AlertIOS.alert('The event comes from title on NavBar');
        }.bind(this)
      }
    });
  }
  pushPage() {
    this.props.navigator.push({
      title: 'New Page',
      component: <NewPage/>
    });
  }
  render() {
    return (
      <View style={style.tabContentStyle}>
        <Image style={[style.arrowImage, {left: 50, top: -50, transform:[{rotate: '-75deg'},{scale: .5}]}]} source={{uri: arrowImg}}/>
        <Text style={[style.textStyle, {marginTop: -50, marginBottom: 50}]}>Title bar can be customized with click event</Text>
        <Text style={style.textStyle}>This is the content of Tab 2</Text>
        <Text style={[style.textStyle, {marginBottom: 0}]}>A good implementation of</Text>
        <Text style={style.textStyle}>hidesBottomBarWhenPushed</Text>
        <Text style={style.textStyle}>Set as default by passing Props 'defaultTab'</Text>
        <TouchableOpacity onPress={this.pushPage.bind(this)}>
          <Text style={[style.textStyle, {color: 'rgb(0,122,255)'}]}>Try to push a new page</Text>
        </TouchableOpacity>
        <Text style={style.textStyle}>And see the magic on the TabBar</Text>
      </View>
    );
  }
}

class TabBarNavigatorExample extends Component {
  render() {
    return (
      <TabBarNavigator
        navTintColor='black'
        navBarTintColor='#61BFA9'
        title = "meetyou"
        tabTintColor='#61BFA9'
        tabBarTintColor='white'
        onChange={(index)=>console.log(`selected index ${index}`)}>
        <TabBarNavigator.Item title='首页' icon={require('./Resource/bottom_ic_first_up.png')} defaultTab>
          <HomePage/>
        </TabBarNavigator.Item>
        <TabBarNavigator.Item title='随机' icon={require('./Resource/bottom_ic_first_up.png')}>
          <RandPage/>
        </TabBarNavigator.Item>
        <TabBarNavigator.Item title='收藏' icon={require('./Resource/bottom_ic_first_up.png')}>
          <CollectPage/>
        </TabBarNavigator.Item>
      </TabBarNavigator>
    );
  }
}

var styles = StyleSheet.create({
    segmentControlContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    segmentControl: {
        width: 160
    }
});

React.AppRegistry.registerComponent('testdemo', () => TabBarNavigatorExample);