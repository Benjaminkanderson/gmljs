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
    };
    
    window[ name ].create_event = function() {};
    window[ name ].step_event = function() {};
    objects.push( window[ name ] );
}

//script creation function
function script_create( name, func ) {
    window[ name ] = func;
}

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
}

function keyboard_check(key) {
    return keyboard[ key ];
}

function attachKeboardEvents() {
    // Keyboard event
    document.addEventListener('keydown', function(event) {
        console.log( "A key is being pressed." );
        (event.keyCode == 37) ? keyboard[ vk_left ];
        (event.keyCode == 39) ? keyboard[ vk_right ];
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
}

function handleCreateEvents() {
    // Handle the create event
    for (var i=0; i<objects.length; i++) {
        var obj = objects[ i ];
        if ( obj.create_event ) {
            obj.create_event.call( obj );
        }
    }
}

function handleOngoingEvents() {
    // Handle the step event
    for (var i=0; i<objects.length; i++) {
        var obj = objects[ i ];
        if ( obj.step_event ) {
            obj.step_event.call( obj );
        }
    }
}

function gameLoop() {
    handleOngoingEvents();
}

function run( fps ) {
    handleCreateEvents();
    attachKeboardEvents();
    setInterval( gameLoop, 1000/fps );
    keyboard[ vk_right ] = false;
    keyboard[ vk_left ] = false;
}
