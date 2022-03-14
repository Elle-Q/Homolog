import React, {useEffect, useState} from 'react';
import BaseCanvas from "./BaseCanvas";
import Box from "@mui/material/Box";
import {Init} from "./BaseLoader";
import * as THREE from "three";
import {ShadowMapViewer} from "three/examples/jsm/utils/ShadowMapViewer";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";

function Text(props) {
    const [size, setSize] = useState()

    const SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;
    const FLOOR = -250;
    let mixer;
    let light;
    let lightShadowMapViewer;
    let showHUD = false;


    useEffect(() => {
        const {controls , size, scene, renderer, camera, gui, clock, stats} = Init(600)
        setSize(size)

        init();
        animate();

        function init()  {
            const ambient = new THREE.AmbientLight(0x444444);
            scene.add(ambient);

            light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 5, 0.3);
            light.position.set(0, 1500, 1000);
            light.target.position.set(0, 0, 0);

            light.castShadow = true;
            light.shadow.camera.near = 1200;
            light.shadow.camera.far = 2500;
            light.shadow.bias = 0.0001;

            light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
            light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

            scene.add(light);
            createHUD();
            createScene();
        }

        function createHUD() {
            lightShadowMapViewer = new ShadowMapViewer(light);
            lightShadowMapViewer.position.x = 10;
            lightShadowMapViewer.position.y = size.height - (SHADOW_MAP_HEIGHT / 4) - 10;
            lightShadowMapViewer.size.width = SHADOW_MAP_WIDTH / 4;
            lightShadowMapViewer.size.height = SHADOW_MAP_HEIGHT / 4;
            lightShadowMapViewer.update();

        }

        function createScene() {
            const loader = new FontLoader();
            loader.load('/3d/fonts/helvetiker_bold.typeface.json', function (font) {

                const textGeo = new TextGeometry('HOMOLOG', {
                    font: font,
                    size: 200,
                    height: 50,
                    curveSegments: 12,
                    bevelThickness: 2,
                    bevelSize: 5,
                    bevelEnabled: true

                });

                textGeo.computeBoundingBox();
                const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
                const textMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, specular: 0xffffff});
                const mesh = new THREE.Mesh(textGeo, textMaterial);
                mesh.position.x = centerOffset;
                mesh.position.y = 60;
                mesh.position.z = -700;
                mesh.rotation.y = 0.2;
                // mesh.scale.set(0.5,0.5,0.5)
                scene.add(mesh);
            });
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
            stats.update();

        }

        function render() {
            const delta = clock.getDelta();

            controls.update(delta);
            if (renderer) {
                renderer.clear();
                renderer.render(scene, camera);
                if (showHUD) {
                    lightShadowMapViewer.render(renderer);
                }
            }
        }


    }, [])


    return (
        <Box sx={{height: '500px', position: "relative", mb: '50px'}}>
            <BaseCanvas size={size}/>
        </Box>
    );
}

export default Text;