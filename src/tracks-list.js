/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export function TracksList( { tracks, showTrackImage, includeLinkToTrack } ) {
	const isTracksValid = tracks?.length > 0;
	return (
		<div className="tracks-container">
			<ul className="tracks-list">
				{ ! isTracksValid && (
					<li className="no-tracks-found">
						{ __(
							'No tracks found.',
							'lastfm-recently-played-block'
						) }
					</li>
				) }
				{ isTracksValid &&
					tracks.map( ( track ) => (
						<li key={ track.url }>
							{ showTrackImage && (
								<div className="track-image">
									<img
										src={ track.image[ 1 ][ '#text' ] }
										alt={ `${ track.artist[ '#text' ] } - ${ track.name }` }
									/>
									<span className="vinyl" />
								</div>
							) }
							<div className="track-info">
								{ includeLinkToTrack ? (
									<a
										href={ track.url }
										target="_blank"
										rel="noreferrer"
									>
										{ track.name }
									</a>
								) : (
									<span>{ track.name }</span>
								) }
								<br />
								<span>{ track.artist[ '#text' ] }</span>
							</div>
						</li>
					) ) }
			</ul>
		</div>
	);
}
