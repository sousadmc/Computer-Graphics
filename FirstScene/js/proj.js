/*global THREE, requestAnimationFrame, console*/

var camera, camera1, camera2, camera3, scene, renderer;

var geometry, material, mesh, table;

var chair;

var lamp;

var clock;

function addChairBack(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(7,7,1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBottom(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(7,1,7);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairLeg(obj, x, y, z){
    'use strict';

    geometry = new THREE.CylinderGeometry(0.4, 0.4, 3.6, 10,1, true);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}


function addChairLeg1(obj, x, y, z){
    'use strict';

    geometry = new THREE.CylinderGeometry(0.4, 0.4, 5, 10,1, true);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI/2;
    obj.add(mesh);
}

function addChairLeg2(obj, x, y, z){
    'use strict';

    geometry = new THREE.CylinderGeometry(0.4, 0.4, 5, 10,1, true);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI/2;
    mesh.rotation.z = Math.PI/2;
    obj.add(mesh);
}
function addChairWheel(obj, x, y, z) {
    'use strict';
    
    geometry = new THREE.TorusGeometry(0.4, 0.2, 20, 100, 6.3);
    var material = new THREE.MeshBasicMaterial( { color: 0x00BFFF, wireframe: true } );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    return mesh;  
}


function createChair(x,y,z) {
    'use strict';

    chair = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x8FBC8F, wireframe: true });

    addChairBack(chair,0,6.5,18);
    addChairBottom(chair, 0, 2.45, 15);
    addChairLeg(chair, 0, 0.1, 15);
    addChairLeg1(chair, 0, -1.3, 15);
    addChairLeg2(chair, 0, -1.3, 15);
    var one = addChairWheel(chair, 2.3, -2, 15);
    one.rotation.y = Math.PI/2;
    var two = addChairWheel(chair, -2.3, -2, 15);
    two.rotation.y = Math.PI/2;
    var three = addChairWheel(chair, 0, -2, 12.9);
    three.rotation.y = Math.PI/2;
    var four = addChairWheel(chair, 0, -2, 17.1);
    four.rotation.y = Math.PI/2;
    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}

function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(1, 2, 7, 32,1, true);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';
    
    table = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00BFFF, wireframe: true });
   
    addTableTop(table, 0, -0.4, 0);
    addTableLeg(table, -25, -1.9, -8);
    addTableLeg(table, -25, -1.9, 8);
    addTableLeg(table, 25, -1.9, 8);
    addTableLeg(table, 25, -1.9, -8);
    
    scene.add(table);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    

    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 8, 0);
    createChair(2,2,2);
}

function createCamera() {
    'use strict';
    camera1 = new THREE.OrthographicCamera(window.innerWidth/20, -window.innerWidth/20, window.innerHeight/20, -window.innerHeight/20,1000,1);
    camera1.position.x = 0;
    camera1.position.y = 50;
    camera1.position.z = 0;
    camera1.lookAt(scene.position);

    camera2 = new THREE.OrthographicCamera(window.innerWidth/20, -window.innerWidth/20, window.innerHeight/20, -window.innerHeight/20,1000,1);
    camera2.position.x = 50;
    camera2.position.y = 0;
    camera2.position.z = 0;
    camera2.lookAt(scene.position);

    camera3 = new THREE.OrthographicCamera(window.innerWidth/20, -window.innerWidth/20, window.innerHeight/20, -window.innerHeight/20,1000,1);
    camera3.position.x = 0;
    camera3.position.y = 0;
    camera3.position.z = 50;
    camera3.lookAt(scene.position);

    camera = camera1;

}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';
    var speed = 4;
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case 40:
        console.log(clock);
        chair.position.z += speed*clock.getDelta();
        break;
    case 38:
        console.log(clock);
        chair.position.z -= speed*clock.getDelta();
        break;
    case 37:
        console.log(clock);
        chair.position.x += speed*clock.getDelta();
        break;
    case 39:  
        console.log(clock);
        chair.position.x -= speed*clock.getDelta();
        break; 

    case 49:  
        camera = camera1;
        break;
    case 50:  
        camera = camera2;
        break;
    case 51:  
        camera = camera3;
        break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    clock = new THREE.Clock();
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCamera();
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    
    render();
    
    requestAnimationFrame(animate);
}

