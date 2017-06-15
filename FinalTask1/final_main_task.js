function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    var reflection = true;

    var isovalue = 128;

    var slider = document.querySelector(".slider"), 
        display = new Display(".value", 128);

    slider.addEventListener("input", function() {
        // ドラッグ中のイベント
        display.setValue(this.value);
    }, false);

    slider.addEventListener("change", function() {
        // マウスアップした際のイベント
        isovalue = this.value;
        display.setValue(this.value);
        screen.scene.remove( surfaces );
        surfaces = Isosurfaces( volume, isovalue, screen.light, screen.camera, reflection );
        screen.scene.add( surfaces );
    }, false);

    var lamb_button = document.getElementById("lamb_ref");
    var phong_button = document.getElementById("phong_ref");

    lamb_button.addEventListener("click", function() {
        reflection = true;
        screen.scene.remove( surfaces );
        surfaces = Isosurfaces( volume, isovalue, screen.light, screen.camera, reflection );
        screen.scene.add( surfaces );
    }, false);
    phong_button.addEventListener("click", function() {
        reflection = false;
        screen.scene.remove( surfaces );
        surfaces = Isosurfaces( volume, isovalue, screen.light, screen.camera, reflection );
        screen.scene.add( surfaces );
    }, false);

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var surfaces = Isosurfaces( volume, isovalue, screen.light, screen.camera, reflection );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    screen.loop();


    function Display(selector, initVal) {
        var elm = document.querySelector(selector);

        _init(initVal);

        function _init(initVal) {
            setValue(initVal);
        }

        function setValue(value) {
            elm.innerText = value - 0;
        }

        function getValue() {
            return elm.innerText - 0;
        }

        return{
            setValue: setValue,
            getValue: getValue,
        };
    }


}
