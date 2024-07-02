var renderer, cWidth, cHeight, camera, scene, totalGroup, mainLight, controls, loadPro = 0, object;
const urlStr = window.location.search.substring(1);

document.addEventListener("DOMContentLoaded", function() {
	setCanvasSize();
	initCanvas();
	animate();
});

function initCanvas() {
	renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
	renderer.setSize(cWidth, cHeight);
	if (!document.getElementById("container")) return false;
	document.getElementById("container").appendChild(renderer.domElement);
	const backCol = (urlStr === "CountrySide_railingRebuild_05_coloredScrews") ? 0xAAAAAA : 0xEEEEEE;
	renderer.setClearColor(backCol, 1);

	camera = new THREE.PerspectiveCamera(60, cWidth / cHeight, 1, 500);
	camera.position.set(5, 3, 5);
	scene = new THREE.Scene();
	totalGroup = new THREE.Group(); scene.add(totalGroup);
	const ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1.5 ); scene.add( ambientLight );
	mainLight = new THREE.DirectionalLight( 0xFFFFFF, 0.5 ); scene.add( mainLight );

	controls = new THREE.OrbitControls(camera, renderer.domElement); controls.enablePan = false;
	window.addEventListener('resize', setCanvasSize);
	loadModel();
}

function loadModel() {
	new THREE.GLTFLoader().load("../model/"+urlStr+".glb", (gltf)=>{
		object = gltf.scene;
		const box = new THREE.Box3().setFromObject( object );
		const center = new THREE.Vector3();
		box.getCenter( center );
		object.position.sub( center );
		const objectGroup = new THREE.Group();
		objectGroup.add(object);
		const vSize = box.getSize();
		const scl = 10/(vSize.x+vSize.y+vSize.z);
		objectGroup.scale.set(scl, scl, scl);
		totalGroup.add(objectGroup);
		object.traverse(child=>{
			if (child instanceof THREE.Mesh) {
				if (urlStr === 'fiberon-furniture' || urlStr === 'countryside-rail') {
					var color = 0xFFFFFF;
					const {map} = child.material;
					if (urlStr==='fiberon-furniture') color = 0x1A264D;
					else if (urlStr==='countryside-rail') color = 0x221100;
					const roughness = urlStr==='fiberon-furniture'?0.9:0;
					const metalness = urlStr==='fiberon-furniture'?0.1:1;
					child.material = new THREE.MeshStandardMaterial({map, roughness, metalness, color});
				} else {
					child.material.roughness = 0.8;
					child.material.metalness = 0;
				}
			}
		})
		console.log(object);
		loadCheck = true;
	}, (e)=>{
		loadPro = Math.round(e.loaded/(e.total || e.loaded) * 100);
		if (loadPro===100) jQuery('#loadingWrapper').css({display: 'none'});
		jQuery('#loadingLabel').html(loadPro + ' %');
		jQuery('#loadingInner').css({width: loadPro + ' %'});
	}, ( error )=> { console.error( error ); window.alert("Failed to load model! please refresh page!") } );
}

function animate() {
	if (!camera || !scene) return;
	requestAnimationFrame(animate);
	const camPos = camera.position;
	if (mainLight) {
		mainLight.position.set(camPos.x, camPos.y, camPos.z);
	}
	renderer.render(scene, camera);
}

function setCanvasSize() {
	cWidth = window.innerWidth;
	cHeight = window.innerHeight;
	if (renderer && camera) {
		renderer.setSize(cWidth, cHeight);
		camera.aspect = cWidth/cHeight;
		camera.updateProjectionMatrix();
	}
}
