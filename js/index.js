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
    
    app.resizeMap();
		
    var map = L.map('map-canvas').setView([41.375553,2.149284], 15);
		
    //this works, but is online:
    /*
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
    }).addTo(map);
    */

    //TODO build something to fall back to web if not found.
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17
    }).addTo(map);


    var greenIcon = L.icon({
        iconUrl: 'img/iconBBF.png',
        //shadowUrl: 'leaf-shadow.png',
        iconSize:     [75, 75], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [35, 75], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([41.375553,2.149284], {icon: greenIcon}).addTo(map)
                .bindPopup("<b>Barcelona Beer Festival</b><br />8, 9 y 10 de Marzo.").openPopup();
    /*L.marker([45.423, -75.679]).addTo(map)
            .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();*/

    var popup = L.popup();

    function onMapClick(e) {
            popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
    }

    map.on('click', onMapClick);
    function onLocationFound(e) {
            var radius = e.accuracy / 2;

            L.marker(e.latlng).addTo(map)
                    .bindPopup("Usted está alrededor de " + radius + " metros de este punto").openPopup();

            L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
            alert(e.message);
    }
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

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
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
      alert("entra");
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },
  initPluginDemo: function () {
    document.getElementById('pluginsDemoDiv').setAttribute('style', 'display:block');
  },
    resizeMap: function() {
             $("#map-canvas").height(Math.max(100,$(window).height()-90));// TODO set 
    }
};


        $(window).resize(function() {
                app.resizeMap();
        });

function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf("android") > -1;
}

function isIOS() {
  return navigator.userAgent.match(/(iPad|iPhone|iPod)/i) != null;
}