<?php
	// Get the block attributes.
	$api_key             = isset( $attributes['apiKey'] ) ? esc_attr( $attributes['apiKey'] ) : '';
	$username           = isset( $attributes['username'] ) ? esc_attr( $attributes['username'] ) : '';
	$number_of_tracks     = isset( $attributes['numberOfTracks'] ) ? esc_attr( $attributes['numberOfTracks'] ) : '1';
	$show_track_image     = isset( $attributes['showTrackImage'] ) ? $attributes['showTrackImage'] : false;
	$include_link_to_track = isset( $attributes['includeLinkToTrack'] ) ? $attributes['includeLinkToTrack'] : false;
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<ul
		class="tracks-list"
		data-lastfm-apiKey="<?php echo esc_attr( $api_key ); ?>"
		data-lastfm-username="<?php echo esc_attr( $username ); ?>"
		data-lastfm-numberOfTracks="<?php echo esc_attr( $number_of_tracks ); ?>"
		<?php if ( $show_track_image ) : ?>
			data-lastfm-showTrackImage="true"
		<?php endif; ?>
		<?php if ( $include_link_to_track ) : ?>
			data-lastfm-includeLinkToTrack="true"
		<?php endif; ?>
	>
		<li>
			<?php
			echo __(
				'Recently played tracks loading…',
				'lastfm-recently-played-block'
			);
			?>
		</li>
	</ul>
</div>
