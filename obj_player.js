// Create the player object
object_create( "obj_player" );
obj_player.create_event = function() {
	console.log( "Create Event" );
}
obj_player.step_event = function() {
	console.log( "Step Event" );
}