/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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
} from 'react-native';



var REQUEST_URL = 'http://127.0.0.1:3000/users/list';
var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

const shareImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAACIlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8xtw6+AAAAtXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGhscHR4fICEiIyQlJicqKywuLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0lKS0xNTk9QUVJUVVdYWVxeX2FiY2RmZ2hpa2xtb3Bxc3R1d3h7f4CCg4WGiImLjI6PkZKUlZeYmpudnqCio6WmqKqrra+wsrS1t7m6vL7AwcPFx8jKzM7P0dPV19na3N7g4uTm6Onr7e/x8/X3+fv909B6DgAADGpJREFUeNrtXftfE8cWn2yAxPIKLxW41JqI6CU8Lg1cUQpYleKt9sa01+oVpbZqtfVVERVQtBaNPGpFEFQ0FBUqUBQM+/9dgt6PSjOzZ3YHMmeX7+9zMt+T3dkzZ875DiHooSS7qxtbg32hifBEqC/Y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';

var RandPage = React.createClass({
getInitialState: function() {
  console.log('getInitialState');
    return {

      isLoading: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: '',
      queryNumber: 0,
    };
  },

  pushPage:function() {
    this.props.navigator.push({
      title: 'New Page',
      component: <NewPage/>
    });
  },
  componentDidMount:function(){
    console.log('componentDidMount');
          this.props.navComponent.setNavItems({
      title: {
        component: (
          <Text style={styles.title}>
          随机
          </Text>
        ),
        event: function() {
          this.fetchData();
        }.bind(this)
      }
    }),
    this.fetchData();
  },

  onRefresh:function() {
    this.fetchData();
  },
//数据查询.
  fetchData:function(){
    var page = Math.random() * 1000;
    page = Math.floor(page);
      var url = REQUEST_URL + '?page=' + page;
      fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          AlertIOS.alert('没有数据');
                    this.setState({
            loaded: false,
          });
        })
        .then((responseData) => {
          if(responseData){
              this.setState({
              dataSource: this.state.dataSource.cloneWithRows(responseData.datas),
              loaded: true,
            });
          }else{
            this.setState({
                loaded: false,
              });
          }
          
           // console.log(responseData.datas);

        })
        .done();
  },

 render:function(){
  // return this.renderLoadingView();
  
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        renderSeparator={this.renderMovieRow}
        style={styles.listView}/>
    );
  },

  renderLoadingView:function(){
    return (
      <TouchableOpacity onPress={() =>this.fetchData()} style={styles.container} >
      <View style={styles.container}>
        <Text>
          点击刷新
        </Text>
        <Image source={require('./../../../Desktop/ReactDemo/testdemo/bottom_ic_first_up.png')}>
        </Image>
      </View>
      </TouchableOpacity>
    );
  },
  renderMovieRow:function(sectionID, rowID, adjacentRowHighlighted){
        return (
      <View style={styles.topContainer} key={rowID}>

      </View>
    );
  },

 renderMovie:function(movie,sectionID, rowID, highlightRow){
    return (
      
      <View style={styles.container} key={rowID}>
        <Image
          source={{uri: movie.imageurl}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
      </View>
    );
  }
});

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

module.exports = RandPage;
