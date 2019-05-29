var material;
var geometry;
var mesh;

class Lamp extends THREE.Object3D{

    constructor(x, y, z){
        super();
        this.position.set(x,y,z);
    }

    create(){
        this.addLampFoot(this, 0, 0, 0);
        this.addLampLeg(this, 0, 8.2, 0);
        this.addLampCone(this, -1.3, 15.9, 0.6);
        this.addLamp(this, -2.5, 15.9, 1.5);
    }
	
	addLampFoot(obj, x, y, z){
        geometry = new THREE.CylinderGeometry(4, 4, 0.5, 32,1);
        material = new THREE.MeshBasicMaterial( { color: 0x0fff00, wireframe: true } );
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        obj.add(mesh);
	}

	addLampLeg(obj, x, y, z) {
        geometry = new THREE.CylinderGeometry(0.2, 0.2, 16, 16,1);
        material = new THREE.MeshBasicMaterial( { color: 0x0fff00, wireframe: true } );
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        obj.add(mesh);
    }

    addLampCone(obj, x, y, z) {
        geometry = new THREE.ConeGeometry(3, 3, 64,1);
        material = new THREE.MeshBasicMaterial({ color: 0x0fff00, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.rotation.x = -(Math.PI)/3;
        mesh.rotation.z = -(Math.PI)/3;
        obj.add(mesh);
    }

    addLamp(obj, x, y, z) {
        geometry = new THREE.SphereGeometry(1, 32, 32);
        material = new THREE.MeshBasicMaterial({ color: 0xffff000, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        obj.add(mesh);
    }
}