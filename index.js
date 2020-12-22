import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/build/OrbitControls.js'
import { GLTFLoader } from './three.js/build/GLTFLoader.js'

//initiate variable
let scene = undefined
let cameraFirst = undefined
let currentCamera = undefined
let renderer = undefined
let control = undefined
let land = undefined
let sky = undefined
let light = undefined


//create class

let createLand = () => {
    let geometry = new THREE.PlaneGeometry(500, 100)
    let material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = Math.PI / 2
    mesh.rotation.y = 0
    mesh.rotation.z = 0
    mesh.position.y = 0
    scene.add(mesh)
    return mesh
}

let createCube = () => {
    let geometry = new THREE.BoxGeometry(500, 500, 500)
    let material = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./assets/cubemap/px.png'),
            side: THREE.BackSide,
            color: 0x777777
        }),
        new THREE.MeshBasicMaterial({

            map: new THREE.TextureLoader().load('./assets/cubemap/nx.png'),
            side: THREE.BackSide,
            color: 0x777777
        }), new THREE.MeshBasicMaterial({

            map: new THREE.TextureLoader().load('./assets/cubemap/py.png'),
            side: THREE.BackSide,
            color: 0x777777
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./assets/cubemap/ny.png'),
            side: THREE.BackSide,
            color: 0x777777
        }), new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./assets/cubemap/pz.png'),
            side: THREE.BackSide,
            color: 0x777777
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./assets/cubemap/nz.png'),
            side: THREE.BackSide,
            color: 0x777777
        })
    ]
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)
    return mesh
}

let createLampLight = () => {
    let light = new THREE.PointLight(0xffffff, 1, 150, 3)
    light.position.set(0, 0, 0);
    light.castShadow = true;
    return light
}


//init
let init = () => {
    scene = new THREE.Scene()
    let fov = 45
    let w = window.innerWidth
    let h = window.innerHeight
    let aspect = w / h

    //cam first person
    cameraFirst = new THREE.PerspectiveCamera(fov, aspect)
    cameraFirst.position.set(0, 1, 0)
    cameraFirst.lookAt(0, 0, 0)
        //cam init 
    currentCamera = cameraFirst

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    renderer.setSize(w, h)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)
    control = new OrbitControls(currentCamera, renderer.domElement)

    //limit camera movement up-down
    // control.minPolarAngle = -Math.PI;
    // control.maxPolarAngle = 1.5;
    control.enablePan = false
    control.enableZoom = true
    control.update();

    land = createLand()
    sky = createCube()
    light = createLampLight()
}

//animation
let animation = () => {
    requestAnimationFrame(animation)
    renderer.render(scene, currentCamera)
    control.update();
}

//onload
window.onload = () => {
    init()
    animation()
}

//on resize
window.onresize = () => {
    let W = innerWidth
    let H = innerHeight
    let aspect = W / H
    renderer.setSize(W, H)
    currentCamera.aspect = aspect
    currentCamera.updateProjectionMatrix()
}