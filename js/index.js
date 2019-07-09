/* three.js set up */
'use strict';
//earthmap1k
let scene,
    camera,
    renderer,
    controls;

let particles,
    sphere,
    item,
    planet;
    
let geohorizon,timeline,Events,stack,Engadget,google;
let width = window.innerWidth,
    height = window.innerHeight;
/* stars colors */
const colors = [0xffffff, 0xfff7cc, 0xfff7cc];
var items = [];
var names;
var context1,canvas1,texture1,sprite1;
var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once


function hideLoader() {
    $('#loading_css').hide();
}
$(window).ready(hideLoader);
init();
    
$(document).ready(function(){
	if(init() == true){
	    animate();
	}
})


function init() {

    var container = $("#container3d");

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
  container.append(renderer.domElement);


  controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.minDistance = 100;
controls.maxDistance = 500;


var x,y;


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
  drawsphere(container.parent());

  document.getElementById('world').appendChild(renderer.domElement);


      //
  window.addEventListener('resize', onResize);
//   animate();
return true;
}

function onDocumentMouseDown(event) {

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
    var rot_speed = 0.003;
    var particle_speed = 0.001;
    
    particles.rotation.x += particle_speed;
    particles.rotation.y -= particle_speed;
    sphere.rotation.y += rot_speed;
    // sphere.rotation.x += rot_speed;
    // geohorizon.rotation.x += rot_speed;
    geohorizon.rotation.y += rot_speed;
    // Engadget.rotation.x += rot_speed;
    Engadget.rotation.y += rot_speed;
    // stack.rotation.x += rot_speed;
    stack.rotation.y += rot_speed;
    // timeline.rotation.x += rot_speed;
    timeline.rotation.y += rot_speed;
    // google.rotation.x += rot_speed;
    google.rotation.y += rot_speed;
    // Events.rotation.x += rot_speed;
    Events.rotation.y += rot_speed;
    for(var i = 0;i<=5;i++){
        items[i].rotation.y += rot_speed;
        // items[i].rotation.x += rot_speed;

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
function drawsphere(container) {
    
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
                    var message = ["About","Sponsors","Events","Accomodation","Workshops","Gallery"];
                    var shapes = [];
					var geom = [];

                    for(var j=0;j<=5;j++){
                        shapes.push(font.generateShapes( message[j], 5 ));
                        geom.push(new THREE.ShapeBufferGeometry( shapes[j]));
                        geom[j].computeBoundingBox();
                  
                    }
            
    

  // var rotate_speed = {0.4,0.3,0};
  sphere = new THREE.Group();
//   sphere.rotation.set(0.4,0.3,0);
  scene.add(sphere);
  var radius = 100;
  for(var i = 0;i<=5;i++){
      var item_name;
      // xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      // make shape ( N.B. edge view not visible )

        item = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2.5), new THREE.MeshBasicMaterial({wireframe: false}));
        
    var item_position = radius + 5.0;
    switch (i) {
        case 0:
            item.userData = {
                // URL: "http://google.com"
               URL: "about.html"
            };
            item.geometry.translate(0, 0, item_position);
            item.name = "Geohorizon";
            geom[0].translate( -25, 8, item_position );
            geohorizon = new THREE.Mesh( geom[i], matLite );
            geohorizon.userData = item.userData;
            scene.add( geohorizon );        
            break;
        case 1:
            item.userData = {
                URL: "sponsors.html"
            };
            item.geometry.translate(0, item_position, 0);
            item.name = "sponsors";
            geom[1].translate( -10,item_position+7,0 );
            timeline = new THREE.Mesh( geom[i], matLite );
            timeline.userData = item.userData;
            scene.add( timeline );
            break;
        case 2:
            item.userData = {
                URL: "events.html"
            };
            item.geometry.translate(item_position,0,0);
            item.name = "Events";
            geom[2].translate(item_position,7, 0  );
            Events = new THREE.Mesh( geom[i], matLite );
            Events.userData = item.userData;
            scene.add(Events);
            break;
        case 3:
            item.userData = {
                URL: "accomodation.html"
            };
            item.geometry.translate(0,-item_position,0);
            item.name = "Accomodation";
            // geom[3].rotation(0,0,0.5);
            geom[3].translate(-10,-item_position-10,0  );

            Engadget = new THREE.Mesh( geom[i], matLite );
            // Engadget.rotation.set(new THREE.Vector3(0,0,0));
            // Engadget.rotation.z = Math.PI/2;
            Engadget.userData = item.userData;
            scene.add(Engadget);
            break;
        case 4:
            item.userData = {
                URL: "workshop.html"
            };
            item.geometry.translate(-item_position,0,0);
            item.name = "Workshops";
            geom[4].translate(-item_position-30,10, 0  );
            stack = new THREE.Mesh( geom[i], matLite );
            stack.userData = item.userData;
            scene.add(stack);
            break;
        case 5:
            item.userData = {
                URL: "gallery.html"
            };
            item.geometry.translate(0, 0,-item_position);			
            item.name = "Gallery";
            geom[5].translate(-25, 8 ,-item_position );
            google = new THREE.Mesh( geom[i], matLite );
            google.userData = item.userData;
            scene.add(google);
            break;
    }
    scene.add(item);
    items.push(item);
    names = [geohorizon,timeline,Events,Engadget,stack,google];

  }
// var svg_loader = new THREE.SVGLoader();
// svg_loader.load('world.svg');
  const planetGeometry = new THREE.IcosahedronGeometry(radius,5);

  var planetMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff,wireframe:true,wireframeLinejoin:"miter",wireframeLinewidth:"0.1" } );
  THREE.ImageUtils.crossOrigin = '';


    var img = 'https://vignette.wikia.nocookie.net/marvelcrossroads/images/7/71/Earth-map.jpg/revision/latest?cb=20180513012905';
    
    // planetMaterial.map    = THREE.SVGLoader('world.svg');

  planetMaterial.map    = THREE.ImageUtils.loadTexture(img);
//   planetMaterial.map    = THREE.TextureLoader(img);

  planet = new THREE.Mesh(planetGeometry, planetMaterial);
  /* sphere shadow */
  planet.castShadow = true;
  planet.receiveShadow = true;
  planet.position.set(0,0, 0);
  sphere.add(planet);
 
//   container.on("mousedown", onMouseDown);
//   container.on("mouseup", onMouseUp);

  document.addEventListener('click', onDocumentMouseDown,false);
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//   $(document).on("mousemove", onMouseMove);

  document.addEventListener('touchstart',onDocumentTouchStart,false);
//   document.addEventListener('touchmove',onDocumentTouchMove,false);

});

}
