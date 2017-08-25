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
    SOME_CONSTANTS : false,  // some constant
    URL_BOT : 'http://newsletter.pe.hu/app-bot/',
    ELEM_CONVERSATION : 'conversation',

    // Application Constructor
    initialize: function() {
        console.log("console log init");
        this.bindEvents();
        this.initFastClick();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },
    // Phonegap is now ready...
    onDeviceReady: function() {
        console.log("device ready, start making you custom calls!");

        // Start adding your code here....
        this.getAnswer();

    },
    getById: function(id){
        return document.getElementById(id);
    },
    create: function(element, attr, content){
        var e = document.createElement(element);
        e.id = attr.id;
        e.className = attr.class;

        e.appendChild(document.createTextNode(content));

        return e;
    },
    getAnswer: function(data){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            app.translater(this.responseText);
        }
        };
        xhttp.open("POST", app.URL_BOT, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("command=" + data);

        var element = this.create("P", {
            'id': '0',
            'class': 'me'
        }, data);

        this.getById(this.ELEM_CONVERSATION).appendChild(element);
    },
    translater: function(jsonReq){
        var output = JSON.parse(jsonReq);  

        var element = this.create("P", {
            'id': output.messages[0].id,
            'class': 'bot'
        }, output.messages[0].text);

        this.getById(this.ELEM_CONVERSATION).appendChild(element);
    }

};