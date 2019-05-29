var material;
var geometry;
var mesh;
var camera;

class Airplane extends THREE.Object3D{

	constructor(x, y, z){
        super();
        this.position.set(x,y,z);

    }

    create(){
			this.addRWing(this,5,0,-7);
      this.addLWing(this,-12,0,-7);
      this.addFuselage(this,0,0,0);
      this.addStabilizer(this,0,4.7,-16);
      this.addCockpit(this,0,2,6);


    }


    addLWing(obj, x, y, z){
      geometry = new THREE.Geometry();
      var v1 = new THREE.Vector3(0,0,0);
      var v2 = new THREE.Vector3(9,0,0);
      var v3 = new THREE.Vector3(9,3,0);
      var v4 = new THREE.Vector3(0,0,0);
      var v5 = new THREE.Vector3(8.4,0,6);
      var v6 = new THREE.Vector3(8.4,2,6);

      geometry.vertices.push(v1);
      geometry.vertices.push(v2);
      geometry.vertices.push(v3);
      geometry.vertices.push(v4);
      geometry.vertices.push(v5);
      geometry.vertices.push(v6);

      geometry.faces.push(new THREE.Face3(0,1,2));
      geometry.faces.push(new THREE.Face3(2,1,0));
      geometry.faces.push(new THREE.Face3(5,4,3));
      geometry.faces.push(new THREE.Face3(3,4,5));
      geometry.faces.push(new THREE.Face3(0,1,4));
      geometry.faces.push(new THREE.Face3(4,1,0));
      geometry.faces.push(new THREE.Face3(0,2,5));
      geometry.faces.push(new THREE.Face3(5,2,0));

      geometry.computeFaceNormals();



      var material = new THREE.MeshLambertMaterial( { color: 0xff0000,emissive: 0x2a2a2a,  emissiveIntensity:   1 } );
      material.side = THREE.DoubleSide;
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	obj.add(mesh);

    }

    addRWing(obj, x, y, z){
      geometry = new THREE.Geometry();
      var v2 = new THREE.Vector3(-2,0,0);
      var v1 = new THREE.Vector3(7,0,0);
      var v3 = new THREE.Vector3(-2,3,0);
      var v4 = new THREE.Vector3(7,0,0);
      var v5 = new THREE.Vector3(-1.4,0,6);
      var v6 = new THREE.Vector3(-1.4,2,6);
      //draw square ligar as duas Faces

      //draw triangulos superior e inferior

      geometry.vertices.push(v1);
      geometry.vertices.push(v2);
      geometry.vertices.push(v3);
      geometry.vertices.push(v4);
      geometry.vertices.push(v5);
      geometry.vertices.push(v6);

      geometry.faces.push(new THREE.Face3(0,1,2));
      geometry.faces.push(new THREE.Face3(2,1,0));
      geometry.faces.push(new THREE.Face3(5,4,3));
      geometry.faces.push(new THREE.Face3(3,4,5));
      geometry.faces.push(new THREE.Face3(0,1,4));
      geometry.faces.push(new THREE.Face3(4,1,0));
      geometry.faces.push(new THREE.Face3(0,2,5));
      geometry.faces.push(new THREE.Face3(5,2,0));

      geometry.computeFaceNormals();



      var material = new THREE.MeshLambertMaterial( { color: 0xff0000,emissive: 0x2a2a2a,  emissiveIntensity:   1 } );
      material.side = THREE.DoubleSide;
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	obj.add(mesh);

    }

