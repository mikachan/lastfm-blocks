/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export function TracksList( { tracks, showTrackImage, includeLinkToTrack } ) {
	const isTracksValid = tracks?.length > 0;

	const TrackLinkTag = ( { children, url } ) => {
		if ( includeLinkToTrack ) {
			return (
				<a href={ url } target="_blank" rel="noreferrer">
					{ children }
				</a>
			);
		}
		return <span>{ children }</span>;
	};

	return (
		<ul className="tracks-list">
			{ ! isTracksValid && (
				<li className="no-tracks-found">
					{ __( 'No tracks found.', 'lastfm-recently-played-block' ) }
				</li>
			) }
			{ isTracksValid &&
				tracks.map( ( track ) => (
					<li key={ track.date.uts }>
						{ showTrackImage && (
							<div className="track-image">
								<TrackLinkTag url={ track.url }>
									<img
										src={ track.image[ 1 ][ '#text' ] }
										alt={ `${ track.artist[ '#text' ] } - ${ track.name }` }
									/>
									<span className="vinyl" />
								</TrackLinkTag>
							</div>
						) }
						<div className="track-info">
							<TrackLinkTag url={ track.url }>
								{ track.name }
							</TrackLinkTag>
							<br />
							<span>{ track.artist[ '#text' ] }</span>
						</div>
					</li>
				) ) }
		</ul>
	);
}
