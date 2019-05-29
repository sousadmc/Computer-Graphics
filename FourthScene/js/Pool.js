var material1;
var geometry1;
var mesh1, texture1;

class Pool extends THREE.Object3D{

    constructor(x, y, z){
        super();
        this.position.set(x,y,z);
    }

    create(){
        this.addTableTop(this, 12, 3.47, 0);
    }

	  addTableTop(obj, x, y, z) {
        geometry1 = new THREE.SphereGeometry(3.47,32,32);

        texture1 = new THREE.TextureLoader().load('js/ball.jpg');
        texture1.minFilter = THREE.NearestFilter;
        texture1.magFilter = THREE.NearestFilter;
        material1 = new THREE.MeshPhongMaterial({ map: texture1, wireframe: false, specular:0xefe1ae});
        mesh1 = new THREE.Mesh(geometry1, material1);
        mesh1.castShadow = true;
        mesh1.receiveShadow = true;
        mesh1.position.set(x, y, z);

        mesh1.rotateY(Math.PI/2);
        obj.add(mesh1);
    }

    changeLight(obj){
        if(obj.children[0].material.type == 'MeshBasicMaterial'){
          obj.children[0].material = new THREE.MeshPhongMaterial({ map: texture1, specular:0xefe1ae});
        }
        else {
          obj.children[0].material = new THREE.MeshBasicMaterial({ map: texture1});
        }
        return obj;
    }
}
