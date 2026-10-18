// Scene, Camera, Renderer Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(400, 400);
container.appendChild(renderer.domElement);

// Create 3D Cyber Wireframe Sphere
const geometry = new THREE.IcosahedronGeometry(1.8, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0x00f2fe,
  wireframe: true,
  transparent: true,
  opacity: 0.8
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Create Inner Glowing Core
const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
const coreMat = new THREE.MeshBasicMaterial({
  color: 0x7928ca,
  wireframe: true
});
const core = new THREE.Mesh(coreGeo, coreMat);
scene.add(core);

// Mouse Interaction variables
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;
});

// Render Loop
function animate() {
  requestAnimationFrame(animate);

  // Smooth rotation
  sphere.rotation.y += 0.005;
  sphere.rotation.x += 0.003;
  core.rotation.y -= 0.01;

  // React to mouse movement
  sphere.rotation.x += mouseY * 0.05;
  sphere.rotation.y += mouseX * 0.05;

  renderer.render(scene, camera);
}

animate();
