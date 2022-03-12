import React, {useEffect} from 'react';
import * as THREE from "three";
import {gui as dat} from "dat.gui";
import Box from "@mui/material/Box";


const style = {
    outline: 'none',
    position:'absolute',
    top:0,
    left:0,
    mixBlendMode: 'exclusion'
}

function ThreeD(props) {
    const aspect = window.innerWidth / window.innerHeight;

    const size = {
        width: 600 * aspect,
        height: 600
    }
    useEffect(() => {
        //loading
        const textureLoader = new THREE.TextureLoader()
        const normalTexture = textureLoader.load('/3d/NormalMapHole.png')

        //debug
        const gui = new dat.GUI({autoPlace: false})
        document.getElementById('gui').append(gui.domElement);

        //scene
        const scene = new THREE.Scene()

        //canvas
        const canvas = document.getElementById("3d-canvas")

        //camera
        const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 4
        scene.add(camera);

        //Objects
        const geometry = new THREE.SphereGeometry(1.2, 16, 16);

        //materials (normal map)
        const material = new THREE.MeshStandardMaterial();
        material.metalness = 0.1
        material.roughness = 0.7
        material.normalMap = normalTexture
        material.color = new THREE.Color('white')

        //mesh
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        //lights
        const pointLight = new THREE.PointLight('red', .1)
        pointLight.position.set(5, 0, 0)
        // scene.add(pointLight);

        //light2
        const pointLight2 = new THREE.PointLight(0xff0000, .7)
        pointLight2.position.set(-6, 3, -3)
        scene.add(pointLight2);

        const light2 = gui.addFolder('Light 2')
        light2.add(pointLight2.position, 'y').min(-3).max(6).step(0.01)
        light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
        light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
        light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

        const light2Color = {
            color: 0xff0000
        }

        light2.addColor(light2Color, 'color')
            .onChange(() => {
                pointLight2.color.set(light2Color.color)
            })

        // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
        // scene.add(pointLightHelper2)

        //light3
        const pointLight3 = new THREE.PointLight(0xc1ff, 1.7)
        pointLight3.position.set(3, -3, -3)
        scene.add(pointLight3);

        const light3 = gui.addFolder('Light 3')
        light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
        light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
        light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
        light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

        const light3Color = {
            color: 0xff0000
        }

        light3.addColor(light3Color, 'color')
            .onChange(() => {
                pointLight3.color.set(light3Color.color)
            })
        //
        // const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
        // scene.add(pointLightHelper3)

        //render
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });
        renderer.setSize(size.width, size.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


        // ----------------------------------------------------animate-----------------------------------


        const onDocumentMouseMove = (event) => {
            mouseX = event.clientX - windowHalfX
            mouseY = event.clientY - windowHalfY
        }

        document.addEventListener('mousemove', onDocumentMouseMove)
        let mouseX = 0
        let mouseY = 0

        let targetX = 0
        let targetY = 0

        const windowHalfX = size.width / 2
        const windowHalfY = size.height / 2


        function animate() {

            requestAnimationFrame(animate);

            targetX = mouseX * .006
            targetY = mouseY * .001

            sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
            sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x)
            sphere.position.z += 0.12 * (targetY - sphere.rotation.x)
            // sphere.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        animate();
    }, [])


    return (
        <Box sx={{height:'500px', position:"relative"}}>
            <div style={{
                height: '100vh',
                display:'grid',
                textAlign: "center",
                padding: '20vh 0'
            }}>
                <h1 style={{
                    fontSize: '4rem',
                    color:'white'
                }}>SHATTER DOWN SPHERE</h1>
            </div>
            <canvas style={style} width={size.width} height={size.height} id="3d-canvas"/>
            <section></section>
        </Box>
    );
}

export default ThreeD;