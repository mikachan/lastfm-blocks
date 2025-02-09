<?php
/**
 * Plugin Name:       Last.fm Blocks
 * Description:       A collection of blocks for Last.fm.
 * Requires at least: 6.7
 * Requires PHP:      7.2
 * Version:           1.0.0
 * Author:            Sarah Norris
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lastfm-blocks
 *
 * @package LastfmBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function lastfm_blocks_init() {
	register_block_type( __DIR__ . '/build/blocks/recently-played' );
}
add_action( 'init', 'lastfm_blocks_init' );

add_filter(
	'block_categories',
	function ( $categories ) {
		$category_slugs = wp_list_pluck( $categories, 'slug' );

		return in_array( 'lastfm-blocks', $category_slugs, true ) ? $categories : array_merge(
			$categories,
			array(
				array(
					'slug'  => 'lastfm-blocks',
					'title' => __( 'Last.fm Blocks', 'lastfm-blocks' ),
					'icon'  => 'playlist-audio',
				),
			)
		);
	}
);
