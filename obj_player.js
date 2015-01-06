// Create the player object
object_create( "obj_player" );

// Create Event
obj_player.create_event = function() {
	console.log( "Create Event" );
}

// Step Event
obj_player.step_event = function() {
	if ( keyboard_check( vk_right ) ) {
		x++;
	}

	if ( keyboard_check( vk_left ) ) {
		x--;
	}
}