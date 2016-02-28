
var banana = {};

banana.listener.children = [];

banana.listener.prototype.register = function (typeName, fn) {

    console.log(this);
}

export default banana;