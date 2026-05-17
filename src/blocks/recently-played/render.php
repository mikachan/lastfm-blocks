<?php
/**
 * Block attributes are provided by WordPress when this render file is included.
 *
 * @var array $attributes
 */
$attributes = isset( $attributes ) ? $attributes : array();

if ( ! function_exists( 'lastfm_blocks_fetch_recent_tracks' ) ) {
	/**
	 * Fetch recent tracks from Last.fm.
	 *
	 * @param string $api_key  Last.fm API key.
	 * @param string $username Last.fm username.
	 * @param int    $limit    Number of tracks to fetch.
	 * @return array
	 */
	function lastfm_blocks_fetch_recent_tracks( $api_key, $username, $limit ) {
		$cache_key = 'lastfm_blocks_recent_' . md5( $api_key . '|' . $username . '|' . $limit );
		$tracks    = get_transient( $cache_key );

		if ( is_array( $tracks ) ) {
			return $tracks;
		}

		$user_agent_version = defined( 'LASTFM_BLOCKS_VERSION' ) ? LASTFM_BLOCKS_VERSION : '1.0.0';

		$response = wp_remote_get(
			esc_url_raw(
				add_query_arg(
					array(
						'method'  => 'user.getrecenttracks',
						'user'    => $username,
						'api_key' => $api_key,
						'format'  => 'json',
						'limit'   => $limit,
					),
					'https://ws.audioscrobbler.com/2.0/'
				)
			),
			array(
				'timeout'    => 8,
				'user-agent' => 'Blocks-for-Last.fm/' . $user_agent_version . '; https://github.com/mikachan/lastfm-recently-played-block',
			)
		);

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return array();
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $data ) || ! empty( $data['error'] ) ) {
			return array();
		}

		$recent_tracks = isset( $data['recenttracks'] ) && is_array( $data['recenttracks'] ) ? $data['recenttracks'] : array();

		if ( isset( $recent_tracks['@attr']['total'] ) && '0' === $recent_tracks['@attr']['total'] ) {
			return array();
		}

		if ( empty( $recent_tracks['track'] ) ) {
			$tracks = array();
		} else {
			$tracks = $recent_tracks['track'];

			if ( ! is_array( $tracks ) ) {
				return array();
			}

			if ( isset( $tracks['name'] ) || isset( $tracks['artist'] ) ) {
				$tracks = array( $tracks );
			}
		}

		$tracks = array_filter( $tracks, 'is_array' );
		$tracks = array_slice( $tracks, 0, $limit );
		set_transient( $cache_key, $tracks, 5 * MINUTE_IN_SECONDS );

		return $tracks;
	}
}

if ( ! function_exists( 'lastfm_blocks_get_track_name' ) ) {
	/**
	 * Get a displayable track name.
	 *
	 * @param array $track Last.fm track data.
	 * @return string
	 */
	function lastfm_blocks_get_track_name( $track ) {
		if ( ! empty( $track['name'] ) ) {
			return sanitize_text_field( $track['name'] );
		}

		return __( 'Unknown track', 'blocks-for-lastfm' );
	}
}

if ( ! function_exists( 'lastfm_blocks_get_track_artist_name' ) ) {
	/**
	 * Get a displayable artist name.
	 *
	 * @param array $track Last.fm track data.
	 * @return string
	 */
	function lastfm_blocks_get_track_artist_name( $track ) {
		if ( ! empty( $track['artist']['#text'] ) ) {
			return sanitize_text_field( $track['artist']['#text'] );
		}

		if ( ! empty( $track['artist'] ) && is_string( $track['artist'] ) ) {
			return sanitize_text_field( $track['artist'] );
		}

		return __( 'Unknown artist', 'blocks-for-lastfm' );
	}
}

if ( ! function_exists( 'lastfm_blocks_get_track_artwork_url' ) ) {
	/**
	 * Get the best available artwork URL from Last.fm track data.
	 *
	 * @param array $track Last.fm track data.
	 * @return string
	 */
	function lastfm_blocks_get_track_artwork_url( $track ) {
		if ( empty( $track['image'] ) || ! is_array( $track['image'] ) ) {
			return '';
		}

		if ( ! empty( $track['image']['#text'] ) ) {
			return esc_url_raw( $track['image']['#text'] );
		}

		$images = array_reverse( $track['image'] );

		foreach ( $images as $image ) {
			if ( is_array( $image ) && ! empty( $image['#text'] ) ) {
				return esc_url_raw( $image['#text'] );
			}
		}

		return '';
	}
}

