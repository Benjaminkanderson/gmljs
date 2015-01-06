// Create the player object
object_create( "obj_player" );

// Create Event
obj_player.create_event = function() {
	var x = this.x;
	console.log( "Create Event" );
	console.log( x );
}

// Step Event
obj_player.step_event = function() {
	if ( keyboard_check( vk_right ) ) {
		console.log( "Right key" );
	}

	if ( keyboard_check( vk_left ) ) {s
		console.log( "Left key" );
	}
}