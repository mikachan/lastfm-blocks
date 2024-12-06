<?php
	// Get the block attributes.
	$apiKey = isset( $attributes['apiKey'] ) ? esc_attr( $attributes['apiKey'] ) : '';
	$username = isset( $attributes['username'] ) ? esc_attr( $attributes['username'] ) : '';
	$numberOfTracks = isset( $attributes['numberOfTracks'] ) ? esc_attr( $attributes['numberOfTracks'] ) : '1';
	$showTrackImage = isset( $attributes['showTrackImage'] ) ? $attributes['showTrackImage'] : false;
	$includeLinkToTrack = isset( $attributes['includeLinkToTrack'] ) ? $attributes['includeLinkToTrack'] : false;
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<ul
		class="tracks-list"
		data-lastfm-apiKey="<?php echo esc_attr( $apiKey ); ?>"
		data-lastfm-username="<?php echo esc_attr( $username ); ?>"
		data-lastfm-numberOfTracks="<?php echo esc_attr( $numberOfTracks ); ?>"
		<?php if ( $showTrackImage ) : ?>
			data-lastfm-showTrackImage="true"
		<?php endif; ?>
		<?php if ( $includeLinkToTrack ) : ?>
			data-lastfm-includeLinkToTrack="true"
		<?php endif; ?>
	>
		<li>
			<?php echo __(
				'Latest scrobbled tracks from Last.fm.',
				'lastfm-recently-played-block'
				); ?>
		</li>
	</ul>
</div>
