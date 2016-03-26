var banana = {};
var subscriptions = {};


var slice = [].slice;

window.banana = banana;

banana.subscribe = function ( topic, context, callback, priority ) {

	if (typeof topic !== 'string') {
		throw new Error( "你必须传人一个字符串作为事件名" );
	}

	if (arguments.length === 3 && typeof callback === "number") {
		priority = callback;
		callback = context;
		context = null;
	}
	if (arguments.length === 2) {
		callback = context;
		context = null;
	}
	priority = priority || 10;

	var topicIndex = 0, topics = topic.split( /\s/ ), topicLength = topics.length, added;

	for (; topicIndex < topicLength; topicIndex++) {
		topic = topics[topicIndex];
		added = false;

		if (!subscriptions[topic]) {
			subscriptions[topic] = [];
		}
		var i = subscriptions[topic].length - 1, subscriptionInfo = {
			callback: callback, context: context, priority: priority
		};

		for (; i >= 0; i--) {
			if (subscriptions[topic][i].priority <= priority) {
				subscriptions[topic].splice( i + 1, 0, subscriptionInfo );
				added = true;
				break;
			}
		}

		if (!added) {
			subscriptions[topic].unshift( subscriptionInfo );
		}
	}
	return callback;

};
banana.unsubscribe = function ( topic, context, callback ) {
	if (typeof topic !== "string") {
		throw new Error( "You must provide a valid topic to remove a subscription." );
	}
	console.log( 1111111111 );
	if (arguments.length === 2) {
		callback = context;
		context = null;
	}

	if (!subscriptions[topic]) {
		return;
	}

	var length = subscriptions[topic].length, i = 0;

	for (; i < length; i++) {
		if (subscriptions[topic][i].callback === callback) {
			if (!context || subscriptions[topic][i].context === context) {
				subscriptions[topic].splice( i, 1 );

				// Adjust counter and length for removed item
				i--;
				length--;
			}
		}
	}
};
banana.publish = function ( topic ) {

	if (typeof topic !== 'string') {
		throw new Error( "你必须传人一个字符串作为事件名" );
	}

	var args = slice.call( arguments, 1 ), topicSubscriptions, subscription, length, i = 0, ret;

	if (!subscriptions[topic]) {
		return true;
	}

	topicSubscriptions = subscriptions[topic].slice();
	for (length = topicSubscriptions.length; i < length; i++) {
		subscription = topicSubscriptions[i];
		ret = subscription.callback.apply( subscription.context, args );
		if (ret === false) {
			break;
		}
	}
	return ret !== false;
};

banana.ajax = function ( obj ) {
	this.xhr = new XMLHttpRequest();

	obj.type = obj.type || 'GET';
	obj.data = obj.data || null;

	try {
		this.xhr.open( obj.type, obj.url, true );
		this.xhr.send( obj.data );
	} catch (err) {
		throw err;
	}
	this.xhr.done = function ( callback ) {
		if (typeof callback !== 'function') {
			console.warn( 'not function' );
			return false;
		}
		this.onload = function ( data ) {
			callback( data.target.responseText );
		};
		return this;
	};
	return this.xhr;
};

//banana.ajax.prototype.done = function (callback){
//	if (typeof callback !== 'function') {
//		console.warn('not function');
//		return false;
//	}
//	this.xhr.onload = callback;
//	return this;
//};
banana.userAgent = navigator.userAgent.toLowerCase();
banana.device = {
	idIpad: (()=>banana.userAgent.match( /ipad/i ) == "ipad")(),
	idIphone: (()=>banana.userAgent.match( /iphone os/i ) == "iphone os")(),
	isAndroid: (() => banana.userAgent.match( /android/i ) == "android")(),
	isMobile: (() => banana.userAgent.match( /mobile/i ) == "mobile")()
};
//banana.browserRedirect = function () {
//	let device = this.device = {};
//	var sUserAgent = navigator.userAgent.toLowerCase();
//
//	device.isIpad = sUserAgent.match( /ipad/i ) == "ipad";
//	device.isIphone = sUserAgent.match( /iphone os/i ) == "iphone os";
//	device.isMidp = sUserAgent.match( /midp/i ) == "midp";
//	device.isUc7 = sUserAgent.match( /rv:1.2.3.4/i ) == "rv:1.2.3.4";
//	device.isUc = sUserAgent.match( /ucweb/i ) == "ucweb";
//	device.isAndroid = sUserAgent.match( /android/i ) == "android";
//	device.isCE = sUserAgent.match( /windows ce/i ) == "windows ce";
//	device.isWM = sUserAgent.match( /windows mobile/i ) == "windows mobile";
//
//};

function upload(url,from,option){

// 实例化一个表单数据对象
	var formData = new FormData();

	for (var i = 0, file; file = from[i]; i++) {
		// 文件名称，文件对象
		formData.append(file.name, file);
	}
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		option.onload();
		this._success();
	};
	xhr.onerror = function (  ) {
		option.onerror();
		this._error();
	};

	xhr.open("POST", url, true);

// 发送表单数据
	xhr.send(formData);

	xhr.then = function( success, error ){
		this._success = success;
		this._error = error;
	};

	return xhr;

}




export { banana } ;
