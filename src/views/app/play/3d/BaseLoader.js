import * as THREE from "three";
import {gui as dat} from "dat.gui";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export const Init = (height) => {

    const aspect = window.innerWidth / window.innerHeight;
    const size = {
        width: height * aspect,
        height: height
    }
    const clock = new THREE.Clock();
    const stats = new Stats();

    //debug
    const gui = new dat.GUI({autoPlace: false})
    document.getElementById('gui').append(gui.domElement);

    //scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color( '#25a18e' ); //#a2d2ff #25a18e(绿色)
    // scene.background = new THREE.Color( 0xbfe3dd ); //这个是绿色的(官网的颜色)
    scene.fog = new THREE.Fog( 0x59472b, 1000, 3000 );

    //canvas
    const canvas = document.getElementById('3d-canvas')

    //camera
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.set(0,0,4)
    scene.add(camera);


    //---------------------------------------------------------------------lights
    //main light 主光源
    const pointLight = new THREE.AmbientLight('white', 1)
    pointLight.position.set(5, 0, 0)
    scene.add(pointLight);

    //light1
    const pointLight1 = new THREE.PointLight(0x60bc, 6)
    pointLight1.position.set(-6, 5.08, 1.33)
    scene.add(pointLight1);

    // const light1 = gui.addFolder('Light 1')
    // light1.add(pointLight1.position, 'y').min(-3).max(6).step(0.01)
    // light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
    // light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
    // light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01)
    //
    // const light1Color = {
    //     color: 0xff0000
    // }
    //
    // light1.addColor(light1Color, 'color')
    //     .onChange(() => {
    //         pointLight1.color.set(light1Color.color)
    //     })
    //
    // //light2
    // const pointLight2 = new THREE.PointLight(0xff0000, 1.26)
    // pointLight2.position.set(2.13, -1.7, -2.1)
    // scene.add(pointLight2);
    // const light2 = gui.addFolder('Light 2')
    // light2.add(pointLight2.position, 'y').min(-3).max(6).step(0.01)
    // light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
    // light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
    // light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)
    // const light2Color = {
    //     color: 0xff0000
    // }
    // light2.addColor(light2Color, 'color')
    //     .onChange(() => {
    //         pointLight2.color.set(light2Color.color)
    //     })

    // const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
    // scene.add(pointLightHelper3)

    //render
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
    });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;



    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set(0, 0.5, 0);
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.update()

    return {controls, size, scene, renderer, camera, gui, clock, stats}

}