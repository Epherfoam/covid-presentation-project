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
let text1 = undefined
let text2 = undefined
let text3 = undefined
let textExplain1 = undefined
let landPos = undefined



//create class

let createLand = () => {
    let geometry = new THREE.PlaneGeometry(2000, 2000)
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

let createTextFirst = (thisString, position) => {

    let loader = new THREE.FontLoader()
    loader.load('./assets/fonts/helvetiker_regular.typeface.json', font => {
        let textGeometry = new THREE.TextGeometry(thisString, {
            font: font,
            size: 6,
            height: 2
        })
        textGeometry.center()
        text1 = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({
            color: 0xffffff
        }))
        text1.rotation.y = 3.125;
        text1.position.y = 10;
        text1.position.x = position;
        text1.position.z = 80;
        scene.add(text1)
        return text1;
    })
}

let createTextSecond = (thisString, position) => {

    let loader = new THREE.FontLoader()
    loader.load('./assets/fonts/helvetiker_regular.typeface.json', font => {
        let textGeometry = new THREE.TextGeometry(thisString, {
            font: font,
            size: 6,
            height: 2
        })
        textGeometry.center()
        text2 = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({
            color: 0xfd3535
        }))
        text2.rotation.y = 3.125;
        text2.position.y = 20;
        text2.position.x = position;
        text2.position.z = 80;
        scene.add(text2)
        return text2;
    })

}

let createTextThird = (thisString, position) => {

    let loader = new THREE.FontLoader()
    loader.load('./assets/fonts/helvetiker_regular.typeface.json', font => {
        let textGeometry = new THREE.TextGeometry(thisString, {
            font: font,
            size: 6,
            height: 2
        })
        textGeometry.center()
        text3 = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({
            color: 0xffffff
        }))
        text3.rotation.y = 3.125;
        text3.position.y = 20;
        text3.position.x = position;
        text3.position.z = 80;
        scene.add(text3)
        return text3;
    })
}

let createTextExplain1 = (thisString, position) => {

    let loader = new THREE.FontLoader()
    loader.load('./assets/fonts/helvetiker_regular.typeface.json', font => {
        let textGeometry = new THREE.TextGeometry(thisString, {
            font: font,
            size: 6,
            height: 2
        })
        textGeometry.center()
        textExplain1 = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({
            color: 0xffffff
        }))
        textExplain1.rotation.y = 3.125;
        textExplain1.position.y = 20;
        textExplain1.position.x = position;
        textExplain1.position.z = 80;
        scene.add(textExplain1)
        return textExplain1;
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
    let geometry = new THREE.BoxGeometry(2000, 500, 500)
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
        cameraFirst.position.set(0, 30, -90)
        cameraFirst.lookAt(0, 30, -90)

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
        control.minAzimuthAngle = -Math.PI - 0.10;
        control.maxAzimuthAngle = Math.PI + 0.10;
        control.minPolarAngle = -Math.PI;
        control.maxPolarAngle = 1.5;
        control.enablePan = false
        control.enableZoom = true
        control.update();

        land = createLand(0)
        sky = createCube()
        light = createLampLight()
        navigator = createNavigator()
        text1 = createTextFirst("Pencegahan Covid-19\nGunakan A untuk geser ke kiri\nGunakan D untuk geser ke kanan", 0)
        text2 = createTextSecond("Covid-19 merupakan virus yang sangat viral\ndimana virus tersebut sangat mudah untuk menginfeksi tubuh\nakibat yang dihasilkan dari virus tersebut adalah\nrusaknya organ tubuh yang diserang oleh Covid-19", -300)
        text3 = createTextThird("Maka dari itu, kami ingin\nmemberitahu cara yang baik dalam mencegah Covid-19", -600)
        text3 = createTextExplain1("1. Mencuci tangan\n
        }\
        nDengan mencuci tangan kita dapat mencegah\ nvirus yang terindikasi menempel di tangan kita\ nke bagian tubuh lain yang rawan terkena penyakit ", 700)

        let keyListener = event => {
            let keyCode = event.keyCode
            if (keyCode == 87) { //w

                if (navigator.position.z >= 20) {
                    navigator.position.z += 0
                    currentCamera.position.z += 0
                } else {
                    navigator.position.z += 3
                    currentCamera.position.z += 3
                }

            } else if (keyCode == 83) { //s
                if (navigator.position.z <= -20) {
                    navigator.position.z += 0
                    currentCamera.position.z += 0
                } else {
                    navigator.position.z -= 3
                    currentCamera.position.z -= 3
                }

            } else if (keyCode == 65) { //a
                if (navigator.position.x == 48) {
                    navigator.position.x += 0
                    currentCamera.position.x += 0
                } else if (navigator.position.z == -930) {
                    navigator.position.z += 0
                    currentCamera.position.z += 0
                } else {
                    navigator.position.x += 3
                    currentCamera.position.x += 3
                }

            } else if (keyCode == 68) { //d
                if (navigator.position.x < -800) {
                    navigator.position.x = 900
                    currentCamera.position.x = 900
                    text1.visible = false;
                    text2.visible = false;
                    text3.visible = false;
                } else {
                    navigator.position.x -= 100
                    currentCamera.position.x -= 100
                }
            }

            //kalo pake currcam, rotation ga bakal guna 
            console.log(navigator.position);
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