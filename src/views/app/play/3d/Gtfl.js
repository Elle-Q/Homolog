import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import gsap from 'gsap'
import {Init} from "./BaseLoader";
import BaseCanvas from "./BaseCanvas";
import SwitchBar from "./SwitchBar";

function Gtfl(props) {

    const [size, setSize] = useState()
    const [sceneCur, setSceneCur] = useState()
    const [rsc, setRsc] = useState('/3d/gltf/helmet/DamagedHelmet.gltf')

    useEffect(() => {
        sceneCur && sceneCur.clear()
        const {controls, size, scene, renderer, camera, gui} = Init(600)
        setSize(size)
        setSceneCur(scene)

        const gltfLoader = new GLTFLoader()

        let tl = gsap.timeline()

        //models
        gltfLoader.load(rsc, (gltf) => {
            gltf.scene.rotation.set(6.4, 1.2, 6.3)
            gltf.scene.scale.set(1.2, 1.2, 1.2)
            scene.add(gltf.scene)

            tl.to(gltf.scene.rotation, {y: -6.9, duration: 2})
            tl.to(gltf.scene.scale, {x: 2, y: 2, z: 2, duration: 1}, "-=.5")
            tl.to(gltf.scene.position, {y: .8, duration: 1}, "-=.5")
        })

        // ----------------------------------------------------animate-----------------------------------
        function animate() {
            requestAnimationFrame(animate);
            controls.update()
            renderer.render(scene, camera);
        }
        animate();
    }, [rsc])


    const handleChangeResc = (src) => {
        setRsc(src)
    }

    return (
        <Box sx={{
            height: '600px',
            width:size && size.width,
            position: "relative",
            mb: '10px',
            boxShadow: "0 0 2px #3399ff",
            borderRadius: '15px',
        }}>
            <BaseCanvas size={size}/>
            <SwitchBar handleChangeResc={handleChangeResc}/>
        </Box>
    );
}

export default Gtfl;