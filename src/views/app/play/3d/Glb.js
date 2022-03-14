import React, {useEffect, useState} from 'react';
import * as THREE from "three";
import Box from "@mui/material/Box";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {Init} from "./BaseLoader";
import BaseCanvas from "./BaseCanvas";

function Glb(props) {
    const [size, setSize] = useState()

    useEffect(() => {
        const {controls, size, scene, renderer, camera, clock, stats} = Init( 600)
        setSize(size)

        let mixer;

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader);

        //object
        gltfLoader.load('/3d/glb/LittlestTokyo.glb', (gltf) => {

            const model = gltf.scene;
            model.position.set(1, 1, 0);
            model.rotation.set(0, .5, 0);
            model.scale.set(.008, .008, .008);
            scene.add(model);

            mixer = new THREE.AnimationMixer(model);
            gltf.animations.length > 0 && gltf.animations[0] && mixer.clipAction(gltf.animations[0]).play();

            animate();

        })

        // ----------------------------------------------------animate-----------------------------------


        function animate() {

            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            mixer && mixer.update(delta);

            controls.update();

            stats.update();

            renderer.render(scene, camera);
        }

        animate();
    }, [])


    return (
        <Box sx={{height: '500px', position: "relative", mb: '50px'}}>
            <BaseCanvas size={size}/>
        </Box>
    );
}

export default Glb;