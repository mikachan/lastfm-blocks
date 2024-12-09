/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export function TracksList( {
	tracks,
	includeLinkToTrack,
	showTrackImage,
	imageStyle,
	textAlign,
} ) {
	const isTracksValid = tracks?.length > 0;

	const TrackLinkTag = ( { children, url } ) => {
		if ( includeLinkToTrack ) {
			return (
				<a
					href={ url }
					target="_blank"
					rel="noreferrer"
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
					{ __( 'No tracks found.', 'lastfm-recently-played-block' ) }
				</li>
			) }
			{ isTracksValid &&
				tracks.map( ( track ) => (
					<li key={ track.url }>
						{ showTrackImage && (
							<div className={ `track-image ${ imageStyle }` }>
								<TrackLinkTag url={ track.url }>
									<span
										className="artwork"
										role="img"
										aria-label={ `${ track.artist[ '#text' ] } - ${ track.name }` }
										style={ {
											backgroundImage: `url(${ track.image[ 1 ][ '#text' ] })`,
										} }
									>
										<span className="format" />
									</span>
								</TrackLinkTag>
							</div>
						) }
						<div className="track-info">
							<TrackLinkTag url={ track.url }>
								{ track.name }
							</TrackLinkTag>
							<br />
							<span className="artist-name">
								{ track.artist[ '#text' ] }
							</span>
						</div>
					</li>
				) ) }
		</ul>
	);
}
