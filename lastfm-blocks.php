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

define( 'LASTFM_BLOCKS_VERSION', '1.0.0' );
define( 'LASTFM_BLOCKS_API_KEY_OPTION', 'lastfm_blocks_api_key' );

/**
 * Get the saved Last.fm API key.
 *
 * @return string
 */
function lastfm_blocks_get_api_key() {
	return sanitize_text_field( get_option( LASTFM_BLOCKS_API_KEY_OPTION, '' ) );
}

function lastfm_blocks_init() {
	register_block_type( __DIR__ . '/build/blocks/recently-played' );
}
add_action( 'init', 'lastfm_blocks_init' );

/**
 * Register plugin settings.
 */
function lastfm_blocks_register_settings() {
	register_setting(
		'lastfm_blocks_settings',
		LASTFM_BLOCKS_API_KEY_OPTION,
		array(
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		)
	);

	add_settings_section(
		'lastfm_blocks_api_settings',
		__( 'Last.fm API', 'lastfm-blocks' ),
		'__return_null',
		'lastfm-blocks'
	);

	add_settings_field(
		LASTFM_BLOCKS_API_KEY_OPTION,
		__( 'API Key', 'lastfm-blocks' ),
		'lastfm_blocks_render_api_key_field',
		'lastfm-blocks',
		'lastfm_blocks_api_settings'
	);
}
add_action( 'admin_init', 'lastfm_blocks_register_settings' );

/**
 * Render the API key settings field.
 */
function lastfm_blocks_render_api_key_field() {
	?>
	<input
		type="password"
		id="<?php echo esc_attr( LASTFM_BLOCKS_API_KEY_OPTION ); ?>"
		name="<?php echo esc_attr( LASTFM_BLOCKS_API_KEY_OPTION ); ?>"
		value="<?php echo esc_attr( lastfm_blocks_get_api_key() ); ?>"
		class="regular-text"
		autocomplete="off"
	/>
	<p class="description">
		<?php esc_html_e( 'Create a Last.fm API key at last.fm/api and save it here once for all Last.fm blocks.', 'lastfm-blocks' ); ?>
	</p>
	<?php
}

/**
 * Add the plugin settings page.
 */
function lastfm_blocks_add_settings_page() {
	add_options_page(
		__( 'Last.fm Blocks', 'lastfm-blocks' ),
		__( 'Last.fm Blocks', 'lastfm-blocks' ),
		'manage_options',
		'lastfm-blocks',
		'lastfm_blocks_render_settings_page'
	);
}
add_action( 'admin_menu', 'lastfm_blocks_add_settings_page' );

/**
 * Render the plugin settings page.
 */
function lastfm_blocks_render_settings_page() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Last.fm Blocks', 'lastfm-blocks' ); ?></h1>
		<form action="options.php" method="post">
			<?php
			settings_fields( 'lastfm_blocks_settings' );
			do_settings_sections( 'lastfm-blocks' );
			submit_button();
			?>
		</form>
	</div>
	<?php
}

/**
 * Add a settings link to the plugins list.
 *
 * @param array $actions Plugin action links.
 * @return array
 */
function lastfm_blocks_add_settings_action_link( $actions ) {
	$settings_link = sprintf(
		'<a href="%s">%s</a>',
		esc_url( admin_url( 'options-general.php?page=lastfm-blocks' ) ),
		esc_html__( 'Settings', 'lastfm-blocks' )
	);

	return array_merge(
		array(
			'settings' => $settings_link,
		),
		$actions
	);
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'lastfm_blocks_add_settings_action_link' );

add_filter(
	'block_categories_all',
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
