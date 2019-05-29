/*global THREE, requestAnimationFrame, console*/

var scene, renderer, camera;

var geometry, material, mesh, table, now, delta;

var ball;
var rot, up;

var light1, light2, light3, light4;
var clock, t, time;
var airplane;
var dlight;
var controls;


function createAirplane(x, y, z) {
    airplane = new Airplane(x,y,z);
    airplane.create();
    scene.add(airplane);
}

function createLights(x, y) {
    lights = new Light(x,y);
    scene.add(lights);
}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(7));

    dlight = new THREE.DirectionalLight(0xffffff);
    dlight.position.set(100, 10, 100).normalize();
    scene.add(dlight);

    createAirplane(0,0,0);
    createLights(20,20);


}
//camera do inicio da animacao
function createCamera() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 120);

    camera.position.set(30,30,30);
    camera.lookAt(scene.position);

    controls = new THREE.OrbitControls(camera);
}

function onResize() {
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
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
        up = -1;
        break;
    case 40: //upKey
        up = 1;
        break;
    case 37: //leftKey
        rot = 1;
        break;
    case 39: //rightKey
        rot = -1;
        break;

    case 49:  //1 TopView
        if(lights.children[0].children[2].intensity == 5)
          lights.children[0].children[2].intensity = 0;
        else {
          lights.children[0].children[2].intensity = 5;
        }
        break;
    case 50:  //2 SideView
        if(lights.children[1].children[2].intensity == 5)
          lights.children[1].children[2].intensity = 0;
        else {
          lights.children[1].children[2].intensity = 5;
        }
        break;
    case 51:  // 3 FrontView
        if(lights.children[2].children[2].intensity == 5){
          lights.children[2].children[2].intensity = 0;
        }

        else {
          lights.children[2].children[2].intensity = 5;
        }
        break;
    case 52:  // 4 InitialView
        if(lights.children[3].children[2].intensity == 5)
          lights.children[3].children[2].intensity = 0;
        else {
          lights.children[3].children[2].ntensity = 5;
        }
        break;


    case 76: //G
    case 108: //g
        var material =  new THREE.MeshBasicMaterial( { color: 0xff0000} );
        for (var i = 0; i < airplane.children.length-2; i++) {
          if(airplane.children[i].material.type == 'MeshBasicMaterial'){
            airplane.children[i].material = new THREE.MeshLambertMaterial( { color: 0xff0000,emissive: 0x2a2a2a,  emissiveIntensity:   1 } );
          }
          else{
            airplane.children[i].material = material;
          }
        }
        if(airplane.children[i+1].material.type == 'MeshBasicMaterial')
          airplane.children[i+1].material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30 } );
        else {
          airplane.children[i+1].material = new THREE.MeshBasicMaterial( { color: 0x000000} );;
        }
        if(airplane.children[i].material.type == 'MeshBasicMaterial')
          airplane.children[i].material = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.5});
        else {
          airplane.children[i].material = new THREE.MeshBasicMaterial( { color: 0xffffff} );;
        }
        break;

    case 71: //L
    case 103: //l
      var material1 = new THREE.MeshLambertMaterial( { color: 0xff0000,emissive: 0x2a2a2a,  emissiveIntensity:   1 } );
      var material2 = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0xff0000, specular: 0x555555, shininess: 30 } );
      for (var i = 0; i < airplane.children.length-2; i++) {
        if (airplane.children[i].material.type == 'MeshPhongMaterial') {
          airplane.children[i].material = material1;
        }
        else {
          airplane.children[i].material = material2;
        }
      }
      if(airplane.children[i+1].material.type == 'MeshLambertMaterial')
        airplane.children[i+1].material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30 } );
      else {
        airplane.children[i+1].material = new THREE.MeshLambertMaterial( { color: 0x000000,emissive: 0x2a2a2a,  emissiveIntensity:   1 } );
      }

      if(airplane.children[i].material.type == 'MeshStandardMaterial')
        airplane.children[i].material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0xffffff, specular: 0x555555, shininess: 30 } );
      else {
        airplane.children[i].material = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.5});
      }
      break;


    case 78: //N
    case 110: //n
        if(dlight.intensity == 1)
          dlight.intensity = 0;
        else {
          dlight.intensity = 1;
        }
        break;
    }
}

function onKeyUp(e){
    switch (e.keyCode) {
    case 40: //upKey
        up = 0;
        break;
    case 38: //downKey
        up = 0;
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
    rot = up = 0;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    now = Date.now();
    delta = now - t;
    t = Date.now();
    airplane.rotateY(((2*Math.PI)/1000)*delta*rot);
    airplane.rotateX(((2*Math.PI)/1000)*delta*up);


    render();
    controls.update();
    requestAnimationFrame(animate);
}
