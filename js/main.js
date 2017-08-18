window.onload = function () {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 1000);

    var render = new THREE.WebGLRenderer({antialias: true});
    render.setSize(window.innerWidth, window.innerHeight);
    render.setClearColor( 0xFFFFFF );
    document.body.appendChild(render.domElement);

    camera.position.z = 280;

    var amColor = "#faffe3";
    var amLight = new THREE.AmbientLight(amColor);
    scene.add(amLight);

    var light = new THREE.DirectionalLight(0xfff7e8, 1);
    scene.add(light);

    var manager = new THREE.LoadingManager();
    var loader = new THREE.ImageLoader(manager);

    var textureBody = new THREE.Texture();
    loader.load('model/textures/male_casualsuit01_diffuse.png', function (image) {
        textureBody.image = image;
        textureBody.needsUpdate = true;
    });

    var textureTongue = new THREE.Texture();
    loader.load('model/textures/tongue01_diffuse.png', function (image) {
        textureTongue.image = image;
        textureTongue.needsUpdate = true;
    });




    var meshes = [];

    var objLoader = new THREE.OBJLoader();

    objLoader.load('model/Skin02.obj', function ( object ) {
        console.log(object);

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh){
                meshes.push(child);
            }
        });

        var male_generic = meshes[0];
        var short = meshes[1];
        var high_poly = meshes[2];
        var eyebrow = meshes[3];
        var eyelashes = meshes[4];
        var teeth_shape = meshes[5];
        var tongue = meshes[6];
        var male_casualsuit = meshes[7];

        console.log(meshes);
        male_generic.position.y = -10;
        short.position.y = -10;
        high_poly.position.y = -10;
        eyebrow.position.y = -10;
        eyelashes.position.y = -10;
        teeth_shape.position.y = -10;
        tongue.position.y = -10;
        male_casualsuit.position.y = -10;



        var bumpMapBody = new THREE.TextureLoader().load('model/textures/male_casualsuit01_normal.png');
        var bumpMapEyelashes = new THREE.TextureLoader().load('model/textures/eyelashes01.png');
        var bumpMapEyebrow = new THREE.TextureLoader().load('model/textures/eyebrow001.png');
        var bumpMapMale = new THREE.TextureLoader().load('model/textures/middleage_lightskinned_female_diffuse2.png');
        var bumpMapShort = new THREE.TextureLoader().load('model/textures/short02_diffuse.png');

        scene.add(male_generic);
        male_generic.material = new THREE.MeshPhongMaterial({
            map: bumpMapMale
        });


        scene.add(short);
        short.material = new THREE.MeshPhongMaterial({
            map: bumpMapShort,
            specular: 0xfff7e8,
            bumpScale: 1
        });

        scene.add(high_poly);


        scene.add(eyebrow);
        eyebrow.material = new THREE.MeshPhongMaterial({
            map: bumpMapEyebrow,
            specular: 0xfff7e8,
            bumpScale: 1
        });

        scene.add(eyelashes);
        eyelashes.material = new THREE.MeshPhongMaterial({
            map: bumpMapEyelashes,
            specular: 0xfff7e8,
            bumpScale: 1
        });

        scene.add(teeth_shape);


        scene.add(tongue);
        tongue.material = new THREE.MeshPhongMaterial({
            map: textureTongue
        });

        scene.add(male_casualsuit);
        male_casualsuit.material = new THREE.MeshPhongMaterial({
            map: textureBody,
            bumpMap: bumpMapBody,
            specular: 0xfff7e8,
            bumpScale: 1
        });

        // base.material = new THREE.MeshPhongMaterial({
        //     map: textureBody,
        //     bumpMap: bumpMapBody,
        //     specular: 0xfff7e8,
        //     bumpScale: 12
        // });


        // base.material = new THREE.MeshPhongMaterial({
        //     map: textureBody,
        //     bumpMap: bumpMapBody,
        //     specular: 0xfff7e8,
        //     bumpScale: 12
        // });

        // scene.add(base);
        // base.material = new THREE.MeshPhongMaterial({
        //     map: textureBody,
        //     bumpMap: bumpMapBody,
        //     specular: 0xfff7e8,
        //     bumpScale: 12
        // });
        //
        // //scene.add(poly);
        // // scene.add(casual);
        //
        // scene.add(casual);
        // casual.material = new THREE.MeshPhongMaterial({
        //     map: textureBody
        // });
        //
        // scene.add(poly);
        // poly.material = new THREE.MeshPhongMaterial({
        //     map: textureBody
        // });

    });

    var controls = new THREE.TrackballControls( camera );

    var rendering =  function () {
        requestAnimationFrame(rendering);
        controls.update();
        render.render(scene, camera);
    };

    rendering();
};