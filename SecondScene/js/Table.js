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
        this.addTableLeg1(this, 41, 4.4, 0);
        this.addTableLeg1(this, -41, 4.4, 0);
        this.addTableLeg2(this, 0, 4.4, 21);
        this.addTableLeg2(this, 0, 4.4, -21);
    }

	addTableLeg1(obj, x, y, z){
        geometry = new THREE.BoxGeometry(2,10.94,44);
        material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        obj.add(mesh);
	}

  addTableLeg2(obj, x, y, z){
        geometry = new THREE.BoxGeometry(80,10.94,2);
        material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        obj.add(mesh);
	}

	addTableTop(obj, x, y, z) {
        geometry = new THREE.CubeGeometry(80, 2, 40);
        material = new THREE.MeshBasicMaterial({ color: 0x008080, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        obj.add(mesh);
    }
}
