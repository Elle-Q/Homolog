import React, {useEffect, useState} from 'react';
import * as THREE from "three";
import {gui as dat} from "dat.gui";
import Box from "@mui/material/Box";
import {Init} from "../3d/BaseLoader";
import BaseCanvas from "../3d/BaseCanvas";


const style = {
    outline: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    mixBlendMode: 'exclusion'
}

function TestSphere(props) {
    const [size, setSize] = useState()

    useEffect(() => {
        const {controls, size, scene, renderer, camera, gui} = Init(600)
        setSize(size)

        //loading
        const textureLoader = new THREE.TextureLoader()
        const normalTexture = textureLoader.load('/3d/texture/NormalMapHole.png')

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

            renderer.render(scene, camera);
        }

        animate();
    }, [])


    return (
        <Box sx={{height: '500px', position: "relative"}}>
            <div style={{
                height: '100vh',
                display: 'grid',
                textAlign: "center",
                padding: '20vh 0'
            }}>
                <h1 style={{
                    fontSize: '4rem',
                    color: 'white'
                }}>SHATTER DOWN SPHERE</h1>
            </div>
            <BaseCanvas size={size}/>
            <section></section>
        </Box>
    );
}

export default TestSphere;