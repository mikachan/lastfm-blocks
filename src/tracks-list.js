/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export function TracksList( { tracks, showTrackImage, includeLinkToTrack } ) {
	const isTracksValid = tracks?.length > 0;
	return (
		<ul className="tracks-list">
			{ ! isTracksValid && (
				<li className="no-tracks-found">
					{ __( 'No tracks found.', 'lastfm-recently-played-block' ) }
				</li>
			) }
			{ isTracksValid &&
				tracks.map( ( track ) => (
					<li key={ track.url }>
						{ showTrackImage && (
							<img
								src={ track.image[ 1 ][ '#text' ] }
								alt={ `${ track.artist[ '#text' ] } - ${ track.name }` }
							/>
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
							) }{ ' ' }
							- <span>{ track.artist[ '#text' ] }</span>
						</div>
					</li>
				) ) }
		</ul>
	);
}
