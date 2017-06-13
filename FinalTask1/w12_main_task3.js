function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    var slider = document.querySelector(".slider"), 
        display = new Display(".value");

    slider.addEventListener("input", function() {
        // ドラッグ中のイベント
        display.setValue(this.value);
    }, false);

    slider.addEventListener("change", function() {
        // マウスアップした際のイベント
        display.setValue(this.value);
    }, false);

    function Display(selector) {
        var elm = document.querySelector(selector);

        _init();

        function _init() {
            setValue(0);
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

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue, screen.light, screen.camera );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    screen.loop();
}
