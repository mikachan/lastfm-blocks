/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

const LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0/';
const LASTFM_METHOD = 'user.getrecenttracks';

/**
 * Fetches recent tracks from Last.fm API
 *
 * @param {string}        apiKey         The Last.fm API key
 * @param {string}        username       The Last.fm username
 * @param {string|number} numberOfTracks Number of tracks to fetch, defaults to 1
 * @return {Promise<Array>}              Array of track objects
 * @throws  {Error}                      If the API request fails or no tracks are found
 */
export async function fetchLastFmTracks(
	apiKey,
	username,
	numberOfTracks = '1'
) {
	if ( ! apiKey || ! username ) {
		throw new Error( 'API key and username are required' );
	}

	const limit = parseInt( numberOfTracks, 10 );
	if ( isNaN( limit ) || limit < 1 ) {
		throw new Error( 'Number of tracks must be a positive number' );
	}

	try {
		const response = await fetch(
			`${ LASTFM_API_URL }?method=${ LASTFM_METHOD }&user=${ username }&api_key=${ apiKey }&format=json&limit=${ limit }`
		);

		const data = await response.json();

		if ( data.error ) {
			throw new Error( data.message );
		}

		if ( data.recenttracks[ '@attr' ]?.total === '0' ) {
			throw new Error(
				sprintf(
					// translators: %s: Last.fm username
					__(
						'No Last.fm tracks found from user "%s".',
						'lastfm-recently-played-block'
					),
					username
				)
			);
		}

		if ( ! data.recenttracks.track ) {
			return [];
		}

		const tracks = data.recenttracks.track;
		// Ensure we don't return more tracks than requested
		// Sometimes the API returns an extra track
		return tracks.slice( 0, limit );
	} catch ( error ) {
		throw error;
	}
}
