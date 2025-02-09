/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { fetchLastFmTracks } from '../../api/lastfm-resolvers';
import { TracksList } from '../../components/tracks-list';

const tracksListContainer = document.querySelector(
	'.wp-block-lastfm-blocks-lastfm-recently-played-block'
);
const root = createRoot( tracksListContainer );
const tracksAttr = tracksListContainer.dataset;
const apiKey = tracksAttr.lastfmApikey;
const username = tracksAttr.lastfmUsername;
const numberOfTracks = tracksAttr.lastfmNumberoftracks;
const includeLinkToTrack = 'true' === tracksAttr.lastfmIncludelinktotrack;
const showTrackArtwork = 'true' === tracksAttr.lastfmShowtrackartwork;
const imageStyle = tracksAttr.lastfmImagestyle;
const textAlign = tracksAttr.lastfmTextalign;

fetchLastFmTracks( apiKey, username, numberOfTracks )
	.then( ( tracks ) => {
		root.render(
			<TracksList
				tracks={ tracks }
				includeLinkToTrack={ includeLinkToTrack }
				showTrackArtwork={ showTrackArtwork }
				imageStyle={ imageStyle }
				textAlign={ textAlign }
			/>
		);
	} )
	.catch( ( error ) => {
		// eslint-disable-next-line no-console
		console.error( error );
	} );
