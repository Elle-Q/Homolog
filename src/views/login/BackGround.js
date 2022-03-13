import React, {useEffect} from 'react';
import * as THREE from "three";
import {gui as dat} from "dat.gui";
import Box from "@mui/material/Box";
import {CSSRulePlugin} from 'gsap/CSSRulePlugin'
import {gsap} from "gsap"
import './login.css'

const style = {
    outline: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    mixBlendMode: 'exclusion',
}

const textStyle = {
    flexBasis: 0,
    flexGrow: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
}

function BackGround(props) {
    const aspect = window.innerWidth / window.innerHeight;

    const size = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    useEffect(() => {

        //debug
        // const gui = new dat.GUI({autoPlace: false})
        // document.getElementById('gui').append(gui.domElement);

        //loading
        const textureLoader = new THREE.TextureLoader()
        const cross = textureLoader.load('/3d/texture/particleMap2.png')


        //scene
        const scene = new THREE.Scene()

        //canvas
        const canvas = document.getElementById("bg-canvas")

        //camera
        const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        camera.position.set(0, 0, 4)
        scene.add(camera);

        //Objects
        const geometry = new THREE.TorusGeometry(1.4, .4, 16, 100);

        const particleGeo = new THREE.BufferGeometry()
        const particleCnt = 300;

        const posArray = new Float32Array(particleCnt * 3)
        for (let i = 0; i < particleCnt * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * (Math.random() * 30)
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        //materials (normal map)
        const material = new THREE.PointsMaterial({
            size: .005,
        });

        const particleMaterial = new THREE.PointsMaterial({
            size: .3,
            map: cross,
            transparent: true,
            color: 'blue'
        });

        //mesh
        const sphere = new THREE.Points(geometry, material);
        const particleMesh = new THREE.Points(particleGeo, particleMaterial);
        scene.add(sphere, particleMesh);

        //lights
        const pointLight = new THREE.PointLight('red', 10)
        pointLight.position.set(2, 3, 4)
        scene.add(pointLight);

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

        const windowHalfX = size.width / 2
        const windowHalfY = size.height / 2

        function animate() {

            sphere.rotation.y += 0.01;

            particleMesh.rotation.y = mouseX *  0.0006
            particleMesh.rotation.x = -mouseY * 0.0006

            renderer.render(scene, camera);

            requestAnimationFrame(animate);
        }

        animate();
    }, [])


    useEffect(() => {
        const content = CSSRulePlugin.getRule('.content:before')
        const h1 = document.querySelector('h1')
        const h2 = document.querySelector('h2')
        const tl = gsap.timeline()
        tl.from(content, {delay: .5, duration: .5, cssRules: {scaleX: 0}})
        tl.to(h1, {duration: 2, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'})
        tl.to(h2, {duration: 2, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'})
    }, [])


    return (
        <Box sx={{position: "relative"}}>
            <div style={{
                display: 'grid',
                height: '100vh',
                padding: '30vh 30vh'
            }}>
                <div className='content'>
                    <h1 style={{fontSize: '5rem', color: '#3399ff', ...textStyle}}>
                        HOMO-LOG
                    </h1>
                    <h2 style={{
                        ...textStyle,
                        fontSize: '3rem',
                        color: '#403D39'
                    }}>好猫译制
                    </h2>
                </div>
            </div>
            <canvas style={style} width={size.width} height={size.height} id="bg-canvas"/>
            <section></section>
        </Box>
    );
}

export default BackGround;