    addCockpit(obj, x, y, z){
      geometry = new THREE.Geometry();
      var v1 = new THREE.Vector3(3,0,0);
      var v2 = new THREE.Vector3(-3,0,0);
      var v3 = new THREE.Vector3(3,1.5,-1);
      var v4 = new THREE.Vector3(-3,1.5,-1);
      var v5 = new THREE.Vector3(3,2,-4);
      var v6 = new THREE.Vector3(-3,2,-4);

      geometry.vertices.push(v1);
      geometry.vertices.push(v2);
      geometry.vertices.push(v3);
      geometry.vertices.push(v4);
      geometry.vertices.push(v5);
      geometry.vertices.push(v6);

      geometry.faces.push(new THREE.Face3(0,1,2));
      geometry.faces.push(new THREE.Face3(2,1,0));
      geometry.faces.push(new THREE.Face3(1,3,2));
      geometry.faces.push(new THREE.Face3(2,3,1));
      geometry.faces.push(new THREE.Face3(2,3,5));
      geometry.faces.push(new THREE.Face3(5,3,2));
      geometry.faces.push(new THREE.Face3(2,4,5));
      geometry.faces.push(new THREE.Face3(5,4,2));
      geometry.faces.push(new THREE.Face3(0,2,4));
      geometry.faces.push(new THREE.Face3(4,2,0));
      geometry.faces.push(new THREE.Face3(1,3,5));
      geometry.faces.push(new THREE.Face3(5,3,1));


      geometry.computeFaceNormals();



      var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30 } );
      material.side = THREE.DoubleSide;
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	obj.add(mesh);

    }

    addFuselage(obj, x, y, z){
      geometry = new THREE.Geometry();
      var v1 = new THREE.Vector3(5,5,0);
      var v2 = new THREE.Vector3(-5,5,0);
      var v3 = new THREE.Vector3(2.5,0,10);
      var v4 = new THREE.Vector3(-2.5,0,10);
      var v5 = new THREE.Vector3(2.5,0,-10);
      var v6 = new THREE.Vector3(-2.5,0,10);
      var v7 = new THREE.Vector3(5,-1.5,0);
      var v8 = new THREE.Vector3(-5,-1.5,0);
      var v9 = new THREE.Vector3(2.5,5,-15);
      var v10 = new THREE.Vector3(0,-1.5,0);
      var v11 = new THREE.Vector3(0,5,0);
      var v12 = new THREE.Vector3(3,-1.5,-15);
      var v13 = new THREE.Vector3(-3,-1.5,-15);
      var v14 = new THREE.Vector3(3,5,-15);
      var v15 = new THREE.Vector3(-3,5,-15);
      var v16 = new THREE.Vector3(-3,0,-18);
      var v17 = new THREE.Vector3(3,0,-18);
      var v18 = new THREE.Vector3(-3,3,-18);
      var v19 = new THREE.Vector3(3,3,-18);
      var v20 = new THREE.Vector3(3,2,-15);
      var v21 = new THREE.Vector3(-3,2,-15);


      //draw square ligar as duas Faces

      //draw triangulos superior e inferior

      geometry.vertices.push(v1);
      geometry.vertices.push(v2);
      geometry.vertices.push(v3);
      geometry.vertices.push(v4);
      geometry.vertices.push(v5);
      geometry.vertices.push(v6);
      geometry.vertices.push(v7);
      geometry.vertices.push(v8);
      geometry.vertices.push(v9);
      geometry.vertices.push(v10);
      geometry.vertices.push(v11);
      geometry.vertices.push(v12);
      geometry.vertices.push(v13);
      geometry.vertices.push(v14);
      geometry.vertices.push(v15);
      geometry.vertices.push(v16);
      geometry.vertices.push(v17);
      geometry.vertices.push(v18);
      geometry.vertices.push(v19);
      geometry.vertices.push(v20);
      geometry.vertices.push(v21);

      geometry.faces.push(new THREE.Face3(0,1,2));
      geometry.faces.push(new THREE.Face3(2,1,0));
      geometry.faces.push(new THREE.Face3(0,1,3));
      geometry.faces.push(new THREE.Face3(3,1,0));

      geometry.faces.push(new THREE.Face3(6,7,2));
      geometry.faces.push(new THREE.Face3(2,7,6));
      geometry.faces.push(new THREE.Face3(0,1,3));
      geometry.faces.push(new THREE.Face3(3,1,0));

      geometry.faces.push(new THREE.Face3(2,3,9));
      geometry.faces.push(new THREE.Face3(9,3,2));
      geometry.faces.push(new THREE.Face3(2,3,10));
      geometry.faces.push(new THREE.Face3(10,3,2));
      geometry.faces.push(new THREE.Face3(7,6,3));
      geometry.faces.push(new THREE.Face3(3,6,7));

      geometry.faces.push(new THREE.Face3(0,2,6));
      geometry.faces.push(new THREE.Face3(6,2,0));
      geometry.faces.push(new THREE.Face3(1,3,7));
      geometry.faces.push(new THREE.Face3(7,3,1));

      geometry.faces.push(new THREE.Face3(6,7,11));
      geometry.faces.push(new THREE.Face3(11,7,6));

      geometry.faces.push(new THREE.Face3(7,6,12));
      geometry.faces.push(new THREE.Face3(6,12,11));

      geometry.faces.push(new THREE.Face3(12,6,7));
      geometry.faces.push(new THREE.Face3(11,12,6));

      geometry.faces.push(new THREE.Face3(0,1,13));
      geometry.faces.push(new THREE.Face3(13,1,0));

      geometry.faces.push(new THREE.Face3(1,0,14));
      geometry.faces.push(new THREE.Face3(14,0,1));

      geometry.faces.push(new THREE.Face3(14,0,1));
      geometry.faces.push(new THREE.Face3(13,14,0));

      geometry.faces.push(new THREE.Face3(13,14,18));
      geometry.faces.push(new THREE.Face3(18,14,13));

      geometry.faces.push(new THREE.Face3(14,13,17));
      geometry.faces.push(new THREE.Face3(17,13,14));

      geometry.faces.push(new THREE.Face3(17,18,13));
      geometry.faces.push(new THREE.Face3(13,18,17));

      geometry.faces.push(new THREE.Face3(11,12,15));
      geometry.faces.push(new THREE.Face3(15,12,11));

      geometry.faces.push(new THREE.Face3(12,11,16));
      geometry.faces.push(new THREE.Face3(16,11,12));

      geometry.faces.push(new THREE.Face3(15,16,11));
      geometry.faces.push(new THREE.Face3(11,16,15));

      geometry.faces.push(new THREE.Face3(15,16,18));
      geometry.faces.push(new THREE.Face3(18,16,15));

      geometry.faces.push(new THREE.Face3(16,15,17));
      geometry.faces.push(new THREE.Face3(17,15,16));

      geometry.faces.push(new THREE.Face3(17,18,16));
      geometry.faces.push(new THREE.Face3(16,18,17));

      geometry.faces.push(new THREE.Face3(0,13,11));
      geometry.faces.push(new THREE.Face3(11,13,0));

      geometry.faces.push(new THREE.Face3(6,11,0));
      geometry.faces.push(new THREE.Face3(0,11,6));

      geometry.faces.push(new THREE.Face3(1,14,12));
      geometry.faces.push(new THREE.Face3(12,14,1));

      geometry.faces.push(new THREE.Face3(7,12,1));
      geometry.faces.push(new THREE.Face3(1,12,7));


      geometry.faces.push(new THREE.Face3(19,11,16));
      geometry.faces.push(new THREE.Face3(16,11,19));

      geometry.faces.push(new THREE.Face3(19,13,18));
      geometry.faces.push(new THREE.Face3(18,13,19));

      geometry.faces.push(new THREE.Face3(19,18,16));
      geometry.faces.push(new THREE.Face3(16,18,19));


      geometry.faces.push(new THREE.Face3(20,12,15));
      geometry.faces.push(new THREE.Face3(15,12,20));

      geometry.faces.push(new THREE.Face3(20,12,17));
      geometry.faces.push(new THREE.Face3(17,12,20));

      geometry.faces.push(new THREE.Face3(14,17,20));
      geometry.faces.push(new THREE.Face3(20,17,14));

      geometry.faces.push(new THREE.Face3(15,17,20));
      geometry.faces.push(new THREE.Face3(20,17,15));



      geometry.computeFaceNormals();




      var material = new THREE.MeshLambertMaterial( { color: 0xff0000,emissive: 0x2a2a2a,  emissiveIntensity:   1 } );
      //material.side = THREE.DoubleSide;
      material.shading = THREE.FlatShading;
      material.shading = THREE.SmoothShading;

      mesh = new THREE.Mesh(geometry, material);


    	mesh.position.set(x, y, z);
    	obj.add(mesh);

    }

    addStabilizer(obj, x, y, z){
      geometry = new THREE.Geometry();
      var v1 = new THREE.Vector3(0.5,0,0);
      var v2 = new THREE.Vector3(-0.5,0,0);
      var v3 = new THREE.Vector3(0,5.5,0);
      var v4 = new THREE.Vector3(0,5.5,0);
      var v5 = new THREE.Vector3(0.5,-1.2,-1.8);
      var v6 = new THREE.Vector3(-0.5,-1.2,-1.8);
      var v7 = new THREE.Vector3(4,2.5,-1);
      var v8 = new THREE.Vector3(-4,2.5,-1);
      var v9 = new THREE.Vector3(0,3,-1);
      var v10 = new THREE.Vector3(0,2,-1);
      var v11 = new THREE.Vector3(0,3,0);
      var v12 = new THREE.Vector3(0,2,0);


      geometry.vertices.push(v1);
      geometry.vertices.push(v2);
      geometry.vertices.push(v3);
      geometry.vertices.push(v4);
      geometry.vertices.push(v5);
      geometry.vertices.push(v6);
      geometry.vertices.push(v7);
      geometry.vertices.push(v8);
      geometry.vertices.push(v9);
      geometry.vertices.push(v10);
      geometry.vertices.push(v11);
      geometry.vertices.push(v12);


      geometry.faces.push(new THREE.Face3(0,1,2));
      geometry.faces.push(new THREE.Face3(2,1,0));
      geometry.faces.push(new THREE.Face3(1,3,2));
      geometry.faces.push(new THREE.Face3(2,3,1));
      geometry.faces.push(new THREE.Face3(2,3,5));
      geometry.faces.push(new THREE.Face3(5,3,2));
      geometry.faces.push(new THREE.Face3(2,4,5));
      geometry.faces.push(new THREE.Face3(5,4,2));
      geometry.faces.push(new THREE.Face3(0,2,4));
      geometry.faces.push(new THREE.Face3(4,2,0));
      geometry.faces.push(new THREE.Face3(1,3,5));
      geometry.faces.push(new THREE.Face3(5,3,1));


      geometry.faces.push(new THREE.Face3(6,10,11));
      geometry.faces.push(new THREE.Face3(11,10,6));
      geometry.faces.push(new THREE.Face3(6,9,11));
      geometry.faces.push(new THREE.Face3(11,9,6));
      geometry.faces.push(new THREE.Face3(6,8,9));
      geometry.faces.push(new THREE.Face3(9,8,6));
      geometry.faces.push(new THREE.Face3(6,8,10));
      geometry.faces.push(new THREE.Face3(10,8,6));

      geometry.faces.push(new THREE.Face3(7,10,11));
      geometry.faces.push(new THREE.Face3(11,10,7));
      geometry.faces.push(new THREE.Face3(7,9,11));
      geometry.faces.push(new THREE.Face3(11,9,7));
      geometry.faces.push(new THREE.Face3(7,8,9));
      geometry.faces.push(new THREE.Face3(9,8,7));
      geometry.faces.push(new THREE.Face3(7,8,10));
      geometry.faces.push(new THREE.Face3(10,8,7));


      geometry.computeFaceNormals();



      var material = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.5});
      material.side = THREE.DoubleSide;
    	mesh = new THREE.Mesh(geometry, material);
    	mesh.position.set(x, y, z);
    	obj.add(mesh);
    }
}
