// Create the player object
object_create( "obj_player" );
obj_player.create_event = function() {
	console.log( "Create Event" );
}
obj_player.step_event = function() {
	console.log("Step Event");
	if ( keyboard_check( vk_right ) ) {
		console.log( "Right key" );
	}

	if ( keyboard_check( vk_left ) ) {
		console.log( "Left key" );
	}
}