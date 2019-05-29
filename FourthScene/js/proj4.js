/*global THREE, requestAnimationFrame, console*/

var scene,scene1, renderer, camera, camera1;

var geometry, material, mesh, table, now, delta;

var rot, up, ac, stop, speed;

var light1, light2, light3, light4;
var clock, t, t1;
var board, ball, cube;
var dlight,plight;
var controls;
var pause = false;
var hudTexture;


function createBoard(x, y, z) {
    board = new Board(x,y,z);
    board.create();
    scene.add(board);
}

function createBall(x, y, z) {
    ball = new Pool(x,y,z);
    ball.create();
    scene.add(ball);
}

function createCube(x, y, z) {
    cube = new Cube(x,y,z);
    cube.create(cube);
    scene.add(cube);
}

function createScene() {
    scene = new THREE.Scene();

    scene1 = new THREE.Scene();
    var planeGeometry = new THREE.PlaneGeometry(20,20);
    hudTexture = new THREE.TextureLoader().load('js/pause.jpg');
    var material60 = new THREE.MeshBasicMaterial( {map: hudTexture, side:THREE.DoubleSide} );
    material60.transparent = true;
    var plane = new THREE.Mesh(planeGeometry, material60);
    plane.rotation.y = Math.PI;
    plane.position.set(0,0,0);
    scene1.add(plane);

    createBoard(0,0,0);
    createBall(0,0,0);
    createCube(0,4,0);

    dlight = new THREE.DirectionalLight(0xffffff);
    dlight.position.set( 20, 15, 0);
    dlight.castShadow = true;
    dlight.shadow.mapSize.width = 512;
    dlight.shadow.mapSize.height = 512;
    dlight.shadow.camera.near = 0.5;
    dlight.shadow.camera.far = 500;
    scene.add(dlight);

    plight = new THREE.PointLight( 0xffffff, 1);
    plight.position.set( 0, 10, 20);
    plight.castShadow = true;
    plight.shadow.mapSize.width = 512;
    plight.shadow.camera.near = 0.5;
    plight.shadow.camera.far = 500;
    scene.add(plight);
}
//camera do inicio da animacao
function createCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1,200);
    camera.position.set(50,50,-50);
    camera.lookAt(new THREE.Vector3(0,0,0));

    camera1 = new THREE.OrthographicCamera(window.innerWidth/20, -window.innerWidth/20, window.innerHeight/20, -window.innerHeight/20,0,30);
    camera1.position.set(0,10,10);
    camera1.lookAt(new THREE.Vector3(0,0,0));

    controls = new THREE.OrbitControls(camera);
}

function onResize() {
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({
        antialias: false, alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoclear = false;
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    clock.start();
    t = t1 = clock.getElapsedTime(); //valor do relogio do momento de inicio da animacao guardado para ser utilizado na componente da velocidade
    rot = 0;
    speed = ac = 0;
    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function render() {


    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.render(scene, camera);
    renderer.clearDepth();
    if(pause){

      renderer.render(scene1,camera1);
    }


}

function onKeyDown(e) {
    switch (e.keyCode) {
    case 87: //W
    case 119: //w
        for (var i = 0; i < 2 ; i++) {
          scene.children[i].children[0].material.wireframe = !scene.children[i].children[0].material.wireframe;
        }
        for (var i = 0; i < 6 ; i++) {
          scene.children[2].children[0].material.materials[i].wireframe = !scene.children[2].children[0].material.materials[i].wireframe;
        }
        break;

    case 69:  //E
    case 101: //e
        var helper = new THREE.CameraHelper( plight.shadow.camera );
        scene.add( helper );

        var helper = new THREE.CameraHelper( dlight.shadow.camera );
        scene.add( helper );
        break;

    case 82: //R
    case 114: //r
      //  if(pause){
          pause = false;
          ac = speed = 0;
          createScene();
          createCamera();
          clock.stop();
          clock.start();
          render();
          requestAnimationFrame(animate);
          rot = 0;
        //}
        break;

    case 83: //S
    case 115: //s
      if(pause == false){
        pause = true;
        render();
      }
      else{
        pause = false;
        requestAnimationFrame(animate);
      }
      break;

    case 66: //B
    case 98: //b
        if(rot == 0){
          t = clock.getElapsedTime();
          rot = 1;
          ac = 0.00001;
          stop = false;

        }
        else{
          rot = 0;
          ac = -0.00001;
          stop = true;
        }
        break;

    case 76: //L
    case 108: //l
        for (var i = 0; i < 3 ; i++) {
          scene.children[i] = scene.children[i].changeLight(scene.children[i]);
        }
        break;

    case 80:  //P
    case 112:  //p
        if(plight.intensity == 1)
          plight.intensity = 0;
        else {
          plight.intensity = 1;
        }
        break;

    case 68: //D
    case 100: //d
        if(dlight.intensity == 1)
          dlight.intensity = 0;
        else {
          dlight.intensity = 1;
        }
        break;
    }
}

function animate() {
    now = clock.getElapsedTime();
    delta = now - t + 2;
    if(!stop && speed < 0.006 )
      speed = speed + ac*delta;
    else if(speed >= 0.006 && ac > 0){
      speed = 0.006;
    }

    if(ac < 0 && speed > 0) {
      speed = speed + ac*delta;
    }

    if(stop && (ac*speed)>0){
        speed = 0;
        ac = 0;
    }
  	hudTexture.needsUpdate = true;
    ball.rotateY(speed*delta+0.5*ac*(delta**2));
    ball.children[0].rotateZ(-(15*speed*delta+Math.abs(ac)*(delta**2))/Math.PI);


    controls.update();
    if(!pause){
      render();
      requestAnimationFrame(animate);
    }

}
