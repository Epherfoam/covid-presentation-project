import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/build/OrbitControls.js'
import { GLTFLoader } from './three.js/build/GLTFLoader.js'

//initiate variable

import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/build/OrbitControls.js'
import { GLTFLoader } from './three.js/build/GLTFLoader.js'

let scene = undefined
let cameraFirst = undefined
let currentCamera = undefined
let renderer = undefined
let control = undefined



//create class
let createRoad = (w, h) => {
    let loader = new THREE.TextureLoader
    let texture = loader.load('./assets/road.jpg', function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 8);
    });
    let geometry = new THREE.PlaneGeometry(w, h)
    let material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide
    })
    let mesh = new THREE.Mesh(geometry, material)

    mesh.rotation.x = Math.PI / 2
    mesh.rotation.y = 0
    mesh.rotation.z = 0
    mesh.position.y = 0.3
    return mesh;
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
    cameraFirst.position.set(-8, 10, 18)
    cameraFirst.lookAt(-5, 10, 100)

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
    control.minPolarAngle = -Math.PI;
    control.maxPolarAngle = 1.5;
    control.enablePan = false
    control.enableZoom = true
    control.update();

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