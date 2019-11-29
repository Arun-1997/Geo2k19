
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
/* stars colors */
var colors = [0xffffff, 0xfff7cc, 0xfff7cc];
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var sphere_geometry = new THREE.IcosahedronGeometry(100,5);
var geohorizon,timeline,Events,stack,Engadget,google;

var item1,item2,item3,item4,item5,item6;
var sphere = new THREE.Group();
// sphere.rotation.set(0.4,0.3,0);
var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once

var img = 'https://vignette.wikia.nocookie.net/marvelcrossroads/images/7/71/Earth-map.jpg/revision/latest?cb=20180513012905';

var planetMaterial = new THREE.MeshPhongMaterial( { 
            color: 0x3b041f,
            wireframe:true,
            wireframeLinejoin:"miter",
            wireframeLinewidth:"0.1" } );
THREE.ImageUtils.crossOrigin = '';

// planetMaterial.map    = THREE.ImageUtils.loadTexture(img);
planetMaterial.map    = THREE.TextureLoader(img);
var radius = 100;
const planetGeometry = new THREE.IcosahedronGeometry(radius,3);

planet = new THREE.Mesh(planetGeometry, planetMaterial);
/* sphere shadow */
planet.castShadow = true;
planet.receiveShadow = true;
planet.position.set(0,0, 0);
// sphere.add(planet);


//Add sphere
// var planet = new THREE.Mesh( sphere_geometry, material );
// planet.castShadow = true;
// planet.receiveShadow = true;
// planet.position.set(0,0, 0);
sphere.add(planet)
scene.add( sphere );
// renderer.setClearColor(0x000000);
renderer.shadowMap.enabled = true;
camera.position.z = 200;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.minDistance = 100;
controls.maxDistance = 500;
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


function hideLoader() {
  $('#loading_css').hide();
}
$(window).ready(hideLoader);

//Add particles
// function AddParticles(){
    var particles = new THREE.Group();


    const geometry = new THREE.TetrahedronGeometry(1, 1);
    /* stars controls */
    for (let i = 0; i < 800; i ++) {
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        flatShading : THREE.FlatShading
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
    scene.add(particles);
// } 




// AddParticles()
var message = ["About","Sponsors","Events","Accomodation","Workshops","Gallery"];
var shapes = [];
var geom = [];

var loader = new THREE.FontLoader();
loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
  var xMid;
  var color = 0xffffff;
  var matDark = new THREE.LineBasicMaterial( {
    color: color,
    side: THREE.DoubleSide
  } );
  var matLite = new THREE.MeshBasicMaterial( {
    color: color,
    transparent: true,
    opacity:1,
    side: THREE.DoubleSide
  } );
  for(var j=0;j<=5;j++){
    shapes.push(font.generateShapes( message[j], 5 ));
    geom.push(new THREE.ShapeBufferGeometry( shapes[j]));
    geom[j].computeBoundingBox();

}



var item_position = radius + 5.0;

item1 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2.5), new THREE.MeshBasicMaterial({wireframe: false}));
item1.userData = {
  // URL: "http://google.com"
 URL: "about.html"
};
item1.geometry.translate(0,0,item_position);
geom[0].translate( -13, 8, item_position )
geohorizon = new THREE.Mesh( geom[0], matLite );
geohorizon.userData = item1.userData;
scene.add( geohorizon );      
scene.add(item1)

item2 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2.5), new THREE.MeshBasicMaterial({wireframe: false}));

item2.userData = {
  URL: "sponsors.html"
};
item2.geometry.translate(0,item_position,0);
geom[1].translate( -10,item_position+7,0 );
timeline = new THREE.Mesh( geom[1], matLite );
timeline.userData = item2.userData;
scene.add(timeline);
scene.add(item2)

item3 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2.5), new THREE.MeshBasicMaterial({wireframe: false}));
item3.userData = {
  URL: "events.html"
};
item3.geometry.translate(item_position,0,0);
geom[2].translate(item_position,7, 0  );
Events = new THREE.Mesh( geom[2], matLite );
Events.userData = item3.userData
scene.add(Events);
scene.add(item3)

item4 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2.5), new THREE.MeshBasicMaterial({wireframe: false}));
item4.userData = {
  URL: "gallery.html"
};
item4.geometry.translate(0,0,-item_position);
geom[3].translate(-10,-item_position-10,0  );

Engadget = new THREE.Mesh( geom[3], matLite );
Engadget.userData = item4.userData;
scene.add(Engadget);

scene.add(item4)

item5 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2.5), new THREE.MeshBasicMaterial({wireframe: false}));
item5.userData = {
  URL: "accomodation.html"
};
item5.geometry.translate(0,-item_position,0);
geom[4].translate(-item_position-30,10, 0  );
stack = new THREE.Mesh( geom[4], matLite );
stack.userData = item5.userData
scene.add(stack)
scene.add(item5)


