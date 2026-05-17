/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

function getTrackArtistName( track ) {
	return track.artist?.[ '#text' ] || __( 'Unknown artist', 'lastfm-blocks' );
}

function getTrackArtworkUrl( track ) {
	return (
		track.image?.[ 1 ]?.[ '#text' ] ||
		track.image?.find( ( image ) => image?.[ '#text' ] )?.[ '#text' ] ||
		''
	);
}

export function TracksList( {
	tracks,
	includeLinkToTrack,
	showTrackArtwork,
	imageStyle,
	textAlign,
} ) {
	const isTracksValid = tracks?.length > 0;

	const TrackLinkTag = ( { children, url } ) => {
		if ( includeLinkToTrack && url ) {
			return (
				<a
					href={ url }
					target="_blank"
					rel="noreferrer noopener"
					className="track-name"
				>
					{ children }
				</a>
			);
		}
		return <span className="track-name">{ children }</span>;
	};

	return (
		<ul className={ `tracks-list ${ `has-text-align-${ textAlign }` }` }>
			{ ! isTracksValid && (
				<li className="no-tracks-found">
					{ __( 'No tracks found.', 'lastfm-blocks' ) }
				</li>
			) }
			{ isTracksValid &&
				tracks.map( ( track, index ) => {
					const trackName =
						track.name || __( 'Unknown track', 'lastfm-blocks' );
					const artistName = getTrackArtistName( track );
					const artworkUrl = getTrackArtworkUrl( track );

					return (
						<li
							key={
								track.url ||
								`${ artistName }-${ trackName }-${ index }`
							}
						>
							{ showTrackArtwork && (
								<div
									className={ `track-image ${ imageStyle }` }
								>
									<TrackLinkTag url={ track.url }>
										<span
											className="artwork"
											role="img"
											aria-label={ `${ artistName } - ${ trackName }` }
											style={
												artworkUrl
													? {
															backgroundImage: `url(${ artworkUrl })`,
													  }
													: undefined
											}
										/>
										{ imageStyle !== 'default' && (
											<span className="format" />
										) }
									</TrackLinkTag>
								</div>
							) }
							<div className="track-info">
								<TrackLinkTag url={ track.url }>
									{ trackName }
								</TrackLinkTag>
								<br />
								<span className="artist-name">
									{ artistName }
								</span>
							</div>
						</li>
					);
				} ) }
		</ul>
	);
}
