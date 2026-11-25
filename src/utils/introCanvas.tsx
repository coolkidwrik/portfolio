import * as THREE from 'three';
import { setup } from '../utils/setup.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import bgimage from '../assets/images/void.png';

// Import the GLB file
import spaceBoi from '../assets/glb/space_boi.glb';
import spaceMan from '../assets/glb/space_man.glb';
import legoMan from '../assets/glb/benny.glb';


// post processing
/////////////////////////////////////////////////////////
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
/////////////////////////////////////////////////////////

// get glsl code
/////////////////////////////////////////////////////////
// import raw code from files
// diamond shader
import diamondVS from '../utils/glsl/Diamond/diamond.vs.glsl?raw';
import diamondFS from '../utils/glsl/Diamond/diamond.fs.glsl?raw';

// noise shader
import noiseVS from '../utils/glsl/Normal_Noise/noise.vs.glsl?raw';
import noiseFS from '../utils/glsl/Normal_Noise/noise.fs.glsl?raw';
/////////////////////////////////////////////////////////


export const introCanvas = (hostRef: React.RefObject<HTMLElement | null>): (() => void) | void => {
    if (!hostRef.current) return;

    // We create the <canvas> ourselves (instead of React rendering it) so that on
    // unmount we can force the WebGL context to be released and throw the canvas
    // away. A React-owned canvas gets reused, and a lost context can't be revived.
    const canvas = document.createElement('canvas');
    canvas.id = 'threejscanvas';
    hostRef.current.appendChild(canvas);

    // Set to false on unmount; every loop and async callback checks it.
    let isMounted = true;
    let frameId: number | null = null;

    const { renderer, scene, camera, dispose: disposeSetup } = setup(canvas, (w, h) => {
      // Keep the bloom post-processing in sync with the canvas size,
      // otherwise the image goes blurry/stretched after a window resize.
      composer.setSize(w, h);
      bloomPass.resolution.set(w, h);
    });

    // post processing
    const renderPass = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);

    // Bloom pass
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), 
        1.5, // strength
        0.4, // radius
        0.85 // threshold
    );

    composer.addPass(bloomPass);



    // Load background texture
    const loader = new THREE.TextureLoader();
    loader.load(bgimage, (texture) => {
      if (!isMounted) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace; // Ensures correct color space
      scene.background = texture;
    }, undefined, (error) => {
      console.error('Error loading texture:', error);
    });
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // time ticks
    const ticks = { type: "f", value: 0.0 };

    // define glb
    /////////////////////////////////////////////////////////
    // define glb
    let anti_spiral: THREE.Group | undefined;
    let spaceman: THREE.Group | undefined;
    let benny: THREE.Group | undefined;
    let spacemanMixer: THREE.AnimationMixer | undefined;
    const clock = new THREE.Clock();

    {
      const gltfLoader = new GLTFLoader();

      // load anti spiral
      gltfLoader.load(
        spaceBoi,
        (gltf) => {
          if (!isMounted) return;
          anti_spiral = gltf.scene;
          scene.add(anti_spiral); // Add the loaded model to the scene
        },
        undefined, // Progress callback (optional)
        (error) => {
          console.error('Error loading GLB model:', error);
        }
      );

      // load astronaut
      // Load astronaut
      gltfLoader.load(spaceMan, (gltf) => {
        if (!isMounted) return;
        spaceman = gltf.scene;
        spaceman.scale.set(1, 1, 1);
        spaceman.position.set(2, 2, 7);
        spaceman.rotation.set(0.5, 1.7, 0);
        scene.add(spaceman);

        // The mixer is advanced inside the main update() loop below,
        // rather than in its own requestAnimationFrame loop that never stopped.
        spacemanMixer = new THREE.AnimationMixer(spaceman);
        const clip = THREE.AnimationClip.findByName(gltf.animations, 'Idle');
        spacemanMixer.clipAction(clip).play();
        clock.getDelta(); // reset so the first frame doesn't jump
      }, undefined, (error) => {
        console.error('Error loading Spaceman GLB model:', error);
      });

      // load benny
      gltfLoader.load(
        legoMan,
        (gltf) => {
          if (!isMounted) return;
          benny = gltf.scene;
          scene.add(benny); // Add the loaded model to the scene
          benny.scale.set(-0.018, 0.018, 0.018);
          benny.position.set(1.5, 1.0, 3.7);
          benny.rotation.set(0, -1.7, 0);
        },
        undefined, // Progress callback (optional)
        (error) => {
          console.error('Error loading GLB model:', error);
        }
      );
    }

    // define geometry
    /////////////////////////////////////////////////////////
    // sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(0.8, 12);;

    /////////////////////////////////////////////////////////

    // define materials
    /////////////////////////////////////////////////////////
    // DIAMOND
    const diamondMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ticks: ticks
      },
      vertexShader: diamondVS,
      fragmentShader: diamondFS,
      transparent: true,
      depthWrite: false, // Prevents z-fighting issues with transparent objects
    });

    // NOISE
    const noiseMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ticks: ticks
      },
      vertexShader: noiseVS,
      fragmentShader: noiseFS,
    });
    /////////////////////////////////////////////////////////

    // define mesh
    /////////////////////////////////////////////////////////
    const ball1 = new THREE.Mesh(sphereGeometry, noiseMaterial);
    const ball2 = new THREE.Mesh(sphereGeometry, diamondMaterial);
    ball1.scale.set(0.2, 0.2, 0.2);
    ball1.position.set(2, 2.8, 7.4);
    ball2.scale.set(1.2, 1.2, 1.2);
    ball2.position.set(0, 6, 0);
  


    // add elements to the scene
    /////////////////////////////////////////////////////////
    scene.add(ball1);
    scene.add(ball2);


    // Camera position for a given scroll position
    /////////////////////////////////////////////////////////
    const introTargetPosition = { x: 0, y: 2.2, z: 9.5 }; // resting spot at the top of the page

    const scrollCameraPosition = () => {
        const maxScroll = window.innerHeight * 2; // Adjust the max scroll range
        const normalizedScroll = Math.min(window.scrollY / maxScroll, 1); // Normalize to [0,1]
        if (normalizedScroll === 0) return introTargetPosition;
        return {
            x: 0 - normalizedScroll * 40,  // Move x from 0 to -40
            y: 2 - normalizedScroll * 25,  // Move y from 2 to -23
            z: 9.5 - normalizedScroll * 30, // Move z from 9.5 to -20.5
        };
    };

    // Intro: fly the camera in from its initial position over 2 seconds.
    // It flies towards wherever the *current scroll position* says the camera
    // should be (not a fixed point), so if the page scrolls during the intro
    // (e.g. the header's "About Me" link), the camera ends up in the right place.
    /////////////////////////////////////////////////////////
    const startTime = Date.now();
    const initialCameraPosition = { ...camera.position }; // Store initial camera position
    const duration = 2000;  // 2 seconds duration
    let introDone = false;

    const animateCamera = () => {
    if (!isMounted) return;
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);  // Progress value between 0 and 1
    const target = scrollCameraPosition();

    // Lerp (Linear Interpolate) the camera position
    camera.position.y = initialCameraPosition.y + (target.y - initialCameraPosition.y) * progress;
    camera.position.z = initialCameraPosition.z + (target.z - initialCameraPosition.z) * progress;
    camera.position.x = initialCameraPosition.x + (target.x - initialCameraPosition.x) * progress;
    camera.lookAt(0, 2, 0); // Look at the center of the scene

    if (progress < 1) {
        requestAnimationFrame(animateCamera); // Continue animation until it's done
    } else {
        introDone = true;
    }
    };

    // Start the camera animation
    animateCamera();

    // update camera position on scroll (after the intro has finished)
    /////////////////////////////////////////////////////////
    const updateCameraPosition = () => {
        if (!isMounted || !introDone) return; // during the intro, animateCamera handles scroll

        const { x, y, z } = scrollCameraPosition();
        camera.position.set(x, y, z);
        camera.lookAt(0, 2, 0); // Look at the center of the scene

        if (camera.position.y <= 0) {
            document.body.style.overflow = 'auto'; // Enable normal scrolling
        }
    };

    window.addEventListener('scroll', updateCameraPosition, { passive: true });


    // animate
    function update() {
      if (!isMounted) return;  // Prevent updates after unmount

      // update uniforms
      ticks.value += 0.01;

      // advance the astronaut's idle animation
      if (spacemanMixer) {
        spacemanMixer.update(clock.getDelta());
      }

      // rotate
      ball2.rotation.x += 0.001;
      ball2.rotation.y += 0.005;
      if (anti_spiral) {
        anti_spiral.rotation.y += 0.001;
      }

      if (spaceman) {
        spaceman.position.y = 0.01 * Math.sin(0.5 * ticks.value) + 2.0;
        spaceman.rotation.x += 0.0004 * Math.sin(0.5 * ticks.value);
        ball1.position.y = 0.1 * Math.sin(0.2 * ticks.value) + 2.6;
      }

      // benny orbit
      if (benny) {
        benny.position.y = 0.2 * Math.sin(2 * ticks.value) + 0.3;
        // benny.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.001);
      }


      // renderer.render(scene, camera);
      composer.render();
      frameId = requestAnimationFrame(update);
    }
  
    update();
  
    return () => {
      isMounted = false; // Stop animation loops and ignore late-loading models
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateCameraPosition);
      disposeSetup(); // removes the resize listener added in setup()

      spacemanMixer?.stopAllAction();

      // Free GPU memory: geometries, materials and textures of everything in the scene
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((m: THREE.Material) => {
            Object.values(m).forEach((v) => { if (v instanceof THREE.Texture) v.dispose(); });
            m.dispose();
          });
        }
      });
      if (scene.background instanceof THREE.Texture) scene.background.dispose();

      bloomPass.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss(); // actually release the WebGL context now, not "whenever GC runs"
      canvas.remove();
    };
}