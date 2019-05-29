var material2;
var geometry2;
var mesh2;
var texture2;
var materials, materials5;
class Cube extends THREE.Object3D{

    constructor(x, y, z){
        super();
        this.position.set(x,y,z);
    }

    create(obj){
        geometry2 = new THREE.BoxGeometry(8, 8, 8);

        var textures = [];
        var loader = new THREE.TextureLoader();
        materials = [new THREE.MeshPhongMaterial({ map: loader.load('js/cube1.jpg'), bumpMap:loader.load('js/cube1.jpg')}),
                      new THREE.MeshPhongMaterial({ map: loader.load('js/cube2.jpg'), bumpMap:loader.load('js/cube2.jpg')}),
                      new THREE.MeshPhongMaterial({ map: loader.load('js/cube3.jpg'), bumpMap:loader.load('js/cube3.jpg')}),
                      new THREE.MeshPhongMaterial({ map: loader.load('js/cube4.jpg'), bumpMap:loader.load('js/cube4.jpg')}),
                      new THREE.MeshPhongMaterial({ map: loader.load('js/cube5.jpg'), bumpMap:loader.load('js/cube5.jpg')}),
                      new THREE.MeshPhongMaterial({ map: loader.load('js/cube6.jpg'), bumpMap:loader.load('js/cube6.jpg')})];

        materials5 = [new THREE.MeshBasicMaterial({ map: loader.load('js/cube1.jpg'), bumpMap:loader.load('js/cube1.jpg')}),
                        new THREE.MeshBasicMaterial({ map: loader.load('js/cube2.jpg'), bumpMap:loader.load('js/cube2.jpg')}),
                        new THREE.MeshBasicMaterial({ map: loader.load('js/cube3.jpg'), bumpMap:loader.load('js/cube3.jpg')}),
                        new THREE.MeshBasicMaterial({ map: loader.load('js/cube4.jpg'), bumpMap:loader.load('js/cube4.jpg')}),
                        new THREE.MeshBasicMaterial({ map: loader.load('js/cube5.jpg'), bumpMap:loader.load('js/cube5.jpg')}),
                        new THREE.MeshBasicMaterial({ map: loader.load('js/cube6.jpg'), bumpMap:loader.load('js/cube6.jpg')})];


        mesh2 = new THREE.Mesh(geometry2,new THREE.MeshFaceMaterial(materials));
        mesh2.castShadow = true;
        mesh2.receiveShadow = true;
        mesh2.position.set(0, 0.01, 0);
        obj.add(mesh2);
    }

    changeLight(obj){
        for (var i = 0; i < 6; i++) {
          obj.children[0].material.materials[i].wireframe = false;
        }
        if(obj.children[0].material.materials[0].type == 'MeshBasicMaterial'){
          obj.children[0].material = new THREE.MeshFaceMaterial(materials);
        }
        else {
          obj.children[0].material = new THREE.MeshFaceMaterial(materials5);
        }
        return obj;
    }
}
