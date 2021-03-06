'use strict'

var React = require('react-native');
var { NativeModules, requireNativeComponent } = React;

var MapMixins = {
  setDirectionAnimated(mapRef, heading) {
    NativeModules.MapboxGLManager.setDirectionAnimated(React.findNodeHandle(this.refs[mapRef]), heading);
  },
  setZoomLevelAnimated(mapRef, zoomLevel) {
    NativeModules.MapboxGLManager.setZoomLevelAnimated(React.findNodeHandle(this.refs[mapRef]), zoomLevel);
  },
  setCenterCoordinateAnimated(mapRef, latitude, longitude) {
    NativeModules.MapboxGLManager.setCenterCoordinateAnimated(React.findNodeHandle(this.refs[mapRef]), latitude, longitude);
  },
  setCenterCoordinateZoomLevelAnimated(mapRef, latitude, longitude, zoomLevel) {
    NativeModules.MapboxGLManager.setCenterCoordinateZoomLevelAnimated(React.findNodeHandle(this.refs[mapRef]), latitude, longitude, zoomLevel);
  },
  addAnnotations(mapRef, annotations) {
    NativeModules.MapboxGLManager.addAnnotations(React.findNodeHandle(this.refs[mapRef]), annotations);
  },
  selectAnnotationAnimated(mapRef, selectedIdentifier) {
    NativeModules.MapboxGLManager.selectAnnotationAnimated(React.findNodeHandle(this.refs[mapRef]), selectedIdentifier);
  },
  removeAnnotation(mapRef, selectedIdentifier) {
    NativeModules.MapboxGLManager.removeAnnotation(React.findNodeHandle(this.refs[mapRef]), selectedIdentifier);
  },
  removeAllAnnotations(mapRef) {
    NativeModules.MapboxGLManager.removeAllAnnotations(React.findNodeHandle(this.refs[mapRef]));
  },
  setVisibleCoordinateBoundsAnimated(mapRef, latitudeSW, longitudeSW, latitudeNE, longitudeNE, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    NativeModules.MapboxGLManager.setVisibleCoordinateBoundsAnimated(React.findNodeHandle(this.refs[mapRef]), latitudeSW, longitudeSW, latitudeNE, longitudeNE, paddingTop, paddingRight, paddingBottom, paddingLeft);
  },
  setUserTrackingMode(mapRef, userTrackingMode) {
    NativeModules.MapboxGLManager.setUserTrackingMode(React.findNodeHandle(this.refs[mapRef]), userTrackingMode);
  },
  setTilt(mapRef, tilt) {
    NativeModules.MapboxGLManager.setTilt(React.findNodeHandle(this.refs[mapRef]), tilt);
  },
  mapStyles: NativeModules.MapboxGLManager.mapStyles,
  userTrackingMode: NativeModules.MapboxGLManager.userTrackingMode
};

var ReactMapView = requireNativeComponent('RCTMapbox', {
    name: 'RCTMapbox',
    propTypes: {
      accessToken: React.PropTypes.string.isRequired,
      annotations: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        coordinates: React.PropTypes.array.isRequired,
        alpha: React.PropTypes.number,
        fillColor: React.PropTypes.string,
        strokeColor: React.PropTypes.string,
        strokeWidth: React.PropTypes.number
      })),
      centerCoordinate: React.PropTypes.shape({
        latitude: React.PropTypes.number.isRequired,
        longitude: React.PropTypes.number.isRequired
      }),
      centerCoordinateZoom: React.PropTypes.shape(),
      debugActive: React.PropTypes.bool,
      direction: React.PropTypes.number,
      rotateEnabled: React.PropTypes.bool,
      scrollEnabled: React.PropTypes.bool,
      showsUserLocation: React.PropTypes.bool,
      styleUrl: React.PropTypes.string,
      userTrackingMode: React.PropTypes.number,
      zoomEnabled: React.PropTypes.bool,
      zoomLevel: React.PropTypes.number,
      tilt: React.PropTypes.number,
      compassIsHidden: React.PropTypes.bool,
      onRegionChange: React.PropTypes.func,
      onUserLocationChange: React.PropTypes.func,
      // Fix for https://github.com/mapbox/react-native-mapbox-gl/issues/118
      scaleY: React.PropTypes.number,
      scaleX: React.PropTypes.number,
      translateY: React.PropTypes.number,
      translateX: React.PropTypes.number,
      rotation: React.PropTypes.number,
      // Fix for https://github.com/mapbox/react-native-mapbox-gl/issues/175
      renderToHardwareTextureAndroid: React.PropTypes.bool,
      onLayout: React.PropTypes.bool,
      accessibilityLiveRegion: React.PropTypes.string,
      accessibilityComponentType: React.PropTypes.string,
      accessibilityLabel: React.PropTypes.string,
      testID: React.PropTypes.string,
      importantForAccessibility: React.PropTypes.string
    },
    defaultProps() {
      return {
        centerCoordinate: {
          latitude: 0,
          longitude: 0
        },
        debugActive: false,
        direction: 0,
        rotateEnabled: true,
        scrollEnabled: true,
        showsUserLocation: false,
        styleUrl: NativeModules.MapboxGLManager.mapStyles.streets,
        userTrackingMode: NativeModules.MapboxGLManager.userTrackingMode.none,
        zoomEnabled: true,
        zoomLevel: 0,
        tilt: 0,
        compassIsHidden: false
      };
    }
});

var ReactMapViewWrapper = React.createClass({
  statics: {
    Mixin: MapMixins
  },
  handleOnChange(event) {
    if (this.props.onRegionChange) this.props.onRegionChange(event.nativeEvent.src);
  },
  handleUserLocation(event) {
    if (this.props.onUserLocationChange) this.props.onUserLocationChange(event.nativeEvent.src);
  },
  render() {
    return (
      <ReactMapView
        {...this.props}
        onChange={this.handleOnChange}
        onSelect={this.handleUserLocation} />
    );
  }
});

module.exports = ReactMapViewWrapper;
