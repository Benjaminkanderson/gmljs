// This is just a test javascript file I'm using to mess around with a
// javascript gml interpreter

objects = [];

// Object creation function
function object_create( name ) {
    window[ name ] = function() {
        this.x = 0;
        this.y = 0;
    };
    
    window[ name ].create_event = function() {};
    window[ name ].step_event = function() {};
}

//script creation function
function script_create( name, func ) {
    window[ name ] = func;
}

function instance_create( x, y, object ) {
    var obj = new object();
    obj.create_event = object.create_event;
    obj.create_event.call( obj );
    return obj;
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
    setInterval( gameLoop, 1000/fps );
}