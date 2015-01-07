// Create the player object
sprite_create("spr_ship", "Sprites/ship_sprite.png");
object_create( "obj_ship", spr_ship );

// Create Event
obj_ship.create_event = function() {
	console.log( "Create Event" );
	this.x = 320;
	this.y = 240;
}

// Step Event
obj_ship.step_event = function() {
	if ( keyboard_check( vk_right ) ) {
		this.x+=5;
	}

	if ( keyboard_check( vk_left ) ) {
		this.x-=5;
	}
}