$api_key               = function_exists( 'lastfm_blocks_get_api_key' ) ? lastfm_blocks_get_api_key() : '';
$username              = isset( $attributes['username'] ) ? sanitize_text_field( $attributes['username'] ) : '';
$number_of_tracks      = isset( $attributes['numberOfTracks'] ) ? absint( $attributes['numberOfTracks'] ) : 1;
$include_link_to_track = ! empty( $attributes['includeLinkToTrack'] );
$show_track_artwork    = ! empty( $attributes['showTrackArtwork'] );
$image_style           = isset( $attributes['imageStyle'] ) ? sanitize_key( $attributes['imageStyle'] ) : 'default';
$text_align            = isset( $attributes['textAlign'] ) ? sanitize_key( $attributes['textAlign'] ) : 'left';

$number_of_tracks = max( 1, min( $number_of_tracks, 50 ) );
$image_style      = in_array( $image_style, array( 'default', 'vinyl', 'cassette', 'cd' ), true ) ? $image_style : 'default';
$text_align       = in_array( $text_align, array( 'left', 'center', 'right' ), true ) ? $text_align : 'left';
$tracks           = ( $api_key && $username ) ? lastfm_blocks_fetch_recent_tracks( $api_key, $username, $number_of_tracks ) : array();
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<ul class="<?php echo esc_attr( 'tracks-list has-text-align-' . $text_align ); ?>">
		<?php if ( empty( $tracks ) ) : ?>
			<li class="no-tracks-found">
				<?php esc_html_e( 'No recently played tracks found.', 'blocks-for-lastfm' ); ?>
			</li>
		<?php else : ?>
			<?php foreach ( $tracks as $track ) : ?>
				<?php
				$track_name  = lastfm_blocks_get_track_name( $track );
				$artist_name = lastfm_blocks_get_track_artist_name( $track );
				$track_url   = isset( $track['url'] ) ? esc_url_raw( $track['url'] ) : '';
				$artwork_url = lastfm_blocks_get_track_artwork_url( $track );
				?>
				<li>
					<?php if ( $show_track_artwork ) : ?>
						<div class="<?php echo esc_attr( 'track-image ' . $image_style ); ?>">
							<?php if ( $include_link_to_track && $track_url ) : ?>
								<a href="<?php echo esc_url( $track_url ); ?>" target="_blank" rel="noreferrer noopener" class="track-name">
							<?php else : ?>
								<span class="track-name">
							<?php endif; ?>
									<span
										class="artwork"
										role="img"
										aria-label="<?php echo esc_attr( sprintf( '%s - %s', $artist_name, $track_name ) ); ?>"
										<?php if ( $artwork_url ) : ?>
											style="<?php echo esc_attr( 'background-image: url(' . esc_url( $artwork_url ) . ');' ); ?>"
										<?php endif; ?>
									></span>
									<?php if ( 'default' !== $image_style ) : ?>
										<span class="format"></span>
									<?php endif; ?>
							<?php if ( $include_link_to_track && $track_url ) : ?>
								</a>
							<?php else : ?>
								</span>
							<?php endif; ?>
						</div>
					<?php endif; ?>
					<div class="track-info">
						<?php if ( $include_link_to_track && $track_url ) : ?>
							<a href="<?php echo esc_url( $track_url ); ?>" target="_blank" rel="noreferrer noopener" class="track-name">
								<?php echo esc_html( $track_name ); ?>
							</a>
						<?php else : ?>
							<span class="track-name"><?php echo esc_html( $track_name ); ?></span>
						<?php endif; ?>
						<br />
						<span class="artist-name"><?php echo esc_html( $artist_name ); ?></span>
					</div>
				</li>
			<?php endforeach; ?>
		<?php endif; ?>
	</ul>
</div>
