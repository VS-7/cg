// Cria a cena Three.js
var scene = new THREE.Scene();

// Cria a câmera Three.js
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);

// Cria o renderizador Three.js
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Carrega texturas
const textureEarth = new THREE.TextureLoader().load("./img/earth.jpg");
const textureSun = new THREE.TextureLoader().load("./img/sun.jpeg");

// Cria a esfera (Terra)
var sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Raio, segmentos largura, segmentos altura
var circleGeometry = new THREE.CircleGeometry(1, 32); // Raio, segmentos
var materialEarth = new THREE.MeshBasicMaterial({map: textureEarth});
var earth = new THREE.Mesh(sphereGeometry, materialEarth);
scene.add(earth);


// Cria o Sol
var sunGeometry = new THREE.SphereGeometry(4, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial({map: textureSun});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Define a posição inicial da Terra
var radius = 10; // Distância da Terra ao Sol
var angle = 0;

// Cria o loop de animação Three.js
function animate() {
  requestAnimationFrame(animate);

  // Atualiza a rotação da Terra
  earth.rotation.y += 0.008;
  sun.rotation.y += 0.002;
  // Atualiza a translação da Terra em torno do Sol
  angle += 0.008;
  earth.position.x = radius * Math.cos(angle);
  earth.position.z = radius * Math.sin(angle);

  // Renderiza a cena
  renderer.render(scene, camera);
}
animate();

const terraPlanaCheckbox = document.getElementById("terraPlana");
terraPlanaCheckbox.addEventListener("change", function () {
    if (this.checked) {
        earth.geometry = circleGeometry;
    } else {
        earth.geometry = sphereGeometry;
    }
});