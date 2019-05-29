var material;
var geometry;
var mesh;

class Table extends THREE.Object3D{

    constructor(x, y, z){
        super();
        this.position.set(x,y,z);
    }

    create(){
        this.addTableTop(this, 0, 0, 0);
        this.addTableLeg(this, -25, -4, -8);
        this.addTableLeg(this, -25, -4, 8);
        this.addTableLeg(this, 25, -4, 8);
        this.addTableLeg(this, 25, -4, -8);
    }
	
	addTableLeg(obj, x, y, z){
        geometry = new THREE.CylinderGeometry(1, 2, 6, 32,1, true);
        material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        obj.add(mesh);
	}

	addTableTop(obj, x, y, z) {
        geometry = new THREE.CubeGeometry(60, 2, 20);
        material = new THREE.MeshBasicMaterial({ color: 0x00BFFF, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        obj.add(mesh);
    }
}

