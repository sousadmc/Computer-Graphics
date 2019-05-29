/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh, table, speed, now, delta;

var chair;

var lamp;

var clock, t;
var rot;
var ac;
var stop;


function createLamp(x,y,z){
    lamp = new Lamp(x,y,z);
    lamp.create();
    scene.add(lamp);
}

function createChair(x,y,z) {
    chair = new Chair(x, y, z);
    chair.create();
    scene.add(chair);
}

function createTable(x, y, z) {
    table = new Table(x,y,z);
    table.create();
    scene.add(table);
}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(7));
    
    createTable(0, 7, 0);
    createChair(0, 5, 15);
    createLamp(35, 0.4, 0);
}

//camera do inicio da animacao
function createCamera() {
    camera = new THREE.OrthographicCamera(window.innerWidth/20, -window.innerWidth/20, window.innerHeight/20, -window.innerHeight/20,1000,1);
    camera.position.set(50,-50,50);
    camera.lookAt(scene.position);

}

function onResize() {
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.left = window.innerWidth/20;
        camera.right = window.innerWidth/-20;
        camera.top = window.innerHeight/20;
        camera.bottom =  window.innerHeight/-20;
        camera.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(e) {
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
    case 38: //downKey
        ac = -0.00003;
        stop = false;
        break;
    case 40: //upKey
        ac = 0.00003;
        stop = false;
        break;
    case 37: //leftKey
        rot = 1;
        break;
    case 39: //rightKey
        rot = -1;
        break; 

    case 49:  //1 TopView
        camera.position.set(0,-50,0);
        camera.lookAt(scene.position);
        break;
    case 50:  //2 SideView
        camera.position.set(50,0,0);
        camera.lookAt(scene.position);
        break;
    case 51:  // 3 FrontView
        camera.position.set(0,0,-50);
        camera.lookAt(scene.position);
        break;
    case 52:  // 4 InitialView
        camera.position.set(50,-50,-50);
        camera.lookAt(scene.position);
        break;
    }  
}

//Funcao chamada quando teclas de movimento deixam de ser premidas
function onKeyUp(e){
    switch (e.keyCode) {
    case 40: //upKey
        ac = -0.00004;
        stop = true;
        break;
    case 38: //downKey
        ac = 0.00004;
        stop = true;
        break;
    case 37: //leftKey
        rot = 0;
        break;
    case 39:  //rightKey
        rot = 0;
        break; 
    }
}

function render() {
    renderer.render(scene, camera);
}

function init() {
    clock = new THREE.Clock();
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCamera();

    t = Date.now(); //valor do relogio do momento de inicio da animacao guardado para ser utilizado na componente da velocidade
    rot = 0;        //inicializacao da flag rotacao 
    speed = ac = 0; //inicializacao da aceleracao e velocidade
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    now = Date.now(); 
    delta = now - t;
    t = Date.now();
    chair.rotateY(((2*Math.PI)/1000)*delta*rot);
    speed = speed + ac*delta;
    if(stop && (ac*speed)>0){   //verificao da flag stop e das componentes speed e aceleracao para desacelaracao do movimento de forma acelerada
        ac = 0;
        speed = 0;
    }
    chair.translateZ(speed*delta+0.5*ac*(delta**2));
    chair.getWheels("wheel",speed*delta+0.5*ac*(delta**2)); //rotacao das rodas no sentido do movimento da cadeira
    
    render();
    requestAnimationFrame(animate);
}

