<?php
/**
 * Remove plugin data on uninstall.
 *
 * @package GrooveLogBlockForLastfm
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_option( 'lastfm_blocks_api_key' );
