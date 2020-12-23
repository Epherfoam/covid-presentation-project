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
let navigator = undefined
let text = undefined



//create class

let createLand = () => {
    let geometry = new THREE.PlaneGeometry(500, 100)
    let material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = Math.PI / 2
    mesh.rotation.y = 0
    mesh.rotation.z = Math.PI / 2
    mesh.position.y = 0
    scene.add(mesh)
    return mesh
}

let createText = (thisString, position) => {

    let loader = new THREE.FontLoader()
    loader.load('./assets/fonts/helvetiker_regular.typeface.json', font => {
        let textGeometry = new THREE.TextGeometry(thisString, {
            font: font,
            size: 6,
            height: 2
        })
        textGeometry.center()
        text = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({
            color: 0xffffff
        }))
        text.rotation.y = 3.125;
        text.position.y = 10;
        text.position.z = position;
        scene.add(text)
        return text;
    })

}

let createNavigator = () => {
    let geometry = new THREE.SphereGeometry(3, 10, 10)
    let material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 10, 0)
    scene.add(mesh)
    return mesh;
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
    cameraFirst.position.set(0, 34, -100)
    cameraFirst.lookAt(2, 1, -2)
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

    land = createLand()
    sky = createCube()
    light = createLampLight()
    navigator = createNavigator()
    text = createText("Pencegahan Covid-19", 60)
}

let keyListener = event => {
    let keyCode = event.keyCode
    if (keyCode == 87) { //w
        navigator.position.z += 3
        currentCamera.position.z += 3

    } else if (keyCode == 83) { //s
        if (navigator.position.z < -180) {
            navigator.position.z += 0
            currentCamera.position.z += 0
        } else {
            navigator.position.z -= 3
            currentCamera.position.z -= 3
        }

    } else if (keyCode == 65) { //a
        if (navigator.position.x > 48) {
            navigator.position.x += 0
            currentCamera.position.x += 0
        } else {
            navigator.position.x += 3
            currentCamera.position.x += 3
        }

    } else if (keyCode == 68) { //d
        if (navigator.position.x < -48) {
            navigator.position.x += 0
            currentCamera.position.x += 0
        } else {
            navigator.position.x -= 3
            currentCamera.position.x -= 3
        }
    }

    //kalo pake currcam, rotation ga bakal guna 
    console.log(navigator.position.z);
    control.target = navigator.position
}

let addListener = () => {
    document.addEventListener("keydown", keyListener)
}

//animation
let animation = () => {
    requestAnimationFrame(animation)
    renderer.render(scene, currentCamera)
    control.update();
    //console.log(currentCamera)
}

//onload
window.onload = () => {
    init()
    animation()
    addListener()
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