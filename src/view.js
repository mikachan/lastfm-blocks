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
	'.wp-block-lastfm-recently-played-block-lastfm-recently-played-block'
);
const root = createRoot( tracksListContainer );
const tracksAttr = tracksListContainer.dataset;
const apiKey = tracksAttr.lastfmApikey;
const username = tracksAttr.lastfmUsername;
const numberOfTracks = tracksAttr.lastfmNumberoftracks;
const includeLinkToTrack = 'true' === tracksAttr.lastfmIncludelinktotrack;
const showTrackImage = 'true' === tracksAttr.lastfmShowtrackimage;
const imageStyle = tracksAttr.lastfmImagestyle;
const textAlign = tracksAttr.lastfmTextalign;

fetchLastFmTracks( apiKey, username, numberOfTracks )
	.then( ( tracks ) => {
		root.render(
			<TracksList
				textAlign={ textAlign }
				tracks={ tracks }
				includeLinkToTrack={ includeLinkToTrack }
				showTrackImage={ showTrackImage }
				imageStyle={ imageStyle }
			/>
		);
	} )
	.catch( ( error ) => {
		// eslint-disable-next-line no-console
		console.error( error );
	} );
