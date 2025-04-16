import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
// Need 3 things for scene: Renderer, camera, scene object

// RENDERER
const w = window.innerWidth;  // grab width
const h = window.innerHeight;   // grab height
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);  // set render size
document.body.appendChild(renderer.domElement);

// CAMERA
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// SCENE OBJECT
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);

const mat = new THREE.MeshStandardMaterial({
    color: "white", 
    flatShading: true
});

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: "white",
    wireframe: true
}); 
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);  // added wirefram to mesh so they can animate together

const hemiLight = new THREE.HemisphereLight("pink", "blue");
scene.add(hemiLight);

// ANIMATE - api call every sec
function animate(t=0){
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}
  animate();