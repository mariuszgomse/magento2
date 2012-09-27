/*
 * Ext JS Library 1.1 Beta 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */


Ext.TabPanel=function(container,config){this.el=Ext.get(container,true);if(config){if(typeof config=="boolean"){this.tabPosition=config?"bottom":"top";}else{Ext.apply(this,config);}}
if(this.tabPosition=="bottom"){this.bodyEl=Ext.get(this.createBody(this.el.dom));this.el.addClass("x-tabs-bottom");}
this.stripWrap=Ext.get(this.createStrip(this.el.dom),true);this.stripEl=Ext.get(this.createStripList(this.stripWrap.dom),true);this.stripBody=Ext.get(this.stripWrap.dom.firstChild.firstChild,true);if(Ext.isIE){Ext.fly(this.stripWrap.dom.firstChild).setStyle("overflow-x","hidden");}
if(this.tabPosition!="bottom"){this.bodyEl=Ext.get(this.createBody(this.el.dom));this.el.addClass("x-tabs-top");}
this.items=[];this.bodyEl.setStyle("position","relative");this.active=null;this.activateDelegate=this.activate.createDelegate(this);this.addEvents({"tabchange":true,"beforetabchange":true});Ext.EventManager.onWindowResize(this.onResize,this);this.cpad=this.el.getPadding("lr");this.hiddenCount=0;Ext.TabPanel.superclass.constructor.call(this);};Ext.extend(Ext.TabPanel,Ext.util.Observable,{tabPosition:"top",currentTabWidth:0,minTabWidth:40,maxTabWidth:250,preferredTabWidth:175,resizeTabs:false,monitorResize:true,addTab:function(id,text,content,closable){var item=new Ext.TabPanelItem(this,id,text,closable);this.addTabItem(item);if(content){item.setContent(content);}
return item;},getTab:function(id){return this.items[id];},hideTab:function(id){var t=this.items[id];if(!t.isHidden()){t.setHidden(true);this.hiddenCount++;this.autoSizeTabs();}},unhideTab:function(id){var t=this.items[id];if(t.isHidden()){t.setHidden(false);this.hiddenCount--;this.autoSizeTabs();}},addTabItem:function(item){this.items[item.id]=item;this.items.push(item);if(this.resizeTabs){item.setWidth(this.currentTabWidth||this.preferredTabWidth);this.autoSizeTabs();}else{item.autoSize();}},removeTab:function(id){var items=this.items;var tab=items[id];if(!tab)return;var index=items.indexOf(tab);if(this.active==tab&&items.length>1){var newTab=this.getNextAvailable(index);if(newTab)newTab.activate();}
this.stripEl.dom.removeChild(tab.pnode.dom);if(tab.bodyEl.dom.parentNode==this.bodyEl.dom){this.bodyEl.dom.removeChild(tab.bodyEl.dom);}
items.splice(index,1);delete this.items[tab.id];tab.fireEvent("close",tab);tab.purgeListeners();this.autoSizeTabs();},getNextAvailable:function(start){var items=this.items;var index=start;while(index<items.length){var item=items[++index];if(item&&!item.isHidden()){return item;}}
index=start;while(index>=0){var item=items[--index];if(item&&!item.isHidden()){return item;}}
return null;},disableTab:function(id){var tab=this.items[id];if(tab&&this.active!=tab){tab.disable();}},enableTab:function(id){var tab=this.items[id];tab.enable();},activate:function(id){var tab=this.items[id];if(!tab){return null;}
if(tab==this.active){return tab;}
var e={};this.fireEvent("beforetabchange",this,e,tab);if(e.cancel!==true&&!tab.disabled){if(this.active){this.active.hide();}
this.active=this.items[id];this.active.show();this.fireEvent("tabchange",this,this.active);}
return tab;},getActiveTab:function(){return this.active;},syncHeight:function(targetHeight){var height=(targetHeight||this.el.getHeight())-this.el.getBorderWidth("tb")-this.el.getPadding("tb");var bm=this.bodyEl.getMargins();var newHeight=height-(this.stripWrap.getHeight()||0)-(bm.top+bm.bottom);this.bodyEl.setHeight(newHeight);return newHeight;},onResize:function(){if(this.monitorResize){this.autoSizeTabs();}},beginUpdate:function(){this.updating=true;},endUpdate:function(){this.updating=false;this.autoSizeTabs();},autoSizeTabs:function(){var count=this.items.length;var vcount=count-this.hiddenCount;if(!this.resizeTabs||count<1||vcount<1||this.updating)return;var w=Math.max(this.el.getWidth()-this.cpad,10);var availWidth=Math.floor(w/vcount);var b=this.stripBody;if(b.getWidth()>w){var tabs=this.items;this.setTabWidth(Math.max(availWidth,this.minTabWidth)-2);if(availWidth<this.minTabWidth){}}else{if(this.currentTabWidth<this.preferredTabWidth){this.setTabWidth(Math.min(availWidth,this.preferredTabWidth)-2);}}},getCount:function(){return this.items.length;},setTabWidth:function(width){this.currentTabWidth=width;for(var i=0,len=this.items.length;i<len;i++){if(!this.items[i].isHidden())this.items[i].setWidth(width);}},destroy:function(removeEl){Ext.EventManager.removeResizeListener(this.onResize,this);for(var i=0,len=this.items.length;i<len;i++){this.items[i].purgeListeners();}
if(removeEl===true){this.el.update("");this.el.remove();}}});Ext.TabPanelItem=function(tabPanel,id,text,closable){this.tabPanel=tabPanel;this.id=id;this.disabled=false;this.text=text;this.loaded=false;this.closable=closable;this.bodyEl=Ext.get(tabPanel.createItemBody(tabPanel.bodyEl.dom,id));this.bodyEl.setVisibilityMode(Ext.Element.VISIBILITY);this.bodyEl.setStyle("display","block");this.bodyEl.setStyle("zoom","1");this.hideAction();var els=tabPanel.createStripElements(tabPanel.stripEl.dom,text,closable);this.el=Ext.get(els.el,true);this.inner=Ext.get(els.inner,true);this.textEl=Ext.get(this.el.dom.firstChild.firstChild.firstChild,true);this.pnode=Ext.get(els.el.parentNode,true);this.el.on("mousedown",this.onTabMouseDown,this);this.el.on("click",this.onTabClick,this);if(closable){var c=Ext.get(els.close,true);c.dom.title=this.closeText;c.addClassOnOver("close-over");c.on("click",this.closeClick,this);}
this.addEvents({"activate":true,"beforeclose":true,"close":true,"deactivate":true});this.hidden=false;Ext.TabPanelItem.superclass.constructor.call(this);};Ext.extend(Ext.TabPanelItem,Ext.util.Observable,{purgeListeners:function(){Ext.util.Observable.prototype.purgeListeners.call(this);this.el.removeAllListeners();},show:function(){this.pnode.addClass("on");this.showAction();if(Ext.isOpera){this.tabPanel.stripWrap.repaint();}
this.fireEvent("activate",this.tabPanel,this);},isActive:function(){return this.tabPanel.getActiveTab()==this;},hide:function(){this.pnode.removeClass("on");this.hideAction();this.fireEvent("deactivate",this.tabPanel,this);},hideAction:function(){this.bodyEl.hide();this.bodyEl.setStyle("position","absolute");this.bodyEl.setLeft("-20000px");this.bodyEl.setTop("-20000px");},showAction:function(){this.bodyEl.setStyle("position","relative");this.bodyEl.setTop("");this.bodyEl.setLeft("");this.bodyEl.show();},setTooltip:function(text){if(Ext.QuickTips&&Ext.QuickTips.isEnabled()){this.textEl.dom.qtip=text;this.textEl.dom.removeAttribute('title');}else{this.textEl.dom.title=text;}},onTabClick:function(e){e.preventDefault();this.tabPanel.activate(this.id);},onTabMouseDown:function(e){e.preventDefault();this.tabPanel.activate(this.id);},getWidth:function(){return this.inner.getWidth();},setWidth:function(width){var iwidth=width-this.pnode.getPadding("lr");this.inner.setWidth(iwidth);this.textEl.setWidth(iwidth-this.inner.getPadding("lr"));this.pnode.setWidth(width);},setHidden:function(hidden){this.hidden=hidden;this.pnode.setStyle("display",hidden?"none":"");},isHidden:function(){return this.hidden;},getText:function(){return this.text;},autoSize:function(){this.textEl.setWidth(1);this.setWidth(this.textEl.dom.scrollWidth+this.pnode.getPadding("lr")+this.inner.getPadding("lr"));},setText:function(text){this.text=text;this.textEl.update(text);this.setTooltip(text);if(!this.tabPanel.resizeTabs){this.autoSize();}},activate:function(){this.tabPanel.activate(this.id);},disable:function(){if(this.tabPanel.active!=this){this.disabled=true;this.pnode.addClass("disabled");}},enable:function(){this.disabled=false;this.pnode.removeClass("disabled");},setContent:function(content,loadScripts){this.bodyEl.update(content,loadScripts);},getUpdateManager:function(){return this.bodyEl.getUpdateManager();},setUrl:function(url,params,loadOnce){if(this.refreshDelegate){this.un('activate',this.refreshDelegate);}
this.refreshDelegate=this._handleRefresh.createDelegate(this,[url,params,loadOnce]);this.on("activate",this.refreshDelegate);return this.bodyEl.getUpdateManager();},_handleRefresh:function(url,params,loadOnce){if(!loadOnce||!this.loaded){var updater=this.bodyEl.getUpdateManager();updater.update(url,params,this._setLoaded.createDelegate(this));}},refresh:function(){if(this.refreshDelegate){this.loaded=false;this.refreshDelegate();}},_setLoaded:function(){this.loaded=true;},closeClick:function(e){var o={};e.stopEvent();this.fireEvent("beforeclose",this,o);if(o.cancel!==true){this.tabPanel.removeTab(this.id);}},closeText:"Close this tab"});Ext.TabPanel.prototype.createStrip=function(container){var strip=document.createElement("div");strip.className="x-tabs-wrap";container.appendChild(strip);return strip;};Ext.TabPanel.prototype.createStripList=function(strip){strip.innerHTML='<div class="x-tabs-strip-wrap"><table class="x-tabs-strip" cellspacing="0" cellpadding="0" border="0"><tbody><tr></tr></tbody></table></div>';return strip.firstChild.firstChild.firstChild.firstChild;};Ext.TabPanel.prototype.createBody=function(container){var body=document.createElement("div");Ext.id(body,"tab-body");Ext.fly(body).addClass("x-tabs-body");container.appendChild(body);return body;};Ext.TabPanel.prototype.createItemBody=function(bodyEl,id){var body=Ext.getDom(id);if(!body){body=document.createElement("div");body.id=id;}
Ext.fly(body).addClass("x-tabs-item-body");bodyEl.insertBefore(body,bodyEl.firstChild);return body;};Ext.TabPanel.prototype.createStripElements=function(stripEl,text,closable){var td=document.createElement("td");stripEl.appendChild(td);if(closable){td.className="x-tabs-closable";if(!this.closeTpl){this.closeTpl=new Ext.Template('<a href="#" class="x-tabs-right"><span class="x-tabs-left"><em class="x-tabs-inner">'+'<span unselectable="on"'+(this.disableTooltips?'':' title="{text}"')+' class="x-tabs-text">{text}</span>'+'<div unselectable="on" class="close-icon">&#160;</div></em></span></a>');}
var el=this.closeTpl.overwrite(td,{"text":text});var close=el.getElementsByTagName("div")[0];var inner=el.getElementsByTagName("em")[0];return{"el":el,"close":close,"inner":inner};}else{if(!this.tabTpl){this.tabTpl=new Ext.Template('<a href="#" class="x-tabs-right"><span class="x-tabs-left"><em class="x-tabs-inner">'+'<span unselectable="on"'+(this.disableTooltips?'':' title="{text}"')+' class="x-tabs-text">{text}</span></em></span></a>');}
var el=this.tabTpl.overwrite(td,{"text":text});var inner=el.getElementsByTagName("em")[0];return{"el":el,"inner":inner};}};