// Create the player object
object_create( "obj_player" );

// Create Event
obj_player.create_event = function() {
	console.log( "Create Event" );
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