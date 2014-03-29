/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    if (isIOS() || isAndroid()) {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    } else {
      this.onDeviceReady();
    }
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    app.receivedEvent('deviceready');
    app.initPluginDemo();
    app.startWatch();
    var watchHeadingID = null;
    var watchPositionID = null;
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },
    startWatch: function(){
         // Update compass every 3 seconds
        var options = { frequency: 1000 };

        watchHeadingID = navigator.compass.watchHeading(onHeadingSuccess, onHeadingError, options);
        watchPositionID = navigator.geolocation.watchPosition(onPositionSuccess, onPositionError, options);
    },
    stopWatch: function(){
        if (watchPositionID) {
            navigator.geolocation.clearPosition(watchPositionID);
            watchPositionID = null;
        }
    },
   onHeadingSuccess: function(){
       document.getElementById('heading').innerHTML = heading;
   },
   onHeadingError: function(){
       alert('onHeadingError!');
   },
   onPositionSuccess:function(position){
       alert(
'Latitude: ' + position.coords.latitude + '<br />' +
'Longitude: ' + position.coords.longitude + '<br />' +
'Altitude: ' + position.coords.altitude + '<br />' +
'Accuracy: ' + position.coords.accuracy + '<br />' +
'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
'Heading: ' + position.coords.heading + '<br />' +
'Speed: ' + position.coords.speed + '<br />' +
'Timestamp: ' + new Date(position.timestamp) + '<br />');
   },
  initPluginDemo: function () {
    document.getElementById('pluginsDemoDiv').setAttribute('style', 'display:block');
  }
};

function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf("android") > -1;
}

function isIOS() {
  return navigator.userAgent.match(/(iPad|iPhone|iPod)/i) != null;
}