import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function setup(canvas: HTMLCanvasElement) {
    // Create a scene
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 9.5;
    camera.position.y = 2;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.setSize(w, h);

    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.0;

    // Setup orbit controls for the camera.
    // new OrbitControls(camera, renderer.domElement);

    // Handle window resize
    function handleWindowResize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleWindowResize, false);

    return {
        renderer,
        scene,
        camera
    };
}

export { setup };