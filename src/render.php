<?php
	// Get the block attributes.
	$api_key             = isset( $attributes['apiKey'] ) ? esc_attr( $attributes['apiKey'] ) : '';
	$username           = isset( $attributes['username'] ) ? esc_attr( $attributes['username'] ) : '';
	$number_of_tracks     = isset( $attributes['numberOfTracks'] ) ? esc_attr( $attributes['numberOfTracks'] ) : '1';
	$include_link_to_track = isset( $attributes['includeLinkToTrack'] ) ? $attributes['includeLinkToTrack'] : false;
	$show_track_image     = isset( $attributes['showTrackImage'] ) ? $attributes['showTrackImage'] : false;
	$image_style		  = isset( $attributes['imageStyle'] ) ? esc_attr( $attributes['imageStyle'] ) : 'vinyl';
	$text_align = isset( $attributes['textAlign'] ) ? esc_attr( $attributes['textAlign'] ) : 'left';
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-lastfm-apiKey="<?php echo esc_attr( $api_key ); ?>"
	data-lastfm-username="<?php echo esc_attr( $username ); ?>"
	data-lastfm-numberOfTracks="<?php echo esc_attr( $number_of_tracks ); ?>"
	data-lastfm-textAlign="<?php echo esc_attr( $text_align ); ?>"
	<?php if ( $include_link_to_track ) : ?>
		data-lastfm-includeLinkToTrack="true"
	<?php endif; ?>
	data-lastfm-imageStyle="<?php echo esc_attr( $image_style ); ?>"
	<?php if ( $show_track_image ) : ?>
		data-lastfm-showTrackImage="true"
	<?php endif; ?>
>
	<ul class="tracks-list">
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
