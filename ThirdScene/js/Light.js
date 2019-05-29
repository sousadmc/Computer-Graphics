var spotLight, spotter,light, light1, light2, light3, light4, geometry;
var mesh;

class Light extends THREE.Object3D{

    constructor(x,y){
        super();
        this.create(x,y, this);
    }

    create(one, two, obj){
      light1 = new THREE.Object3D();
      light2 = new THREE.Object3D();
      light3 = new THREE.Object3D();
      light4 = new THREE.Object3D();

      geometry = new THREE.ConeGeometry(3, 3, 64,1);
      material = new THREE.MeshBasicMaterial({ color: 0xe8e099});
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(one, two, 0);
      mesh.rotation.x = -(Math.PI)/4;
      mesh.rotation.z = -(Math.PI)/6;
      light1.add(mesh);

      geometry = new THREE.SphereGeometry(1, 32, 32);
      material = new THREE.MeshBasicMaterial({ color: 0xfffffff});
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(one-1, two-1, 0);
      light1.add(mesh);

      light = new THREE.SpotLight( 0xffffff, 5, 50, Math.PI/6, 10);
      light.penumbra = 0.2;
      light.position.set(one,two,0);
      light1.add( light );
      light1.add( light.target);
      //var spotter = new THREE.SpotLightHelper(light);
      //light1.add(spotter);


      obj.add(light1);


      geometry = new THREE.ConeGeometry(3, 3, 64,1);
      material = new THREE.MeshBasicMaterial({ color: 0xe8e099});
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, one, two);
      mesh.rotation.x = (Math.PI)/4;
      mesh.rotation.z = (Math.PI)/6;
      light2.add(mesh);

      geometry = new THREE.SphereGeometry(1, 32, 32);
      material = new THREE.MeshBasicMaterial({ color: 0xfffffff});
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, one-1, two-1);
      light2.add(mesh);

      light = new THREE.SpotLight( 0xffffff, 5, 50, Math.PI/6, 10);
      light.penumbra = 0.2;
      light.position.set(0,one,two);
      light2.add( light );
      light2.add( light.target);
      //var spotter = new THREE.SpotLightHelper(light);
      //light2.add(spotter);


      obj.add(light2);

      geometry = new THREE.ConeGeometry(3, 3, 64,1);
      material = new THREE.MeshBasicMaterial({ color: 0xe8e099});
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, one, -two);
      mesh.rotation.z = -(Math.PI)/6;
      light3.add(mesh);

      geometry = new THREE.SphereGeometry(1, 32, 32);
      material = new THREE.MeshBasicMaterial({ color: 0xfffffff});
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, one-1, -two+1);
      light3.add(mesh);

      light = new THREE.SpotLight( 0xffffff, 5, 50, Math.PI/6, 10);
      light.penumbra = 0.2;
      light.position.set(0,one,-two);
      light3.add( light );
      light3.add( light.target);
      //var spotter = new THREE.SpotLightHelper(light);
      //light3.add(spotter);
      obj.add(light3);


      geometry = new THREE.ConeGeometry(3, 3, 64,1);
      material = new THREE.MeshBasicMaterial({ color: 0xe8e099});
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-one, two, 0);
      mesh.rotation.x = (Math.PI)/6;
      light4.add(mesh);

      geometry = new THREE.SphereGeometry(1, 32, 32);
      material = new THREE.MeshBasicMaterial({ color: 0xfffffff});
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-one+1, two-1, 0);
      light4.add(mesh);

      light = new THREE.SpotLight( 0xffffff, 5, 50, Math.PI/6, 10);
      light.penumbra = 0.2;
      light.position.set(-one,two,0);
      light4.add( light);
      light4.add( light.target);
      //var spotter = new THREE.SpotLightHelper(light);
      //light4.add(spotter);
      obj.add(light4);


    }
}
