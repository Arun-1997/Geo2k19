/* three.js set up */
'use strict';
//earthmap1k
let scene,
    camera,
    renderer,
    controls;

let particles,
    sphere,
    item;

let width = window.innerWidth,
    height = window.innerHeight;
/* stars colors */
const colors = [0xffffff, 0xfff7cc, 0xfff7cc];
var items = []
var context1,canvas1,texture1,sprite1;
var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once

init();
animate();
// var domEvents   = new THREEx.DomEvents(camera, renderer.domElement)

function init() {
  scene = new THREE.Scene();
  /* camera positioning controls */
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.lookAt(scene.position);
  camera.position.z = 200;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  /* background color */
  renderer.setClearColor(0x000000);
  renderer.shadowMap.enabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.minDistance = 100;
controls.maxDistance = 500;
// canvas1 = document.createElement('canvas');

// context1 = canvas1.getContext('2d');
// context1.font = "Bold 20px Arial";
// context1.fillStyle = "rgba(255,0,0,0.95)";
// canvas contents will be used for a texture
// texture1 = new THREE.Texture(canvas1)
// texture1.needsUpdate = true;

var spriteMaterial = new THREE.SpriteMaterial( { map: texture1} );
 // useScreenCoordinates: true
// , alignment: THREE.SpriteAlignment.topLeft

// sprite1 = new THREE.Sprite( spriteMaterial );
// sprite1.scale.set(200,100,1.0);
var x,y;
// function mouse_coord(event){
//   x = event.clientX;
//   y = event.clientY;
//   console.log("Mouse COordinates : ",x)
//   sprite1.position.set(x, y, 0 );
//   scene.add( sprite1 );
//
// }
// scene.add( sprite1 );
// sprite1.position.set( 50, 50, 0 );


  const ambientLight = new THREE.AmbientLight();
  scene.add(ambientLight);
  /* light controls (local sun) */
  const light = new THREE.DirectionalLight();
  light.position.set(200, 100, 200);
  light.castShadow = false;
  light.shadow.camera.left = -100;
  light.shadow.camera.right = 100;
  light.shadow.camera.top = 100;
  light.shadow.camera.bottom = -100;
  scene.add(light);

  drawParticles();
  drawsphere();

  document.getElementById('world').appendChild(renderer.domElement);
  // document.addEventListener( 'mousemove', mouse_coord, false );


      //
  window.addEventListener('resize', onResize);
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 -
        1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    // var projector = new THREE.Projector();
    // projector.unprojectVector(vector, camera);
    vector.unproject(camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position)
        .normalize());
    var intersects = raycaster.intersectObjects(items);
    if (intersects.length > 0) {
        window.open(intersects[0].object.userData.URL);
    }

}

function onDocumentTouchStart(event) {
    event.preventDefault();
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 -
        1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    // var projector = new THREE.Projector();
    // projector.unprojectVector(vector, camera);
    vector.unproject(camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position)
        .normalize());
    var intersects = raycaster.intersectObjects(items);
    if (intersects.length > 0) {
        window.open(intersects[0].object.userData.URL);
    }

}

function onDocumentTouchMove(event) {
    // sprite1.position.set( event.clientX, event.clientY - 20, 0 );
    // console.log("Window width : "+window.innerwidth+"\nWindow Height : "+window.innerHeight);
  
    var mouse = new THREE.Vector3();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // console.log("Mouse X : ",mouse.x);
    // console.log("Mouse Y : ",mouse.y);
    // sprite1.position.set(mouse.x,mouse.y,0);
    // console.log(sprite1.position)

    // mouse.x = event.clientX ;
    // mouse.y = - event.clientY;

    // var raycaster = new THREE.Raycaster();
    // raycaster.setFromCamera( mouse, camera );
    // var intersects = raycaster.intersectObjects(items);

  //   var projector = new THREE.Projector();
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    // projector.unprojectVector( vector, camera );
    vector.unproject( camera );

    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( scene.children );




    if(intersects.length >0) {
        $('html,body').css('cursor', 'pointer');
        // var info = document.createElement('div');

        // $('html,body').css('color', 'black');
        // if the closest object intersected is not the currently stored intersection object
        if ( intersects[ 0 ].object != INTERSECTED )
        {
            // restore previous intersection object (if it exists) to its original color
          if ( INTERSECTED )
            INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
          // store reference to closest object as current intersection object
          INTERSECTED = intersects[ 0 ].object;

          // store color of closest object (for later restoration)
          INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
          // set a new color for closest object
          INTERSECTED.material.color.setHex( 0xffff00 );

          // update text, if it has a "name" field.
        //   if ( intersects[ 0 ].object.name )
        //   {
        //       context1.clearRect(0,0,800,800);
        //     var message = intersects[ 0 ].object.name;
        //     var metrics = context1.measureText(message);
        //     var width = metrics.width;
        //     context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
        //     context1.fillRect( 0,0, width+8,20+8);
        //     context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
        //     context1.fillRect( 2,2, width+4,20+4 );
        //     context1.fillStyle = "rgba(2,0,0,1)"; // text color
        //     context1.fillText( message, 4,20 );
        //     texture1.needsUpdate = true;
        //   }
        //   else
        //   {
        //     context1.clearRect(0,0,300,150);
        //     texture1.needsUpdate = true;
        //   }
        }
    } else {
        $('html,body').css('cursor', 'default');
        if ( INTERSECTED )
          INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        // remove previous intersection object reference
        //     by setting current intersection object to "nothing"
        INTERSECTED = null;
        context1.clearRect(0,0,300,300);
        texture1.needsUpdate = true;
    }


}

