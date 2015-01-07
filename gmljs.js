// This is just a test javascript file I'm using to mess around with a
// javascript gml interpreter

isIE = /msie/.test(navigator.userAgent.toLowerCase()) || (/mozilla\/5\.0/.test(navigator.userAgent.toLowerCase()) && /rv:11\.0/.test(navigator.userAgent.toLowerCase()));
objects = [];
instances = [];
vk_left = 37;
vk_right = 39;
keyboard = {};

// Object creation function
function object_create( name, sprite ) {
    window[ name ] = function() {
        this.x = 0;
        this.y = 0;
        this.name = name;
        this.sprite_index = sprite;
        this.sprite = createImage( sprite );
        document.body.appendChild( this.sprite );
        this.sprite.style.position = 'absolute';
    };
    
    window[ name ].create_event = function() {};
    window[ name ].step_event = function() {};
    objects.push( window[ name ] );
};

//script creation function
function script_create( name, func ) {
    window[ name ] = func;
};

// Sprite creation function
function sprite_create( name, path) {
    window[ name ] = path;
};

function instance_create( x, y, object ) {
    if (object) {
        var obj = new object();
        obj.create_event = object.create_event;
        obj.step_event = object.step_event;
        instances.push( obj );
    } else {
        obj = null;
    }

    return obj;
};

function keyboard_check(key) {
    var result = keyboard[ key ];
    keyboard[ key ] = false;
    return result;
};

function createImage(src) {
    var img = isIE? new Image() : document.createElement('img');
    img.src = src;
    return img;
};

function attachKeboardEvents() {
    // Keyboard event
    document.addEventListener('keydown', function(event) {
        if ( event.keyCode == 37 ) keyboard[ vk_left ] = true;
        if ( event.keyCode == 39 ) keyboard[ vk_right ] = true;
    });

    /*
    // Keyboard Pressed event
    document.addEventListener('keypress', function(event) {

    });

    // Keyboard Released event
    document.addEventListener('keyup', function(event) {

    });
    */
};

// Handle one time events
function handleCreateEvents() {
    for (var i=0; i<instances.length; i++) {
        var instance = instances[ i ];

        // Handle the create event
        if ( instance.create_event ) {
            instance.create_event.call( instance );
        }

        // Control the sprites position;
        instance.sprite.style.left = instance.x+"px";
        instance.sprite.style.top = instance.y+"px";
    }
};

// Handle ongoing events
function handleOngoingEvents() {
    for (var i=0; i<instances.length; i++) {
        var instance = instances[ i ];

        // Handle the step event
        if ( instance.step_event ) {
            instance.step_event.call( instance );
        }

        // Control the sprites position;
        instance.sprite.style.left = instance.x+"px";
    }
};

function gameLoop() {
    handleOngoingEvents();
};

function run( fps ) {
    handleCreateEvents();
    attachKeboardEvents();
    setInterval( gameLoop, 1000/fps );
};
