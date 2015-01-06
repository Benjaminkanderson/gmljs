// This is just a test javascript file I'm using to mess around with a
// javascript gml interpreter

objects = [];
instances = [];
vk_left = 37;
vk_right = 39;
keyboard = {};

// Object creation function
function object_create( name ) {
    window[ name ] = function() {
        this.x = 0;
        this.y = 0;
        this.name = name;
    };
    
    window[ name ].create_event = function() {};
    window[ name ].step_event = function() {};
    objects.push( window[ name ] );
};

//script creation function
function script_create( name, func ) {
    window[ name ] = func;
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

function attachKeboardEvents() {
    // Keyboard event
    document.addEventListener('keydown', function(event) {
        if ( event.keyCode == 37 ) keyboard[ vk_left ] = true;
        if ( event.keyCode == 39 ) keyboard[ vk_right ] = true;
    });

    /*
    // Keyboard Pressed event
    document.addEventListener('keypress', function(event) {
        (event.keyCode == 37) ? keyboard_key[ vk_left ] = true: keyboard_key[ vk_left ] = false;
        (event.keyCode == 39) ? keyboard_key[ vk_right ] = true: keyboard_key[ vk_right ] = false;
    });

    // Keyboard Released event
    document.addEventListener('keyup', function(event) {
        (event.keyCode == 37) ? keyboard_key[ vk_left ] = true: keyboard_key[ vk_left ] = false;
        (event.keyCode == 39) ? keyboard_key[ vk_right ] = true: keyboard_key[ vk_right ] = false;
    });*/
};

function handleCreateEvents() {
    // Handle the create event
    for (var i=0; i<instances.length; i++) {
        var instance = instances[ i ];
        if ( instance.create_event ) {
            instance.create_event.call( instance );
        }
    }
};

function handleOngoingEvents() {
    // Handle the step event
    for (var i=0; i<instances.length; i++) {
        var instance = instances[ i ];
        if ( instance.step_event ) {
            instance.step_event.call( instance );
        }
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
