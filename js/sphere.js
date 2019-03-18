var _slicedToArray = function() {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    return function(arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
}();
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var RADIUS = 1000;
var SIZE = RADIUS * 0.04;


var entries = [{
        color: 0xcc8b3a,
        height: 1
    },
    {
        color: 0x563071,
        height: 2
    },
    {
        color: 0x3c4b6e,
        height: 4
    },
    {
        color: 0x8f221f,
        height: 8
    }
];



var rand = function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


    Sphere = function() {
        function Sphere() {
            var _this = this;
            _classCallCheck(this, Sphere);
            // this.
            // bindEvents = function() {
            //     _this.$toggleButton.addEventListener('click', _this.onClickToggle);
            // };
            this.hidePoints = function(points) {
                points.forEach(function(point) {
                    TweenMax.to(point.scale, 1, {
                        z: 1
                    });

                    TweenMax.to(point.material, 1, {
                        opacity: 0
                    });

                });
            };
            this.addLocals = function(latlng) {

                var total = latlng.length;
                var totalPoints = _this.points.length;

                var points = _this.points.slice(0, total);


                /*
         ANIMATE ITEMS AROUNDS THE SPHERE
         WAAAA!?
       */
                _this.local = points.map(function(point, index) {
                    var _latLngCords$index =
                        _this.latLngCords[index],
                        x = _latLngCords$index.x,
                        y = _latLngCords$index.y,
                        z = _latLngCords$index.z;

                    TweenMax.to(point.position, 5.5, {
                        x: x,
                        y: y,
                        z: z,
                        onUpdate: function onUpdate() {
                            point.lookAt(_this.center);
                        }
                    });


                    TweenMax.to(point.scale, 5.5, {
                        x: SIZE * 0.1,
                        y: SIZE * 0.1,
                        z: 10,
                        onUpdate: function onUpdate() {
                            point.lookAt(_this.center);
                        }
                    });

                });
                var _latLngCords$ =
                    _this.latLngCords[0],
                    x = _latLngCords$.x,
                    y = _latLngCords$.y,
                    z = _latLngCords$.z;
                _this.moveCamera({
                    x: x,
                    y: y,
                    z: z
                });
            };
            this.

            //
            // onClickToggle = function(e) {
            //     _this.addLocals(latlng);
            //     _this.shouldFetch = false;
            // };
            // this.

            moveCamera = function(_ref4) {
                var x = _ref4.x,
                    y = _ref4.y,
                    z = _ref4.z;
                var _camera$position =
                    _this.camera.position,
                    cx = _camera$position.x,
                    cy = _camera$position.y,
                    cz = _camera$position.z;
                var start = new THREE.Vector3(cx, cy, cz);

                // move camera to the target
                var point = {
                    x: x,
                    y: y,
                    z: z
                };

                var camDistance = _this.camera.position.length();
                _this.camera.position.
                copy(new THREE.Vector3(point.x, point.y, point.z)).
                normalize().
                multiplyScalar(camDistance);

                // save the camera position
                var _camera$position2 = _this.camera.position,
                    a = _camera$position2.x,
                    b = _camera$position2.y,
                    c = _camera$position2.z;

                // invert back to original position
                _this.camera.position.
                copy(start).
                normalize().
                multiplyScalar(camDistance);

                // animate from start to end

                var tl = new TimelineMax();

                var zoom = {
                    value: _this.camera.zoom
                };


                tl.
                to(_this.camera.position, 8, {
                    x: a,
                    y: b,
                    z: c,
                    onUpdate: function onUpdate() {
                        _this.controls.update();
                    }
                }).

                to(
                    zoom,
                    3, {
                        value: 5,
                        onUpdate: function onUpdate() {
                            _this.camera.zoom = zoom.value;
                            _this.camera.updateProjectionMatrix();
                            _this.controls.update();
                        }
                    },

                    '-=2.5');

            };
            this.

            setupLights = function() {
                var pointLight = new THREE.PointLight(0xffffff, 5, 60);
                pointLight.position.set(50, 50, 76);
                _this.lightHolder = new THREE.Group();
                _this.lightHolder.add(pointLight);
                _this.scene.add(_this.lightHolder);

                _this.light = new THREE.SpotLight(0xffffff);

                _this.light.castShadow = true;

                _this.light.shadow.mapSize.width = 50;
                _this.light.shadow.mapSize.height = 50;

                _this.light.shadow.camera.near = 500;
                _this.light.shadow.camera.far = 3000;
                _this.light.shadow.camera.fov = 75;
                _this.scene.add(_this.light);
            };
            this.

            prev = null;
            this.
            outline = null;
            this.
            shouldRotate = true;
            this.


            getDistribution = function(n) {
                var rnd = 1;
                var offset = 2 / n;
                var increment = Math.PI * (3 - Math.sqrt(5));

                return Array(n).
                fill(null).
                map(function(_, i) {
                    var y = i * offset - 1 + offset / 2;
                    var r = Math.sqrt(1 - Math.pow(y, 2));
                    var phi = (i + rnd) % n * increment;

                    return {
                        x: Math.cos(phi) * r,
                        z: Math.sin(phi) * r,
                        y: y
                    };

                });
            };
            this.

            renderDataPoints = function() {
                _this.points = _this.getDistribution(200).map(function(_ref5, index) {
                    var x = _ref5.x,
                        y = _ref5.y,
                        z = _ref5.z;
                    var _entries$rand =
                        entries[rand(0, 3)],
                        color = _entries$rand.color,
                        height = _entries$rand.height;
                    var material = new THREE.MeshPhongMaterial({
                        color: color,
                        opacity: 1,
                        transparent: true,
                        emissive: color,
                        emissiveIntensity: 0
                    });


                    var cube = new THREE.Mesh(_this.cubeGeometry, material);

                    cube.castShadow = true;
                    cube.receiveShadow = true;

                    cube.position.set(x * RADIUS, y * RADIUS, z * RADIUS);

                    cube.material.color.setHex(color);
                    cube.lookAt(_this.center);
                    cube.scale.y = SIZE;
                    cube.scale.x = SIZE;
                    cube.scale.z += height * rand(0.5, 8);

                    cube.__animating = false;
                    cube.__id = index;
                    cube.__update = height;
                    cube.__default = 1;

                    _this.group.add(cube);

                    return cube;
                });
            };
            this.

            renderSphere = function() {
                var material = new THREE.MeshBasicMaterial({
                    color: 0x06131b,
                    vertexColors: THREE.FaceColors
                });

                var geometry = new THREE.SphereGeometry(RADIUS, 32, 32);
                var sphere = new THREE.Mesh(geometry, material);

                _this.group.add(sphere);
            };
            this.


            shouldFetch = true;
            this.

            render = function(timestamp) {
                if (_this.shouldRotate) {
                    if (!_this.start) _this.start = timestamp;

                    var progress = timestamp - _this.start;
                    _this.group.rotation.y = progress * 0.00005;
                    _this.group.rotation.z = progress * 0.000025;
                }

                _this.lightHolder.quaternion.copy(_this.camera.quaternion);
                _this.light.position.copy(_this.camera.position);

                //this.controls.update()
                _this.renderer.render(_this.scene, _this.camera);
                requestAnimationFrame(_this.render);
            };
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, RADIUS * 5);
            this.mouse = new THREE.Vector2();
            this.camera.position.z = RADIUS * 2.5;
            this.camera.rotation.z *= 0.2;
            this.group = new THREE.Group();
            this.clock = new THREE.Clock();
            this.renderer = new THREE.WebGLRenderer({
                antialiasing: true
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio * 1.5);
            this.raycaster = new THREE.Raycaster();
            document.body.appendChild(this.renderer.domElement);
            this.cubeGeometry = new THREE.BoxGeometry(1, 1, 10);
            this.center = new THREE.Vector3(0, 0, 0);
            this.$toggleButton = document.getElementById('toggle');
        }
        _createClass(Sphere, [{
            key: "init",
            value: function init() {
                this.renderSphere();
                this.renderDataPoints();
                // this.bindEvents();
                this.setupLights();
                this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
                this.controls.update();
                this.scene.add(this.group);
                return this;
            }
        }]);
        return Sphere;
    }();


new Sphere().init().render();
//
// let scene,
//     camera,
//     renderer,
//     controls;
//
//
//
// let particles,
//     sphere;
//
//
//     let width = window.innerWidth,
//         height = window.innerHeight;
//     /* stars colors */
//     const colors = [0xffffff, 0xfff7cc, 0xfff7cc];
//
//     init();
//     animate();
//
//     function init() {
//       scene = new THREE.Scene();
//       /* camera positioning controls */
//       camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//       camera.lookAt(scene.position);
//       camera.position.z = 200;
//
//       renderer = new THREE.WebGLRenderer();
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(width, height);
//       /* background color */
//       renderer.setClearColor(0x000000);
//       renderer.shadowMap.enabled = true;
//
//       controls = new THREE.OrbitControls(camera, renderer.domElement);
//
//       const ambientLight = new THREE.AmbientLight();
//       scene.add(ambientLight);
//       /* light controls (local sun) */
//       const light = new THREE.DirectionalLight();
//       light.position.set(200, 100, 200);
//       light.castShadow = false;
//       light.shadow.camera.left = -100;
//       light.shadow.camera.right = 100;
//       light.shadow.camera.top = 100;
//       light.shadow.camera.bottom = -100;
//       scene.add(light);
//
//       drawParticles();
//       // drawsphere();
//
//       document.getElementById('world').appendChild(renderer.domElement);
//
//       window.addEventListener('resize', onResize);
//     }
//     /* responsive js */
//     function onResize() {
//       width = window.innerWidth;
//       height = window.innerHeight;
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     }
//
//     function animate() {
//       requestAnimationFrame(animate);
//
//       render();
//     }
//
//
// function render() {
//   particles.rotation.x += 0.001;
//   particles.rotation.y -= 0.001;
//   sphere.rotation.y += 0.003;
//   renderer.render(scene, camera);
// }
//
//
// function drawParticles() {
//   particles = new THREE.Group();
//   scene.add(particles);
//   const geometry = new THREE.TetrahedronGeometry(1, 1);
//   /* stars controls */
//   for (let i = 0; i < 800; i ++) {
//     const material = new THREE.MeshPhongMaterial({
//       color: colors[Math.floor(Math.random() * colors.length)],
//       shading: THREE.FlatShading
//     });
//     /* stars positioning */
//     const mesh = new THREE.Mesh(geometry, material);
//     mesh.position.set((Math.random() - 0.5) * 1500,
//                       (Math.random() - 0.5) * 1500,
//                       (Math.random() - 0.5) * 1500);
//     mesh.updateMatrix();
//     mesh.matrixAutoUpdate = false;
//     particles.add(mesh);
//   }
// }
