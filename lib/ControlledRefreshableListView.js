var React = require('react-native')
var {
  PropTypes,
  StyleSheet,
  ActivityIndicatorIOS,
  View,
  Text,
} = React
var ListView = require('./ListView')
var createElementFrom = require('./createElementFrom')
var RefreshingIndicator = require('./RefreshingIndicator')
var isPromise = require('is-promise')
var delay = require('./delay')

const SCROLL_EVENT_THROTTLE = 32
const MIN_PULLDOWN_DISTANCE = 40

const LISTVIEW_REF = 'listview'

var ControlledRefreshableListView = React.createClass({
  propTypes: {
    onRefresh: PropTypes.func.isRequired,
    minDisplayTime: PropTypes.number,
    minBetweenTime: PropTypes.number,
    isRefreshing: PropTypes.bool.isRequired,
    refreshDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    waitingDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    refreshingIndictatorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    minPulldownDistance: PropTypes.number,
    ignoreInertialScroll: PropTypes.bool,
    scrollEventThrottle: PropTypes.number,
    onScroll: PropTypes.func,
    renderHeader: PropTypes.func,
    renderHeaderWrapper: PropTypes.func,
    onResponderGrant: PropTypes.func,
    onResponderRelease: PropTypes.func,
  },
  getInitialState() {
    return {
      refreshstate: 1,//1普通，2下拉中，3下拉可以松手，4刷新中
    }
  },
  getDefaultProps() {
    return {
      minDisplayTime: 300,
      minBetweenTime: 300,
      minPulldownDistance: MIN_PULLDOWN_DISTANCE,
      scrollEventThrottle: SCROLL_EVENT_THROTTLE,
      ignoreInertialScroll: true,
      refreshingIndictatorComponent: RefreshingIndicator,
    }
  },
  handleScroll(e) {
    var scrollY = e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y

    if (this.beginTouch && (this.state.refreshstate==2 || this.state.refreshstate==1) && scrollY< -this.props.minPulldownDistance) {
        this.setState({
          refreshstate: 3,
      })
    }else if(this.beginTouch && this.state.refreshstate==1 && (scrollY < -20)){
        this.setState({
          refreshstate: 2,
      })
    }

    
    if (this.endTouch || (!this.endTouch && !this.props.ignoreInertialScroll)) {
      if (scrollY < -this.props.minPulldownDistance) {
        if (!this.props.isRefreshing) {

              this.setState({
               refreshstate: 4,
            })
          if (this.props.onRefresh ) {
            this.props.onRefresh()
          }
        }
      }
    }

    this.props.onScroll && this.props.onScroll(e)
  },
  handleResponderGrant() {

    this.endTouch = false
    this.beginTouch = true
    this.isTouching = true
    if (this.props.onResponderGrant) {
      this.props.onResponderGrant.apply(null, arguments)
    }
  },
  handleResponderRelease() {
    this.endTouch = true
    this.beginTouch = false
    this.isTouching = false
    if(this.state.refreshstate == 2){
      this.setState({refreshstate:1})
    }
    if(this.state.refreshstate == 3){
      this.setState({refreshstate:4})
    }
    if (this.props.onResponderRelease) {
      this.props.onResponderRelease.apply(null, arguments)
    }
  },
  getScrollResponder() {
    return this.refs[LISTVIEW_REF].getScrollResponder()
  },
  setNativeProps(props) {
    this.refs[LISTVIEW_REF].setNativeProps(props)
  },
  renderHeader() {
    var description = this.props.refreshDescription
    var waiting = '松手即可刷新'
    var isscroll = '下拉可以刷新'
    var refreshingIndictator
    if (this.state.refreshstate == 4) {
      // console.log('正在刷新')
      Promise.all([
        delay(this.props.minDisplayTime),
      ])
        .then(() => {
                if (!this.props.isRefreshing) {this.setState({refreshstate:1})};
        })
    // })
      refreshingIndictator = createElementFrom(this.props.refreshingIndictatorComponent, {description:description})
    } else {
      if (this.state.refreshstate == 2) {
        console.log(waiting)
      refreshingIndictator = createElementFrom(this.props.refreshingIndictatorComponent, {description:isscroll,stylesheet:{activityIndicator:styles.refreshhide}})
        // return this.renderFoot
      }else if(this.state.refreshstate == 3){
           refreshingIndictator = createElementFrom(this.props.refreshingIndictatorComponent, {description:waiting,stylesheet:{activityIndicator:styles.refreshhide}})

      }else{
           refreshingIndictator = null
      }
        
    }
    if (this.props.renderHeaderWrapper) {
      return this.props.renderHeaderWrapper(refreshingIndictator)
    } else if (this.props.renderHeader) {
      console.warn('renderHeader is deprecated. Use renderHeaderWrapper instead.')
      return this.props.renderHeader(refreshingIndictator)
    } else {
      return refreshingIndictator
    }
  },
  renderFoot(){
    return (
      <View style={styles.tophead}>
      <ActivityIndicatorIOS />
      <Text>下拉刷新</Text>
      </View>
    )
  },
  render() {
    return (
      <ListView
        {...this.props}
        ref={LISTVIEW_REF}
        onScroll={this.handleScroll}
        renderHeader={this.renderHeader}
        scrollEventThrottle={this.props.scrollEventThrottle}
        onResponderGrant={this.handleResponderGrant}
        onResponderRelease={this.handleResponderRelease}
      />
    )
  },
})
const styles = StyleSheet.create({
  tophead:{
    height : 30,
    textAlign:'center',
  },
  refreshhide:{
    opacity:0,
  },
  refreshshow:{
    opacity:100
  }
});
ControlledRefreshableListView.DataSource = ListView.DataSource
ControlledRefreshableListView.RefreshingIndicator = RefreshingIndicator

module.exports = ControlledRefreshableListView
