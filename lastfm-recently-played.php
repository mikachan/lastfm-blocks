<?php
/**
 * Plugin Name:       Last.fm Recently Played Block
 * Description:       Display your most recently played tracks from Last.fm.
 * Requires at least: 6.7
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Sarah Norris
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lastfm-recently-played
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_lastfm_recently_played_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_lastfm_recently_played_block_init' );
