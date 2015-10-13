/*\

title: $:/plugins/felixhayashi/tiddlymap/js/fixer
type: application/javascript
module-type: library

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var t=require("$:/plugins/felixhayashi/tiddlymap/js/utils").utils;var e=require("$:/plugins/felixhayashi/tiddlymap/js/Adapter").Adapter;var r=require("$:/plugins/felixhayashi/tiddlymap/js/ViewAbstraction").ViewAbstraction;var a=require("$:/plugins/felixhayashi/tiddlymap/js/EdgeType").EdgeType;var i=function(e,r){var i=t.getByPrefix(e);for(var s=0;s<i.length;s++){var d=t.getBasename(i[s]);if(d==="__noname__"){d="tmap:unknown"}d=new a(d);if(!d.exists())d.save();var u=$tw.wiki.getTiddlerData(i[s]);for(var f=0;f<u.length;f++){u[f].type=(r?r+":":"")+d.id;$tw.tmap.adapter.insertEdge(u[f])}$tw.wiki.deleteTiddler(i[s])}};var s=function(e,r,a){if(t.isLeftVersionGreater(e,r)){$tw.tmap.logger("debug","Upgrading data structure to "+e);a();t.setEntry($tw.tmap.opt.ref.sysMeta,"dataStructureState",e)}};var d={};d.fixId=function(){var e=$tw.wiki.getTiddlerData($tw.tmap.opt.ref.sysMeta,{});var r={before:"0.9.0",after:"0.9.2"};if(t.isLeftVersionGreater(r.before,e.dataStructureState)){$tw.tmap.logger("debug","Upgrading data structure to",r.after);if(t.isLeftVersionGreater("0.9.2",e.originalVersion)){var a="$:/plugins/felixhayashi/tiddlymap/config/sys/user";var i=t.getEntry(a,"field.nodeId","tmap.id");t.moveFieldValues(i,"tmap.id",true,false)}t.setEntry($tw.tmap.opt.ref.sysMeta,"dataStructureState",r.after)}};d.fix=function(){var e=$tw.wiki.getTiddlerData($tw.tmap.opt.ref.sysMeta,{});$tw.tmap.logger("debug","Fixer is started");$tw.tmap.logger("debug","Data-structure currently in use: ",e.dataStructureState);var a={before:"0.6.11",after:"0.7.0"};if(t.isLeftVersionGreater(a.before,e.dataStructureState)){$tw.tmap.logger("debug","Upgrading data structure to",a.after);i("$:/plugins/felixhayashi/tiddlymap/graph/edges",null);var u=$tw.tmap.opt.selector.allViews;var f=t.getMatches(u);for(var g=0;g<f.length;g++){var n=new r(f[g]);i(n.getRoot()+"/graph/edges",n)}t.setEntry($tw.tmap.opt.ref.sysMeta,"dataStructureState",a.after)}var a={before:"0.7.31",after:"0.7.32"};if(t.isLeftVersionGreater(a.before,e.dataStructureState)){$tw.tmap.logger("debug","Upgrading data structure to",a.after);var o=$tw.tmap.adapter.getView("Live View");o.setNodeFilter("[field:title{$:/temp/tmap/currentTiddler}]",true);o.setConfig({"refresh-trigger":null,"refresh-triggers":$tw.utils.stringifyList(["$:/temp/tmap/currentTiddler"])});t.setEntry($tw.tmap.opt.ref.sysMeta,"dataStructureState",a.after)}var a={before:"0.7.32",after:"0.9.0"};if(t.isLeftVersionGreater(a.before,e.dataStructureState)){$tw.tmap.logger("debug","Upgrading data structure to",a.after);var p=$tw.tmap.opt.ref.visUserConf;var l=t.unflatten($tw.wiki.getTiddlerData(p,{}));if(typeof l.groups==="object"){var w=new $tw.tmap.NodeType("tmap:neighbour");w.setStyle(l.groups["neighbours"]);w.save();delete l.groups;$tw.wiki.setTiddlerData(p,l)}t.setEntry($tw.tmap.opt.ref.sysMeta,"dataStructureState",a.after)}d.fixId();s("0.9.16",e.dataStructureState,function(){var t=$tw.tmap.indeces.glNTy;for(var e=t.length;e--;){t[e].save(null,true)}})};exports.fixer=d})();