item6 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2.5), new THREE.MeshBasicMaterial({wireframe: false}));
item6.userData = {
  URL: "workshop.html"
};
item6.geometry.translate(-item_position,0,0);
geom[5].translate(-25, 8 ,-item_position );
google = new THREE.Mesh( geom[5], matLite );

google.userData = item6.userData;
scene.add(google);

scene.add(item6)

animate();

})




function animate() {
    requestAnimationFrame( animate );
    var rot_speed = -0.003;
    sphere.rotation.y += rot_speed;
    item1.rotation.y += rot_speed;
    item2.rotation.y += rot_speed;
    item3.rotation.y += rot_speed;
    item4.rotation.y += rot_speed;
    item5.rotation.y += rot_speed;
    item6.rotation.y += rot_speed;

    geohorizon.rotation.y += rot_speed;
    timeline.rotation.y += rot_speed;
    Events.rotation.y += rot_speed;
    Engadget.rotation.y += rot_speed;
    stack.rotation.y += rot_speed;
    google.rotation.y += rot_speed;
    
    // sphere.rotation.y += 0.001;

    renderer.render( scene, camera );
    render()
}
function render(){
    var particle_speed = 0.001;
   
    particles.rotation.x += particle_speed;
    particles.rotation.y -= particle_speed;

}



function onDocumentMouseDown(event) {
  items = [item1, item2, item3, item4, item5, item6];
  names = [geohorizon,timeline,Events,Engadget,stack,google];
    event.preventDefault();
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 -
        1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector.unproject(camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position)
        .normalize());  
    var intersects = raycaster.intersectObjects(items);
    var intersect_name = raycaster.intersectObjects(names);
    if (intersects.length > 0) {
        window.open(intersects[0].object.userData.URL,"_self");
        // window.open(intersect_name[0].object.userData.URL)
    }
    if(intersect_name.length>0){
        window.open(intersect_name[0].object.userData.URL,"_self");
    }

}

function onDocumentTouchStart(event) {
    // event.preventDefault();
    items = [item1, item2, item3, item4, item5, item6];
    names = [geohorizon,timeline,Events,Engadget,stack,google];
    var vector = new THREE.Vector3((event.touches[0].clientX / window.innerWidth) * 2 -
        1, -(event.touches[0].clientY / window.innerHeight) * 2 + 1, 0.5);
    vector.unproject(camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position)
        .normalize());
    var intersects = raycaster.intersectObjects(items);
    var intersect_name = raycaster.intersectObjects(names);

    if (intersects.length > 0) {
        window.open(intersects[0].object.userData.URL,"_self");
    }
    if(intersect_name.length>0){
        window.open(intersect_name[0].object.userData.URL,"_self");
    }

}

function onDocumentTouchMove(event) {
  
    var mouse = new THREE.Vector3();
    mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    vector.unproject( camera );

    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( scene.children );




    if(intersects.length >0) {
        $('html,body').css('cursor', 'pointer');
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

function onMouseDown(event) {
    if (self.enabled && event.button === 2) {
        isRightMouseDown = true;
        event.preventDefault();
        event.stopPropagation();
    }
};

function onMouseUp(event) {
    if (self.enabled && event.button === 2) {
        isRightMouseDown = false;
    }
};


function onMouseMove(event) {
    self.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    self.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (!self.enabled || !isRightMouseDown) return;

    var movementX = event.originalEvent.movementX || event.originalEvent.mozMovementX || event.originalEvent.webkitMovementX || 0;
    var movementY = event.originalEvent.movementY || event.originalEvent.mozMovementY || event.originalEvent.webkitMovementY || 0;
    var rotation = calculateCameraRotation(-1 * movementX, -1 * movementY);


    self.setRotation(rotation.rx, rotation.ry);
    // updateNavPad();
};


function onDocumentMouseMove(event) {
    
      var mouse = new THREE.Vector3();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );

      vector.unproject( camera );

      var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

      // create an array containing all objects in the scene with which the ray intersects
      var intersects = ray.intersectObjects( scene.children );




      if(intersects.length >0) {
          $('html,body').css('cursor', 'pointer');
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

          }
      } else {
          $('html,body').css('cursor', 'default');
          if ( INTERSECTED )
            INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
          // remove previous intersection object reference
          //     by setting current intersection object to "nothing"
          INTERSECTED = null;
      }


  }



  document.addEventListener('click', onDocumentMouseDown,false);
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//   $(document).on("mousemove", onMouseMove);

  document.addEventListener('touchstart',onDocumentTouchStart,false);
