//3个主界面的listview

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
  AlertIOS,
  RefreshControl,
  ActivityIndicatorIOS
} from 'react-native';


import InfoPage from './Info.js'


export default class MyListView extends Component{

	//初始化。
    constructor(props) {
    	super(props);
   	 	this.state = {
      		isLoading: true, //是否正在加载.
      		isLoadingFail: true, //是否加载失败.
      		isHaveData: false,    //是否有加载出数据了。
      		dataSource: new ListView.DataSource({
        		rowHasChanged: (row1, row2) => row1 !== row2,
      		}),
      		queryNumber: 0,
    	};
    	// this.setState({dataSource:this.props.dataSource});
    
  	}

  componentDidMount(){
  	// this.props.navComponent.setNavItems({
   //    title: {
   //      component: (
   //        <Text style={styles.title}>
   //        {this.props.title}
   //        </Text>
   //      ),
   //      event: function() {
   //        this.fetchData();
   //      }.bind(this)
   //    }
   //  }),
    this.myfetchData();
  }

  onRefresh(){
    this.myfetchData();
  }
//数据查询.
  myfetchData(){
    this.setState({isLoading:true,isLoadingFail:false});
    this.props.fetchData().then((responseData)=>{
    	this.setState({
            isLoading: false,
            isLoadingFail: false,
            isHaveData: true,

            // dataSource:this.state.dataSource.cloneWithRows(responseData),
        });
    },(error)=>{
    	AlertIOS.alert('没有数据');
        this.setState({
            isLoading: false,
            isLoadingFail:true,
            isHaveData:false,
        });
    });
  }

 render(){
  // return this.renderLoadingView();
  
    if (!this.state.isHaveData) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderMovie.bind(this)}
        renderSeparator={this.renderMovieRow}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this.myfetchData.bind(this)}
            tintColor="#61BFA9"
            title={this.props.refreshTitle}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#61BFA9"/>}
        style={styles.listView}/>
    );
  }
  pushInfo(index){
      this.props.navigator.push({
        title: 'New Page',
        component: <InfoPage movie={this.props.dataSource.getRowData(0,index)}> </InfoPage>
      });
  }
  renderLoadingView(){
     if (this.state.isLoadingFail) {
      return (
      <TouchableOpacity onPress={() =>this.myfetchData()} style={styles.container} >
      <View style={styles.container}>
        <Text>
          {'点击刷新'}
        </Text>
      </View>
      </TouchableOpacity>
    );
    }else{
      return(
        <View style={styles.container}>
          <Text>
            {'正在刷新'}
          </Text>
          <ActivityIndicatorIOS />
        </View>
      )
    }
  }
  renderMovieRow(sectionID, rowID, adjacentRowHighlighted){
        return (
      <View style={styles.topContainer} key={rowID}>

      </View>
    );
  }

 renderMovie(movie,sectionID, rowID, highlightRow){
    return (
      
      <View style={styles.container} key={rowID}>
      <TouchableOpacity onPress={()=>{this.pushInfo(rowID)}} style={styles.container} >
        <Image
          source={{uri: movie.imageurl}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    flex:2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'White',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    marginTop: 10,
    marginLeft: 4,
    marginRight: 4,
    textAlign: 'left',
  },
  year: {
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  topContainer:{
    flex:1,
    height : 30,
    backgroundColor: 'LightGray',
  },
   thumbnail: {
    width: 400,
    height: 200,
  },
    listView: {
    paddingTop: 0,
    marginBottom: 44,
    backgroundColor: 'LightGray',
  },
    navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // top{
  //   height:60,
  //   flex: 1,
  // },
});

module.exports = MyListView;