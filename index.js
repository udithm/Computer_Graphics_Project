import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {RectAreaLightUniformsLib} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/lights/RectAreaLightUniformsLib.js';
import {RectAreaLightHelper} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/helpers/RectAreaLightHelper.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';
import WMill from  './OBJFiles/WMill.js';
import Car from  './OBJFiles/car.js';

function setSphericalUVs(geometry) {

  geometry.computeBoundingBox();

  var max = geometry.boundingBox.max;
  var min = geometry.boundingBox.min;

  var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
  var range = new THREE.Vector2(max.x - min.x, max.y - min.y);

  // geometry.attributes.uv[0] = [];
  var faces = geometry.faces;
  var uvAttribute = geometry.attributes.uv;
  var positions = Array.from(geometry.attributes.position.array);
  for (var i = 0; i < positions.length / 3; i++) {
      var x = positions[i * 3];
      var y = positions[i * 3 + 1];
      var z = positions[i * 3 + 2];
      var U = uvAttribute.getX( i );
      var V = uvAttribute.getY( i );
      U = Math.atan2(z, x) / Math.PI * 0.5 + 0.5;
      V = 0.5 - Math.asin(y) / Math.PI;

      uvAttribute.setXY( i, U, V );
  }
  geometry.uvsNeedUpdate = true;
  // console.log(geometry.attributes.uv.array);
}

function setCylindricalUVs(geometry) {

    geometry.computeBoundingBox();

    var max = geometry.boundingBox.max;
    var min = geometry.boundingBox.min;

    var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range = new THREE.Vector2(max.x - min.x, max.y - min.y);

    // geometry.attributes.uv[0] = [];
    var faces = geometry.faces;
    var uvAttribute = geometry.attributes.uv;
    var positions = Array.from(geometry.attributes.position.array);
    for (var i = 0; i < positions.length / 3; i++) {
        var x = positions[i * 3];
        var y = positions[i * 3 + 1];
        var z = positions[i * 3 + 2];
        var U = uvAttribute.getX( i );
        var V = uvAttribute.getY( i );
        U = Math.atan2(x, z) / Math.PI * 0.5 + 0.5
        V = y


        uvAttribute.setXY( i, U, V );
    }  
    geometry.uvsNeedUpdate = true;
    // console.log(geometry.attributes.uv.array);
}