function onDocumentMouseMove(event) {
      // sprite1.position.set( event.clientX, event.clientY - 20, 0 );
      // console.log("Window width : "+window.innerwidth+"\nWindow Height : "+window.innerHeight);
    
      var mouse = new THREE.Vector3();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      // console.log("Mouse X : ",mouse.x);
      // console.log("Mouse Y : ",mouse.y);
    //   sprite1.position.set(mouse.x,mouse.y,0);
      // console.log(sprite1.position)

      // mouse.x = event.clientX ;
      // mouse.y = - event.clientY;

      // var raycaster = new THREE.Raycaster();
      // raycaster.setFromCamera( mouse, camera );
      // var intersects = raycaster.intersectObjects(items);

    //   var projector = new THREE.Projector();
      var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
      // projector.unprojectVector( vector, camera );
      vector.unproject( camera );

      var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

      // create an array containing all objects in the scene with which the ray intersects
      var intersects = ray.intersectObjects( scene.children );




      if(intersects.length >0) {
          $('html,body').css('cursor', 'pointer');
          // var info = document.createElement('div');

          // $('html,body').css('color', 'black');
          // if the closest object intersected is not the currently stored intersection object
          if ( intersects[ 0 ].object != INTERSECTED )
          {
              // restore previous intersection object (if it exists) to its original color
            if ( INTERSECTED )
              INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
            // store reference to closest object as current intersection object
            INTERSECTED = intersects[ 0 ].object;

            // store color of closest object (for later restoration)
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            // set a new color for closest object
            INTERSECTED.material.color.setHex( 0xffff00 );

            // update text, if it has a "name" field.
            // if ( intersects[ 0 ].object.name )
            // {
            //     context1.clearRect(0,0,800,800);
            //   var message = intersects[ 0 ].object.name;
            //   var metrics = context1.measureText(message);
            //   var width = metrics.width;
            //   context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
            //   context1.fillRect( 0,0, width+8,20+8);
            //   context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
            //   context1.fillRect( 2,2, width+4,20+4 );
            //   context1.fillStyle = "rgba(2,0,0,1)"; // text color
            //   context1.fillText( message, 4,20 );
            //   texture1.needsUpdate = true;
            // }
            // else
            // {
            //   context1.clearRect(0,0,300,150);
            //   texture1.needsUpdate = true;
            // }
          }
      } else {
          $('html,body').css('cursor', 'default');
          if ( INTERSECTED )
            INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
          // remove previous intersection object reference
          //     by setting current intersection object to "nothing"
          INTERSECTED = null;
        //   context1.clearRect(0,0,300,300);
        //   texture1.needsUpdate = true;
      }


  }

/* responsive js */
function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);

  render();
}
/* stars rotation */
function render() {
  particles.rotation.x += 0.001;
  particles.rotation.y -= 0.001;
  sphere.rotation.y += 0.003;
  sphere.rotation.x += 0.003;
  for(var i = 0;i<=5;i++){
    items[i].rotation.y += 0.003;
    items[i].rotation.x += 0.003;

  }

  renderer.render(scene, camera);
}
/* stars set up */
function drawParticles() {
  particles = new THREE.Group();
  scene.add(particles);
  const geometry = new THREE.TetrahedronGeometry(1, 1);
  /* stars controls */
  for (let i = 0; i < 800; i ++) {
    const material = new THREE.MeshPhongMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      shading: THREE.FlatShading
    });
    /* stars positioning */
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 1500,
                      (Math.random() - 0.5) * 1500,
                      (Math.random() - 0.5) * 1500);
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    particles.add(mesh);
  }
}
/* sphere controls */
function drawsphere() {
  // var rotate_speed = {0.4,0.3,0};
  sphere = new THREE.Group();
  sphere.rotation.set(0.4,0.3,0);
  scene.add(sphere);
  var radius = 100;
  for(var i = 0;i<=5;i++){
    item = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2.5), new THREE.MeshBasicMaterial({wireframe: true}));
