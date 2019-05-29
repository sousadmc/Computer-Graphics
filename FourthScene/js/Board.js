var material;
var geometry;
var mesh, texture;

class Board extends THREE.Object3D{

    constructor(x, y, z){
        super();
        this.position.set(x,y,z);
    }

    create(){
        this.addTableTop(this, 0, 0, 0);
    }

	  addTableTop(obj, x, y, z) {
        geometry = new THREE.PlaneGeometry(40, 40);

        texture = new THREE.TextureLoader().load('js/board.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        texture.repeat.set(4, 4);

        material = new THREE.MeshPhongMaterial({ map: texture, wireframe: false, side: THREE.DoubleSide });
        mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.rotation.x = -Math.PI/2;
        mesh.position.set(x, y, z);
        obj.add(mesh);
    }

    changeLight(obj){
        if(obj.children[0].material.type == 'MeshBasicMaterial')
          obj.children[0].material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide  });
        else {
          obj.children[0].material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide  });
        }
        return obj;

    }
}
