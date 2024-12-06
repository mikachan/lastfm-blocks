<?php
/**
 * Plugin Name:       Last.fm Recently Played Block
 * Description:       Display your most recently played tracks scrobbled from Last.fm.
 * Requires at least: 6.7
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Sarah Norris
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lastfm-recently-played-block
 *
 * @package LastfmRecentlyPlayed
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function lastfm_recently_played_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'lastfm_recently_played_init' );
