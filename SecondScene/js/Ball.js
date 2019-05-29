var material;
var geometry;
var mesh;
var camera;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function setRandomColor() {
  $("#colorpad").css("background-color", getRandomColor());
}

class Ball extends THREE.Object3D{

	constructor(x, y, z){
        super();
        this.position.set(x,y,z);
				this.create();
				return this;
    }

    create(){
			this.add(new THREE.AxisHelper(7));
			geometry = new THREE.SphereGeometry(4.47,32,32);
			var material = new THREE.MeshBasicMaterial( { color: getRandomColor(), wireframe: true } );
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0,0,0);
			var a  = THREE.Math.randFloat(0, Math.PI);
			this.add(mesh);
			this.rotateY(a);
      this.rad = 4.47;
			camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 2, 100);
	    camera.position.set(0, 10.47, -10);
	    camera.lookAt(scene.position);
			this.add(camera);
			var vel = {x: THREE.Math.randFloat(0.05, 0.3), z: THREE.Math.randFloat(0.05, 0.3)}
      this.vel = vel;
			this.rot = a;
    }

    speed() {
      return Math.sqrt(this.vel.x * this.vel.x + this.vel.z * this.vel.z);
    }
}
