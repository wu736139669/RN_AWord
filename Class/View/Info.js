//详情页面
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AlertIOS,
  ActivityIndicatorIOS,
  ActionSheetIOS,
  SegmentedControlIOS,
  CameraRoll,
  Clipboard,

} from 'react-native';

var MessageInfoManager = require('react-native').NativeModules.MessageInfoManager;
var ASHUIMenuControllerManager = require('react-native').NativeModules.ASHUIMenuControllerManager;
var ASHUtilManager = require('react-native').NativeModules.ASHUtilManager;


export default class Info extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isCollected: false,
      saveRet:[],
      textPressed: 'black',
    };
    
    this.reSetNavItems();
  }
  reSetNavItems(){
    this.props.navComponent.setNavItems({
      rightItem: {
        component: (
          <TouchableOpacity style={[styles.navItem, {marginRight: 20}]}>
            <Text>{this.state.isCollected?'取消收藏':'收藏'}</Text>
          </TouchableOpacity>
        ),
        event: function() {
          this.collectBtnClick();
        }.bind(this)
      },
      title:{
        component: (
          <View
            style={styles.segmentControlContainer} >
            <Text>详情页</Text>
          </View>
        )
      },
    });
    
  }
  collectBtnClick(){
    if (this.state.isCollected) {
      MessageInfoManager.delWithKey(this.props.movie.id, (error,ret)=>{
        if (ret) {
          this.setState({isCollected:false});
              AlertIOS.alert('取消收藏成功');
              this.reSetNavItems();
              this.props.navComponent.reloadView();
            }else{
              AlertIOS.alert('取消收藏失败');
            }
      });
              
    }else{
      
        
        MessageInfoManager.saveMessageWithKey(this.props.movie.id,this.props.movie.imageurl,this.props.movie.title,(error,ret)=>{
          if(error){
            console.log(error);
          }else{
              this.setState({isCollected:true});
              AlertIOS.alert('收藏成功');
              this.reSetNavItems();
              this.props.navComponent.reloadView();
          }
        });

    }
    
  }
  pushPage() {
    this.props.navigator.push({
      title: 'New Page',
      component: <AnotherNewPage/>
    });
  }
  componentDidMount(){
    MessageInfoManager.isExistWithKey(this.props.movie.id,(error,ret)=>{
      if (ret) {
        this.setState({isCollected:true});
        this.reSetNavItems();
        this.props.navComponent.reloadView();
      };

    });
  }
  render() {

    return (
      <TouchableWithoutFeedback onPress={this.hideMenu.bind(this)}>
      <View style={styles.tabContentStyle}>
      <TouchableWithoutFeedback onLongPress={this.onImagePress.bind(this)} onPress={this.hideMenu.bind(this)}>
         <Image
          ref={'image'}
          source={{uri: this.props.movie.imageurl}}
          style={styles.thumbnail}/>
      </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
        <TouchableWithoutFeedback onLongPress={this.onTextPress.bind(this)}>
          <Text style={[styles.title,{color:this.state.textPressed}]}>{this.props.movie.title}</Text>
        </TouchableWithoutFeedback>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
  onTextPress(e: Event){
    this.setState({textPressed:'#61BFA9'});
    ASHUIMenuControllerManager.showMenuWithTitleArr(['复制文本'], e.nativeEvent.pageX, e.nativeEvent.pageY,(error,ret)=>{
      this.hideMenu();
      // ASHUtilManager.pasteWithText(this.props.movie.title);
      Clipboard.setString(this.props.movie.title);
    });
  }
  hideMenu(e: Event){
    ASHUIMenuControllerManager.hideMenu();
    this.setState({textPressed:'black'});
  }
  onImagePress(e: Event){
    ASHUIMenuControllerManager.showMenuWithTitleArr(['保存'], e.nativeEvent.pageX, e.nativeEvent.pageY,(error,ret)=>{
      CameraRoll.saveImageWithTag(this.props.movie.imageurl,(ret)=>{
        console.log(ret+'save image success');
        AlertIOS.alert('保存成功');
      },(error)=>{
        console.log('error on save image');
        AlertIOS.alert('保存失败');
      })
    });
  }
}

var styles = StyleSheet.create({
     thumbnail: {
    width: 400,
    height: 200,
    marginTop:30,
    },
   rightContainer: {
    flex: 1,
    marginTop:30,
    },
    segmentControlContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    segmentControl: {
        width: 160
    },
    navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabContentStyle: {
    flex: 1,
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#333333',
    marginBottom: 25,
    fontSize: 17
  },
   title: {
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'left',
    borderWidth: 0,
    borderColor: '#333333',
  },
});


