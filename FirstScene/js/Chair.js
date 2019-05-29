var material;
var geometry;
var mesh;

class Chair extends THREE.Object3D{

	constructor(x, y, z){
        super();
        this.position.set(x,y,z);
    }

    create(){
    	this.addChairBack(this,0,4.05,3);
    	this.addChairBottom(this, 0, 0, 0);
    	this.addChairLeg(this, 0, -2.35, 0);
    	this.addChairLeg1(this, 0, -3.75, 0);
    	this.addChairLeg2(this, 0, -3.75, 0);
    	var one = this.addChairWheel(this, -2.3, -4.45, 0);
    	this.add(one);
    	one.rotation.y = Math.PI/2;
    	var two = this.addChairWheel(this, 2.3, -4.45, 0);
    	two.rotation.y = Math.PI/2;
    	this.add(two);
    	var three = this.addChairWheel(this, 0, -4.45, 2.1);
    	three.rotation.y = Math.PI/2;
    	this.add(three);
    	var four = this.addChairWheel(this, 0, -4.45, -2.1);
    	four.rotation.y = Math.PI/2;
    	this.add(four);
    }

    getWheels(name, delta){
    	for (var i = 0; i < 9; i++){
			if(this.children[i].name == name)
				this.children[i].rotateZ(delta/Math.PI);
    	}
    }


    addChairBack(obj, x, y, z){
    	geometry = new THREE.CubeGeometry(7,7,1);
    	var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	obj.add(mesh);
	}

	addChairBottom(obj, x, y, z){
    	geometry = new THREE.CubeGeometry(7,1,7);
    	var material = new THREE.MeshBasicMaterial( { color: 0xff0f00, wireframe: true } );
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	obj.add(mesh);
	}

	addChairLeg(obj, x, y, z){
    	geometry = new THREE.CylinderGeometry(0.4, 0.4, 3.6, 10,1, true);
    	var material = new THREE.MeshBasicMaterial( { color: 0xff0f00, wireframe: true } );
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	obj.add(mesh);
	}


	addChairLeg1(obj, x, y, z){
    	geometry = new THREE.CylinderGeometry(0.4, 0.4, 5, 10,1, true);
    	var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	mesh.rotation.x = Math.PI/2;
    	obj.add(mesh);
	}

	addChairLeg2(obj, x, y, z){
    	geometry = new THREE.CylinderGeometry(0.4, 0.4, 5, 10,1, true);
    	var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	mesh.rotation.x = Math.PI/2;
    	mesh.rotation.z = Math.PI/2;
    	obj.add(mesh);
	}

	addChairWheel(obj, x, y, z) {
    	//geometry = new THREE.TorusGeometry(0.4, 0.4, 20, 10, 6.3);
      geometry = new THREE.CubeGeometry(1, 1, 1);
    	var material = new THREE.MeshBasicMaterial( { color: 0x00BFFF, wireframe: true } );
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	mesh.name = "wheel";
    	obj.add(mesh);
    	return mesh;
	}
}
