"use strict";var app=angular.module("stenoApp",["ngAnimate","ngRoute","mm.foundation","elasticsearch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/search/:queryInput",{templateUrl:"views/results.html",controller:"ResultsCtrl"}).otherwise({redirectTo:"/"})}]).constant("euiHost","http://steno.fm:9200");app.factory("GlobalService",[function(){var a={hiddenStatus:!0,isHiddenChrome:function(){return this.hiddenStatus},showChrome:function(){this.hiddenStatus=!1},hideChrome:function(){this.hiddenStatus=!0},toggleChrome:function(){this.hiddenStatus=!this.hiddenStatus},focusSearchField:function(){var a=document.getElementById("query");a&&a.focus()},query:{input:""},submitQuery:function(a){console.log("GlobalService.submitQuery() called"),this.query=a}};return a}]),app.service("ResultsService",["esFactory",function(a){return a({host:"steno.fm:9200",apiVersion:"1.4",log:"trace"})}]),app.controller("MainCtrl",["$scope",function(a){a.keypress=function(){document.getElementById("query").focus()}}]),app.controller("HomeCtrl",["$scope","$http","$location","GlobalService",function(a,b,c,d){a.isLoading=!1,a.getLocation=function(a){return b.get("http://maps.googleapis.com/maps/api/geocode/json",{params:{address:a,sensor:!1}}).then(function(a){var b=[];return angular.forEach(a.data.results,function(a){b.push(a.formatted_address)}),b})},a.submitQueryInput=function(){c.path("/search/"+a.query.input)},d.hideChrome()}]),app.controller("SearchCtrl",["$scope","$http","$location","GlobalService",function(a,b,c){a.isLoading=!1,a.getLocation=function(a){return b.get("http://maps.googleapis.com/maps/api/geocode/json",{params:{address:a,sensor:!1}}).then(function(a){var b=[];return angular.forEach(a.data.results,function(a){b.push(a.formatted_address)}),b})},a.submitQueryInput=function(){console.log("SearchCtrl $scope.submitQueryInput() called"),c.path("/search/"+a.query.input)}}]),app.controller("ResultsCtrl",["$scope","$http","$routeParams","$location","ResultsService","GlobalService",function(a,b,c,d,e,f){f.showChrome(),a.query={input:"",title:"",speaker:"",rest:"uninitialized"};var g=function(b){for(var c=a.query.rest.split(" "),d=0;d<c.length;d++){var e=c[d].split(":");if(e[0]===b)return a.query.rest=a.query.rest.replace(e[0]+":"+e[1],""),e[1]}};a.parseQuery=function(){a.query.rest=a.query.input.toLowerCase().trim(),a.query.speaker=g("speaker"),a.query.title=g("podcast")||g("title"),console.log("ResultsCtrl.parseQuery done on $scope.query:",a.query)};var h=function(){console.log("ResultsCtrl $scope.getResults() called."),e.search({index:"episodes",body:{query:{match:{_all:a.query.input}}}}).then(function(b){console.log("ResultsCtrl $scope.getResults() success: body: ",b);var c=b.hits.hits;a.results=c},function(a){console.trace(a.message)})};a.query.input=c.queryInput,h(),a.submitInput=function(){console.log("ResultsCtrl $scope.submitQueryInput() called"),a.parseQuery(),d.path("/search/"+a.query.input.trim()),h()}}]);