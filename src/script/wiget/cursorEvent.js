import { banana } from '../banana';
import { THREE } from 'three';



var cursorEvent = (scope)=>{
	var sensitivity = 10, count = 0;
	var raycaster = new THREE.Raycaster();
	var INTERSECTED = {};

	var group = scope.cursorGroup;
	var ring = group.getObjectByName('cursorRing');
	var mat = ring.material;

	var geos = [];
	for(let i = 0;i<=20;i++){
		var g = new THREE.RingGeometry( 10, 20, 20, 20, 0, Math.PI * i/10 );
		geos.push(g);
	}
	const updateRing = x =>{
		var ring = group.getObjectByName('cursorRing');
		group.remove(ring);
		var t = new THREE.Mesh(geos[x],mat);
		t.name = 'cursorRing';
		group.add(t);
	};
	function tenStepEasing(k) {
		return Math.floor(k * 20) / 20;
	}


	var ringAnimate = banana.makeAnimate({
		from:{x:0},
		to:{x:20},
		duration:1000,
		stop:function(){this.x = 0;updateRing(0)}
	}, function () {
		updateRing(this.x)
	});
	ringAnimate.easing(tenStepEasing);

	banana.subscribe('animate', function () {
		if(count < sensitivity){
			count = count + 1;
			return false;
		}
		count = 0;
		raycaster.setFromCamera( { x: 0, y: 0 }, scope.camera );
		var intersects = raycaster.intersectObjects( banana.canBeChoseObjs );
		if ( intersects.length > 0 ) {

			if ( INTERSECTED != intersects[ 0 ].object ) {

				INTERSECTED.onout && INTERSECTED.onout();
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.onhover && INTERSECTED.onhover();

				ringAnimate.onComplete(INTERSECTED.onclick||null);
				ringAnimate.start();
			}
		}else{
			ringAnimate.stop();
			INTERSECTED.onout && INTERSECTED.onout();
			INTERSECTED = {};
		}
	})

};

export default cursorEvent;