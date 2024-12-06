/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { fetchLastFmTracks } from './lastfm-resolvers';
import { TracksList } from './tracks-list';

const tracksListContainer = document.querySelector(
	'.wp-block-lastfm-recently-played-block-lastfm-recently-played-block .tracks-list'
);
const root = createRoot( tracksListContainer );

const apiKey = tracksListContainer.dataset.lastfmApikey;
const username = tracksListContainer.dataset.lastfmUsername;
const numberOfTracks = parseInt(
	tracksListContainer.dataset.lastfmNumberoftracks,
	10
);
const showTrackImage =
	'true' === tracksListContainer.dataset.lastfmShowtrackimage;
const includeLinkToTrack =
	'true' === tracksListContainer.dataset.lastfmIncludelinktotrack;

fetchLastFmTracks( apiKey, username, numberOfTracks ).then( ( tracks ) => {
	root.render(
		<TracksList
			tracks={ tracks }
			showTrackImage={ showTrackImage }
			includeLinkToTrack={ includeLinkToTrack }
		/>
	);
} );