// {color: Math.random() * 0xffffff,
    // items[i].position.x = 0;
    // items[i].position.y = i;
    // items[i].position.z = 0;

    // item.geometry.translate(i*7, i*6, 3.0 + radius);

    // item.rotation.set((i + 0.4),(i+ 0.3), i*0);

    console.log(item);
    var item_position = radius + 5.0;
    switch (i) {
        case 0:
            item.userData = {
                // URL: "http://google.com"
               URL: "index(gh).html"
            };
            item.geometry.translate(0, 0, item_position);
            item.name = "Geohorizon";
            break;
        case 1:
            item.userData = {
                URL: "timeline/index.html"
            };
            item.geometry.translate(0, item_position, 0);
            item.name = "Timeline";
            break;
        case 2:
            item.userData = {
                URL: "http://msn.com"
            };
            item.geometry.translate(item_position,0,0);
            item.name = "MSN";
            break;
        case 3:
            item.userData = {
                URL: "http://engadget.com"
            };
            item.geometry.translate(0, 0,-item_position);
            item.name = "Engadget";
            break;
        case 4:
            item.userData = {
                URL: "http://stackoverflow.com"
            };
            item.geometry.translate(-item_position,0,0);
            item.name = "Stack Overflow";
            break;
        case 5:
            item.userData = {
                URL: "https://google.com"
            };
            item.geometry.translate(0,-item_position,0);
            item.name = "Google";
            break;
    }
    scene.add(item);
    items.push(item);


  }
//   item.on('click', onDocumentMouseDown);


// var projector = new THREE.Projector();

  const planetGeometry = new THREE.IcosahedronGeometry(radius,5);
/*
  // var geometry = new THREE.SphereBufferGeometry( 100, 100, 100 );

  const wireframe = new THREE.WireframeGeometry( planetGeometry );

  const line = new THREE.LineSegments( wireframe);
  line.material.depthTest = true;
  line.material.opacity = 0.5;
  line.material.transparent = true;

  scene.add( line );
  */
  // const planetMaterial = new THREE.MeshPhongMaterial();
  var planetMaterial = new THREE.MeshPhongMaterial( { color: 0xf243424,wireframe:true,wireframeLinejoin:"miter"} );
  // var planetMaterial = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 24), new THREE.MeshBasicMaterial({color: "gray", wireframe: true}));
  THREE.ImageUtils.crossOrigin = '';

  // planetMaterial.map    = THREE.ImageUtils.loadTexture('http://s3-us-west-2.amazonaws.com/s.cdpn.io/1206469/earthmg.jpg');
  // planetMaterial.map    = THREE.ImageUtils.loadTexture('C:/Users//Raja M/Desktop/gh - web/GeoHorizonh-2k18-master/img/earth.jpg');

// planetMaterial.map    = THREE.ImageUtils.loadTexture('https://news.nationalgeographic.com/content/dam/news/2016/09/09/aqua_monitor_map/01_aqua_monitor_map.ngsversion.1473363006509.adapt.1900.1.jpg');
    // var img = new Image();
    var img = 'https://vignette.wikia.nocookie.net/marvelcrossroads/images/7/71/Earth-map.jpg/revision/latest?cb=20180513012905';

    // img.onload = function(){
    //   var canvas = document.createElement('canvas');
    //     var ctx = canvas.getContext('2d');
    //     canvas.width=256
    //     canvas.height=128
    //     ctx.drawImage(img, 0, 0, 256, 128);
    //     document.body.appendChild(canvas);
    // };

  planetMaterial.map    = THREE.ImageUtils.loadTexture(img);

  // planetMaterial.map    = THREE.ImageUtils.loadTexture('map.svg');
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  /* sphere shadow */
  planet.castShadow = true;
  planet.receiveShadow = true;
  planet.position.set(0,0, 0);
  sphere.add(planet);

//   renderer.domElement.addEventListener("touchstart", onDocumentMouseDown, true);
//   item.addEventListener('click', onDocumentMouseDown, false);
  document.addEventListener('click', onDocumentMouseDown,false);
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//   document.addEventListener('click',onDocumentTouchStart,false);
//   document.addEventListener('touchmove',onDocumentTouchMove,false);
console.log("testing");
}