function main() {
  const canvas = document.querySelector('#c');  
  const renderer = new THREE.WebGLRenderer({canvas});
  
  var Tmode = 0;
  const fov = 100;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 20;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.y = 4;
  camera.position.z = 5;
  camera.position.x = 2;
  camera.lookAt(1,-1,1);

  //orbit controls
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const avtarcamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  const dronecamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  dronecamera.position.y = 3;
  dronecamera.position.z = 2;

  const scene = new THREE.Scene();
  //scene.background = new THREE.Color('#FFFFFF');\

  
  const bWidth = 1;
  const bHeight = 1;
  const bDepth = 1;
  const geometry1 = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
  ///////SPHERICAL
  const geometry2 = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
  setCylindricalUVs(geometry2);
  ///////////CYLINDRICAL
  const geometry3 = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
  setSphericalUVs(geometry3);

  const loader1 = new THREE.TextureLoader();


  const headmaterial = new THREE.MeshBasicMaterial({map: loader1.load('./OBJFiles/img3.jpg'),});  
  const headmesh = new THREE.Mesh(geometry1, headmaterial);
  headmesh.scale.set(1, 1, 1);
  headmesh.position.x=-8;
  headmesh.position.y=1;
  scene.add(headmesh);
  /////////////////////////////////////////////////
  // const loader2 = new THREE.TextureLoader();


  const headmesh2 = new THREE.Mesh(geometry1, headmaterial);
  headmesh2.scale.set(1, 1, 1);
  headmesh2.position.x=-8;
  headmesh2.position.y=2;
  scene.add(headmesh2);
  //////////////////////////////////////////////////
  // const loader3 = new THREE.TextureLoader();


  const headmesh3 = new THREE.Mesh(geometry1, headmaterial);
  headmesh3.scale.set(1, 1, 1);
  headmesh3.position.x=-8;
  headmesh3.position.y=3;
  scene.add(headmesh3);
    

  //Lights properties
  const color = 0xFFFFFF;
  const color2 = 0xFF0000;
  const color3 = 0xFEE300;
  const intensity = 1;


  //Directional Light
  const dir_light = new THREE.DirectionalLight(color, intensity);
  dir_light.position.set(0, 6, 0);
  dir_light.target.position.set(0, 0, 0);
  scene.add(dir_light);
  scene.add(dir_light.target);

  //Directional Light helper
  const dir_helper = new THREE.DirectionalLightHelper(dir_light);
  //scene.add(dir_helper);
  
  

  
  //point light
  const sun_light1 = new THREE.PointLight(color, intensity);
  sun_light1.position.set(2, 2, 2);
  scene.add(sun_light1);

  const sun_light2 = new THREE.PointLight(color, intensity);
  sun_light2.position.set(-2, 2, 2);
  scene.add(sun_light2)

  const sun_light3 = new THREE.PointLight(color, intensity);
  sun_light3.position.set(-2, 2, -2);
  scene.add(sun_light3)

  const sun_light4 = new THREE.PointLight(color, intensity);
  sun_light4.position.set(2, 2, -2);
  scene.add(sun_light4)
  
  //point helper
  const sun_helper1 = new THREE.PointLightHelper(sun_light1);
  //scene.add(sun_helper1);

  const sun_helper2 = new THREE.PointLightHelper(sun_light2);
  //scene.add(sun_helper2);

  const sun_helper3 = new THREE.PointLightHelper(sun_light3);
  //scene.add(sun_helper3);

  const sun_helper4 = new THREE.PointLightHelper(sun_light4);
  //scene.add(sun_helper4);
  

  
  //spot_light
  const spot_light = new THREE.SpotLight(color2, intensity);
  spot_light.position.set(0, 2, 0);
  spot_light.target.position.set(0, 0, 0);

  scene.add(spot_light);
  scene.add(spot_light.target);



  //spot_light2
  const spot_light2 = new THREE.SpotLight(color3, intensity);
  spot_light2.position.set(0, 2, 0);
  spot_light2.target.position.set(0, 0, 0);

  scene.add(spot_light2);
  scene.add(spot_light2.target);


  
  //frame loader
  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  //grass
  const gltfLoader = new GLTFLoader();
    gltfLoader.load('./grass/scene.gltf', (gltf) => {
      const root = gltf.scene;
      root.scale.set(0.01,0.005,0.01);
      scene.add(root);

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();
    });

  //house
  const house_gltfLoader = new GLTFLoader();
  house_gltfLoader.load('./house/scene.gltf', (gltf) => {
    const house = gltf.scene;
    house.scale.set(0.3,0.3,0.3);
    house.rotation.y = 3*Math.PI/2;
    house.position.x = -3;
    house.position.y = -0.1;
    house.position.z = -10;
    scene.add(house);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(house);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  //sun
  const sun_gltfLoader = new GLTFLoader();
  sun_gltfLoader.load('./sun/scene.gltf', (gltf) => {
    const sun = gltf.scene;
    sun.scale.set(0.2,0.2,0.2);
    //sun.rotation.y = 3*Math.PI/2;
    sun.position.x = -9;
    sun.position.y = 15;
    sun.position.z = -15;
    scene.add(sun);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(sun);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  const train = new THREE.Object3D();
  //train.position.x = -0.5;
  scene.add(train);

  //////////////////////////////////////////////////////////////////////
  
  const wmill = new WMill(scene);
  const car = new Car(scene);

  ///////////////////////////////////////////////////////
    
  //streetlight1
  const  street1_gltfLoader = new GLTFLoader();
  street1_gltfLoader.load('./lights2/scene.gltf', (gltf) => {
    const s_light1 = gltf.scene;
    s_light1.scale.set(0.12,0.18,0.12);
    //cat.rotation.y = Math.PI;
    s_light1.position.x = -2.5;
    s_light1.position.y = 0;
    s_light1.position.z = 2.5;
    s_light1.position
    scene.add(s_light1);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(s_light1);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  //streetlight2
  const  street2_gltfLoader = new GLTFLoader();
  street2_gltfLoader.load('./lights2/scene.gltf', (gltf) => {
    const s_light2 = gltf.scene;
    s_light2.scale.set(0.12,0.18,0.12);
    //cat.rotation.y = Math.PI;
    s_light2.position.x = 2.5;
    s_light2.position.y = 0;
    s_light2.position.z = 2.5;
    s_light2.position
    scene.add(s_light2);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(s_light2);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });
    

  //streetlight3
  const  street3_gltfLoader = new GLTFLoader();
  street3_gltfLoader.load('./lights2/scene.gltf', (gltf) => {
    const s_light3 = gltf.scene;
    s_light3.scale.set(0.12,0.18,0.12);
    //cat.rotation.y = Math.PI;
    s_light3.position.x = 2.5;
    s_light3.position.y = 0;
    s_light3.position.z = -2.5;
    s_light3.position
    scene.add(s_light3);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(s_light3);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });


  //streetlight4
  const  street4_gltfLoader = new GLTFLoader();
  street4_gltfLoader.load('./lights2/scene.gltf', (gltf) => {
    const s_light4 = gltf.scene;
    s_light4.scale.set(0.12,0.18,0.12);
    //cat.rotation.y = Math.PI;
    s_light4.position.x = -2.5;
    s_light4.position.y = 0;
    s_light4.position.z = -2.5;
    s_light4.position
    scene.add(s_light4);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(s_light4);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });


  
  //cat
  const cat_gltfLoader = new GLTFLoader();
  cat_gltfLoader.load('./cat/scene.gltf', (gltf) => {
    const cat = gltf.scene;
    cat.scale.set(0.002,0.002,0.002);
    //cat.rotation.y = Math.PI;
    cat.position.x = 0;
    cat.position.y = -0.7;
    cat.position.z = 0;
    cat.position
    train.add(cat);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(cat);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });
  
  const train2 = new THREE.Object3D();
  train2.position.z = 0.5;
  train.add(train2);
  //objects.push(train2);


  //dog1
  const  dog1_gltfLoader = new GLTFLoader();
  dog1_gltfLoader.load('./dog1/scene.gltf', (gltf) => {
    const dog1 = gltf.scene;
    dog1.scale.set(0.2,0.2,0.2);
    //cat.rotation.y = Math.PI;
    dog1.position.x = 0;
    dog1.position.y = -0.7;
    dog1.position.z = -1;
    dog1.position
    train2.add(dog1);
    //scene.add(dog1);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(dog1);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  

  const train3 = new THREE.Object3D();
  train3.position.z = 0.5;
  train2.add(train3);
  //objects.push(train3);


  //dog2
  const  dog2_gltfLoader = new GLTFLoader();
  dog2_gltfLoader.load('./dog2/scene.gltf', (gltf) => {
    const dog2 = gltf.scene;
    dog2.scale.set(0.008,0.008,0.008);
    //cat.rotation.y = Math.PI;
    dog2.position.x = 0;
    dog2.position.y = 0;
    dog2.position.z = -2.5;
    dog2.position
    train3.add(dog2);

    const box = new THREE.Box3().setFromObject(dog2);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  


  const objects = [];

  function getAnglevalues(angleInDegrees) {
    var angleInRadians = angleInDegrees * Math.PI / 180;
    var s = Math.sin(angleInRadians);
    var c = Math.cos(angleInRadians);
    return [c, s];
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);



  var avtarmesh;

  const  human_gltfLoader = new GLTFLoader();
  human_gltfLoader.load('./human/scene.gltf', (gltf) => {
    avtarmesh = gltf.scene;
    avtarmesh.scale.set(0.0015,0.0015,0.0015);
    //avtarmesh.rotation.y = Math.PI;
    avtarmesh.position.x = 0;
    avtarmesh.position.y = 0;
    avtarmesh.position.z = -2.5;
    //avtarmesh.position
    //scene.add(avtarmesh);
    //scene.add(dog2);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(avtarmesh);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });
  
  objects.push(avtarmesh);

  var attach = 0;
  var jumpUp = false;
  var jumpDown = false;
  var count;
  var acamera = 0;
  var dcamera = 0;
  var add =0;
  var x = 0;
  //var light_flag = 1;
  var cam_flag = 0;
  var l1_flag = 1;
  var l2_flag = 1;
  var l3_flag = 1;
  var l4_flag = 1;
  var spot_flag = 1;
  var spot_flag2 = 1;

  window.onload = () => {
    window.addEventListener('keydown', function(event) {
        switch (true) {
          case event.key == 'l':
            cam_flag = 0;
            break;
          case event.key == 'p':
            cam_flag = 1;

            break;
            case event.key == 'm':
              wmill.updateTexture();
              car.updateTexture();
              break;
            
              case event.key == 'j':
                scene.remove(headmesh2);
                const geometry2 = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
                setCylindricalUVs(geometry2);
  
  
                var head2 = new THREE.Mesh(geometry2, headmaterial);
  
                head2.position.x=-8;
                head2.position.y=2;
                scene.add(head2);
              break;
              case event.key == 'h':
                scene.remove(headmesh3);
                const geometry3 = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
                setSphericalUVs(geometry3);
                var head3 = new THREE.Mesh(geometry3, headmaterial);
                head3.position.x=-8;
                head3.position.y=3;
                scene.add(head3);
              break;

            case event.key == 'k':
              Tmode=(Tmode+1)%3;
              if(Tmode == 1){
              headmaterial.map=loader1.load('./OBJFiles/img2.jpg')
              }
              else if(Tmode == 0){
                headmaterial.map=loader1.load('./OBJFiles/img5.jpg')
              }
              else if(Tmode == 2){
                headmaterial.map=loader1.load('./OBJFiles/img3.jpg')
              }
              break;

              case event.key == 'b':
                scene.remove(head2);
                scene.remove(head3);
                const loader4 = new THREE.TextureLoader();


              ////////////////////////////////////////////////
              const headd2 = new THREE.Mesh(geometry1, headmaterial);
              headd2.scale.set(1, 1, 1);
              headd2.position.x=-8;
              headd2.position.y=2;
              scene.add(headd2);
              //////////////////////////////////////////////////
              

              const headd3 = new THREE.Mesh(geometry1, headmaterial);
              headd3.scale.set(1, 1, 1);
              headd3.position.x=-8;
              headd3.position.y=3;
              scene.add(headd3);
                break;
          case event.key == 'c':
            avtarmesh.position.x = 0;
            avtarmesh.position.y = 0.25;
            avtarmesh.position.z = -3;
            attach =0;
            scene.add(avtarmesh);
            break;
          case event.key == 'ArrowLeft':
            if(dcamera!=1)
            {
              if(attach == 0)
                avtarmesh.position.x-=0.1;
              else
              {
                console.log(x);
                x = x-0.1;
                var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    0,
                    toRadians((-x)),
                    0,
                    'XYZ'
                ));
                avtarmesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, avtarmesh.quaternion);
              }
            }

            else
            {
              dronecamera.position.x -= 0.1;
            }
            break;
          case event.key == 'ArrowRight':
            if(dcamera!=1)
            {
              if(attach == 0)
                avtarmesh.position.x+=0.1;
              else
              {
                x = x+0.1
                var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    0,
                    toRadians((x)),
                    0,
                    'XYZ'
                ));
                avtarmesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, avtarmesh.quaternion);
              }
            }
            else
            {
              dronecamera.position.x += 0.1;
            }
            break;
          case event.key == 'ArrowUp':
            if(dcamera!=1)
            {
              if(attach == 0)
                avtarmesh.position.z+=0.1;
            }
            else
            {
              dronecamera.position.y += 0.1;
            }
            break;
          case event.key == 'ArrowDown':
            if(dcamera!=1)
            {
              if(attach == 0)
                avtarmesh.position.z -=0.1;
            }
            else
            {
              dronecamera.position.y -= 0.1;
            }
            break;
          case event.key == 'r':
            scene.remove(avtarmesh);
            break;
          
          case event.key == 'a':
            scene.remove(avtarmesh);
            avtarmesh.position.x = 0;
            avtarmesh.position.y = 0;
            avtarmesh.position.z = -3;

            train3.add(avtarmesh);
            attach =1;
            break;
          
          case event.key == 'd':
            avtarmesh.position.x = 0;
            avtarmesh.position.y =0;
            train3.remove(avtarmesh);
            scene.add(avtarmesh);
            attach =0;
            break;
          
          case event.key == 'u':
            if(dcamera==1)
            {
              dronecamera.position.z+=0.1
            }
            else if(attach == 1)
            {
              jumpUp = true;
              count = 2;
              jumpDown = false;
            }
            else 
            {
              //avtarmesh.position.z += 0.1;
            }
            break;
          
          case event.key == 'o':
            if(dcamera==1)
            {
              dronecamera.position.z-=0.1
            }
            else if(attach == 1)
            {
              jumpUp = false;
              count = 2;
              jumpDown = true;
            }
            else
            {
              //avtarmesh.position.z -=0.1
            }
            break;
          
          case event.key == '1':
            if(cam_flag == 1){
              acamera = 0;
              dcamera = 0;  
            }
            else{
              if(l1_flag == 1){
                sun_light1.intensity = 0;
                //console.log("I am here");
                l1_flag = 0;
              }
              else{
                sun_light1.intensity = 1;
                l1_flag = 1;
              }
            }
            break;

          case event.key == '2':
            if(cam_flag == 1){
              acamera = 1;
              dcamera = 0;
            }
            else{
              if(l2_flag == 1){
                sun_light2.intensity = 0;
                //console.log("I am here");
                l2_flag = 0;
              }
              else{
                sun_light2.intensity = 1;
                l2_flag = 1;
              }
            }
            break;

          case event.key == '3':
            if(cam_flag == 1){
              acamera = 0;
              dcamera = 1;
            }
            else{
              if(l3_flag == 1){
                sun_light3.intensity = 0;
                //console.log("I am here");
                l3_flag = 0;
              }
              else{
                sun_light3.intensity = 1;
                l3_flag = 1;
              }
            }
            break;
          
          case event.key == '4':
            if(cam_flag == 1){
            console.log("No Function available");
            }
            else{
              if(l4_flag == 1){
                sun_light4.intensity = 0;
                //console.log("I am here");
                l4_flag = 0;
              }
              else{
                sun_light4.intensity = 1;
                l4_flag = 1;
              }
            }
            break;
            case event.key == 'm':

              break;

          case event.key == '5':
            if(cam_flag == 1){
              console.log("No Function available");
            }
            else{
              if(spot_flag == 1){
                spot_light.intensity = 0;
                dir_light.intensity = 0;
                //console.log("I am here");
                spot_flag = 0;
              }
              else{
                spot_light.intensity = 1;
                dir_light.intensity =1;
                spot_flag = 1;
              }
            }
            break;

            case event.key == '6':
              if(cam_flag == 1){
                console.log("No Function available");
              }
              else{
                if(spot_flag2 == 1){
                  spot_light2.intensity = 0;
                  //dir_light.intensity = 0;
                  //console.log("I am here");
                  spot_flag2 = 0;
                }
                else{
                  spot_light2.intensity = 1;
                  //dir_light.intensity =1;
                  spot_flag2 = 1;
                }
              }
              break;
          }
      });
    }

 

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  var theta = 0;
  var temp = 0;
  var isDragging = false;

  var previousMousePosition = {
    x: 0,
    y: 0
};

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
  function render(time) {


    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (jumpUp && attach && count > 0) 
    {
      if (temp < 7) 
      {
          avtarmesh.position.y += 0.05;
          temp+= 0.3;
      } 
      else 
      {
          jumpUp = false;
          jumpDown = true;
          temp = 0;
          count -= 1;
      }
  }
  if (jumpDown && attach && count > 0) 
  {
      if (temp < 7) 
      {
          avtarmesh.position.y -= 0.05;
          temp += 0.3;
      } 
      else 
      {
          jumpDown = false;
          jumpUp = true;
          temp = 0;
          count -= 1;
      }
  }

    theta = theta+0.7
    var angles = getAnglevalues(theta);

    train.position.x = 1*angles[0];
    train.position.z = 1*angles[1];
    train.position.y = 1;


    if(angles[1]<0)
    {
    var deltaRotationQuaternion = new THREE.Quaternion()
    .setFromEuler(new THREE.Euler(
        0,
        2*angles[1]*0.01,
        0,
        'XYZ'
    ));
    }
    else
    {
      var deltaRotationQuaternion = new THREE.Quaternion()
    .setFromEuler(new THREE.Euler(
        0,
        -2*angles[1]*0.01,
        0,
        'XYZ'
    ));
    }
    train.quaternion.multiplyQuaternions(deltaRotationQuaternion, train.quaternion);
    spot_light.target.position.set(train.position.x, train.position.y, train.position.z-1);


    spot_light2.position.x = train.position.x;
    spot_light2.position.y = train.position.y;
    spot_light2.position.z = train.position.z;
    //scene.add(spot_light2);

    if(acamera==1 && attach ==1)
    {
      var k = theta +0.2;
      var angle = getAnglevalues(k);
      avtarcamera.position.x = 1*angle[0];
      avtarcamera.position.z = 1*angle[1];
      avtarcamera.position.y = 2;
      avtarcamera.lookAt(new THREE.Vector3(1* (angle[0]),0,1* (angle[0])));
      avtarcamera.up = new THREE.Vector3(0, 1, 0);
      avtarcamera.updateProjectionMatrix();
      renderer.render(scene,avtarcamera);
    }

    else if(acamera==1)
    {
      avtarcamera.position.x = avtarmesh.position.x;
      avtarcamera.position.y = avtarmesh.position.y+3.5;
      avtarcamera.position.z = avtarmesh.position.z;
      avtarcamera.lookAt(new THREE.Vector3(0, 0, 0));
      avtarcamera.updateProjectionMatrix();
      renderer.render(scene,avtarcamera);
    }
    else if(dcamera == 1)
    {
      dronecamera.lookAt(new THREE.Vector3(dronecamera.position.x, dronecamera.position.y, 0));
      renderer.render(scene, dronecamera);
    }
    else
    { 
      renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();