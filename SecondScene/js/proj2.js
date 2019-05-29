/*global THREE, requestAnimationFrame, console*/

var camera2, scene, renderer, camera1, camera;

var geometry, material, mesh, table, now, delta;

var ball;

var balls = [];
var clock, t, time;

function createBall() {
  var a = 0;
  var b = 0;
  var i;
  for (i = 0; i < 10; i++) {
    if(i == 0){
      a =  THREE.Math.randFloat(-35.00, 35.00);
      b =  THREE.Math.randFloat((-15.00), 15.00);
      ball = new Ball(a, 6.47, b);
      balls[i] = ball;
      scene.add(ball);
    }
    else{
      var l = balls.length-1;
      a =  THREE.Math.randFloat(-35.00, 35.00);
      b =  THREE.Math.randFloat((-15.00), 15.00);
      ball = new Ball(a, 6.47, b);

      while(l != -1){

        if(((a - balls[l].position.x)*(a - balls[l].position.x)) + ((b - balls[l].position.z)*(b - balls[l].position.z)) > 79.92){
          l--;
        }
        else{
          l = balls.length-1;
          a =  THREE.Math.randFloat(-35.00, 35.00);
          b =  THREE.Math.randFloat((-15.00), 15.00);
          ball = new Ball(a, 6.47, b);

        }
      }
      balls[i] = ball;
      scene.add(ball);
      }
    }
}

function createTable(x, y, z) {
    table = new Table(x,y,z);
    table.create();
    scene.add(table);
}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(7));

    createTable(0, 1, 0);
    createBall();
}

//camera do inicio da animacao
function createCamera() {
    camera1 = new THREE.OrthographicCamera(window.innerWidth/20, -window.innerWidth/20, window.innerHeight/20, -window.innerHeight/20,1000,1);
    camera1.position.set(0,-50,0);
    camera1.lookAt(scene.position);

    camera2 = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera2.position.set(-50,35,0);
    camera2.lookAt(scene.position);
}

function onResize() {
  if(camera == camera2){
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
  }
  else {
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.left = window.innerWidth/20;
        camera.right = window.innerWidth/-20;
        camera.top = window.innerHeight/20;
        camera.bottom =  window.innerHeight/-20;
        camera.updateProjectionMatrix();
    }
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
    case 49:  //1 TopView
        camera = camera1;
        camera.position.set(0,-50, 0);
        camera.lookAt(scene.position);
        break;
    case 50:  //2 SideView
        camera = camera2;
        break;
    case 51:  // 3 CameraView
        camera = balls[0].children[2];
        break;
    case 52:  // 4 InitialView
        camera = camera1;
        camera.position.set(80,-40, -50);
        camera.lookAt(scene.position);
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
    camera = camera1;
    t = Date.now(); //valor do relogio do momento de inicio da animacao guardado para ser utilizado na componente da velocidade
    time = 0;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function distance(ball1,ball2){
  var dx = ball2.position.x - ball1.position.x;
  var dy = ball2.position.z - ball1.position.z;

  return Math.sqrt((dx*dx)+(dy*dy));
}


function animate() {
    now = Date.now();
    delta = now - t;
    t = Date.now();
    time++;
    if (time == 1800){
      for (var i = 0; i < balls.length; i++) {
        balls[i].vel.x *= 2;
        balls[i].vel.z *= 2;
      }
      time = 0;
    }
    for (var i = 0; i < balls.length; i++) {
      if(balls[i].position.x >= 35.53 || balls[i].position.x <= -35.53){
        balls[i].vel.x = -balls[i].vel.x;
        balls[i].rotateY(Math.PI/4);
      }
      if(balls[i].position.z >= 15.53 || balls[i].position.z <= -15.53){
        balls[i].vel.z = -balls[i].vel.z;
        balls[i].rotateY(Math.PI/4);
      }

      balls[i].position.z += balls[i].vel.z;
      balls[i].position.x += balls[i].vel.x;
      balls[i].children[1].rotateX((balls[i].vel.z*delta)/(8.94*Math.PI));
      balls[i].children[1].rotateZ((balls[i].vel.z*delta)/(8.94*Math.PI));
    }

    for (var i = 0; i < balls.length; i++) {
      for (var j = i+1; j < balls.length; j++) {
        if(distance(balls[i],balls[j]) <= (balls[i].rad + balls[j].rad)) {
            var theta1 = Math.atan2(balls[i].vel.z, balls[i].vel.x);
            var theta2 = Math.atan2(balls[j].vel.z, balls[j].vel.x);
            var phi = Math.atan2(balls[j].position.z - balls[i].position.z, balls[j].position.x - balls[i].position.x);
            var v1 = balls[i].speed();
            var v2 = balls[j].speed();
            var spread = (balls[i].rad + balls[j].rad) - distance(balls[i],balls[j]);
            var ax = spread * Math.cos(phi);
            var az = spread * Math.sin(phi);

            balls[i].position.x -= ax;
            balls[i].position.z -= az;


            balls[i].vel.x -= 0.7 * Math.cos(phi);
            balls[i].vel.z -= 0.7 * Math.sin(phi);
            balls[j].vel.x += 0.7 * Math.cos(phi);
            balls[j].vel.z += 0.7 * Math.sin(phi);

            /*balls[i].vel.x = v2*Math.cos(theta2 - phi) *(Math.cos(phi) + (v1*Math.sin(theta1- phi)*Math.cos(phi)));
            balls[i].vel.z = v2*Math.cos(theta2 - phi) *(Math.sin(phi) + (v1*Math.sin(theta1- phi)*Math.sin(phi)));

            balls[j].vel.x = v1*Math.cos(theta1 - phi) *(Math.cos(phi) + (v2*Math.sin(theta2- phi)*Math.cos(phi)));
            balls[j].vel.z = v1*Math.cos(theta1 - phi) *(Math.sin(phi) + (v2*Math.sin(theta2- phi)*Math.sin(phi)));*/

            /*
            var v1 = new THREE.Vector3(balls[i].vel.x,0,balls[i].vel.z);
            var v2 = new THREE.Vector3(balls[j].vel.x,0,balls[j].vel.z);
            var v1F = new THREE.Vector3();
            var vF = new THREE.Vector3();
            var v2F = new THREE.Vector3();
            var c1 = new THREE.Vector3(balls[i].position.x,0,balls[i].position.z);
            var c2 = new THREE.Vector3(balls[j].position.x,0,balls[j].position.z);
            var cF = new THREE.Vector3();
            cF.x = c1.x - c2.x;
            cF.z = c1.z - c2.z;
            vF.x = v1.x - v2.x;
            vF.z = v1.z - v2.z;
            var n = (cF.x*cF.x)+(cF.z*cF.z);
            var viF = (vF.x*cF.x) + (vF.z*cF.z);
            viF = viF/n;
            cF.x = cF.x * viF;
            cF.z = cF.z * viF;
            v1F.x = v1.x - cF.x;
            v1F.z = v1.z - cF.z;
            v2F.x = v2.x + cF.x;
            v2F.z = v2.z + cF.z;
            balls[i].vel.x = v1F.x;
            balls[i].vel.z = v1F.z;
            balls[j].vel.x = v2F.x;
            balls[j].vel.z = v2F.z;*/

            }
        }
    }

    render();
    requestAnimationFrame(animate);
}
