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

/*
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        bluetoothSerial.list(function(objectlist){
            var div = document.getElementById('output');
            div.innerHTML = div.innerHTML + JSON.stringify(objectlist);
        }, function(){
            var div = document.getElementById('output');
            div.innerHTML = div.innerHTML + "failed to get list";
        });

        try {
            bluetoothSerial.connect("0C:1E:08:0F:32:23", app.btConnectSuccess, app.btConnectFailure);
        }
        catch(err) {
            app.showOutput(err.message);
        }
        
        app.showOutput("test");

    },
    
    btConnectSuccess: function() {
        bluetoothSerial.subscribe('\n', app.newData, app.btConnectFailure);
    },
    
    newData: function(data) {
        app.showOutput(data);
    },
    
    btConnectFailure: function() {
        app.showOutput("SHIT");
    },
    
    showOutput: function(op) {
        var div = document.getElementById('output');
        div.innerHTML = div.innerHTML + op;        
    }
};*/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        // Test Bluetooth Serial Plugin
        bluetoothSerial.isEnabled(
            function() { 
                alert("Bluetooth is enabled");
            },
            function() { 
                alert("Bluetooth is *not* enabled");
            }
        );   
        
        try {
            bluetoothSerial.connect("0C:1E:08:0F:32:23", app.btConnectSuccess, app.btConnectFailure);
        }
        catch(err) {
            app.showOutput(err.message);
        }
        
        /*bluetoothSerial.list(function(objectlist){
            app.showOutput(JSON.stringify(objectlist));
        }, function(){
            app.showOutput("failed to get list");
        });*/
        
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    btConnectSuccess: function() {
        bluetoothSerial.subscribe('\n', app.newData, app.btConnectFailure);
        try {
            window.plugin.backgroundMode.enable();
        }
        catch(err) {
            app.showOutput("Background mode failed: " + err.message);
        }
    },
    
    newData: function(data) {
        app.showOutput(" Newdata!:");
        app.showOutput(data);
        navigator.notification.beep(1);
        navigator.notification.vibrate(1);
    },
    
    lostConnection: function() {
        app.showOutput("No Carrier");
    },
    
    btConnectFailure: function() {
        app.showOutput("SHIT");
        window.plugin.backgroundMode.disable();
    },
    
    showOutput: function(op) {
        var div = document.getElementById('output');
        div.innerHTML = div.innerHTML + op;        
    }
};
