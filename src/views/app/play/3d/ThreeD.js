import React, {Suspense, useEffect, useState} from 'react';
import useWindowDimensions from "../../../../hook/useWindowDimensions";
import * as THREE from "three";
import Box from "@mui/material/Box";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import SwitchBar from "./SwitchBar";
import GLTF from "./GLTF";
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
import IconButton from "@mui/material/IconButton";
import GLB from "./GLB";
import FBX from "./FBX";
import OBJ from "./OBJ";
import {useDispatch, useSelector} from "react-redux";
import {selectLoadingModal, setLoading} from "../../../../components/loading/loading-slice";
import Loading from "../../../../components/loading/Loading";

//canvas的高度
const height = 600

function ThreeD(props) {
    const {models} = props
    const {aspect} = useWindowDimensions()
    const [fullScrren, setFullScrren] = useState(false)
    const [model, setModel] = useState(null)
    const {loading} = useSelector(selectLoadingModal);
    const dispatch = useDispatch();

    //3d文件加载完成后关闭loading
    const onComplete = () => dispatch(setLoading(false))

    const getModelByType = (src, type) => {
        switch (type) {
            case 'gltf' :
                return (<GLTF rsc={src} onComplete={onComplete}/>)
            case 'glb':
                return (<GLB rsc={src} onComplete={onComplete}/>)
            case 'obj':
                return (<OBJ rsc={src} onComplete={onComplete}/>)
            case 'fbx':
                return (<FBX rsc={src} onComplete={onComplete}/>)
        }
    }

    //首次加载将loading置为true
    useEffect(() => {
        const loadingFetch = async () => {
            await dispatch(setLoading(true))
        }
        loadingFetch().then( () => {
                if (models.length < 1) return
                const modelComponent = getModelByType(models[0].QnLink, models[0].Format)
                setModel(modelComponent)
            }
        )
    }, [models])

    const size = {
        height: `${height}px`,
        width: `${height * aspect}px`
    }

    //3d场景创建完成的准备工作
    const doOnCanvasCreate = ({gl, scene}) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        gl.outputEncoding = THREE.sRGBEncoding
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
        gl.antialias = true
        gl.setClearAlpha(true)
        scene.background = new THREE.Color('#25a18e');
    }

    //switchBar改变3d文件展示
    const handleChangeResc = (src, type) => {
        dispatch(setLoading(true))
        const modelComponent = getModelByType(src, type)
        setModel(modelComponent)
    }


    return (
        <Box sx={{
            height: fullScrren ? '100%' : size.height,
            width: fullScrren ? '100%' : size.width,
            position: fullScrren ? 'fixed' : 'relative',
            mixBlendMode: fullScrren ? '' : "exclusion",
            zIndex: fullScrren ? 999 : 0,
            top: 0,
            left: 0,
            mb: '10px',
            boxShadow: "0 0 2px #3399ff",
            borderRadius: '20px',
            transition: 'width,height .8s,.1s ease-in-out',
        }}>
            <Loading loading={loading}/>

            <Canvas style={{borderRadius: '20px'}} onCreated={doOnCanvasCreate}>
                <Suspense fallback={null}>
                    <fog attach="fog" color={0x59472b} near={1} far={10}/>
                    <ambientLight position={[5, 0, 0]} color='white' intensity={1}/>
                    <pointLight position={[-6, 5.08, 1.33]} color={0x60bc} intensity={6}/>
                    <pointLight position={[2.13, -1.7, -2.1]} color={0xff0000} intensity={1.26}/>
                    {model}
                    <OrbitControls/>
                </Suspense>
            </Canvas>

            <IconButton
                onClick={() => setFullScrren(!fullScrren)}
                sx={{
                    position: 'absolute',
                    right: 5,
                    bottom: 5,
                    color: (theme) => theme.palette.grey[500],
                    zIndex: 99
                }}
            >
                <CropFreeRoundedIcon fontSize='medium'/>
            </IconButton>

            <SwitchBar handleChangeResc={handleChangeResc} models={models}/>
        </Box>

    )
}

export default ThreeD;