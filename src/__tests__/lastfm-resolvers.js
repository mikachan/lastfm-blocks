/* global jest, describe, beforeEach, it, expect */

/**
 * Internal dependencies
 */
import { fetchLastFmTracks } from '../lastfm-resolvers';

describe( 'fetchLastFmTracks', () => {
	beforeEach( () => {
		// Clear all mocks before each test
		global.fetch = jest.fn();
	} );

	it( 'should fetch tracks successfully', async () => {
		const mockTracks = [
			{ name: 'Track 1', artist: { '#text': 'Artist 1' } },
			{ name: 'Track 2', artist: { '#text': 'Artist 2' } },
		];

		global.fetch.mockResolvedValueOnce( {
			json: () =>
				Promise.resolve( {
					recenttracks: {
						track: mockTracks,
						'@attr': { total: '2' },
					},
				} ),
		} );

		const tracks = await fetchLastFmTracks( 'api-key', 'username', '2' );
		expect( tracks ).toEqual( mockTracks );
		expect( global.fetch ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should throw error for missing credentials', async () => {
		await expect( fetchLastFmTracks( '', 'username' ) ).rejects.toThrow(
			'API key and username are required'
		);
		await expect( fetchLastFmTracks( 'api-key', '' ) ).rejects.toThrow(
			'API key and username are required'
		);
	} );

	it( 'should throw error for invalid number of tracks', async () => {
		await expect(
			fetchLastFmTracks( 'api-key', 'username', '0' )
		).rejects.toThrow( 'Number of tracks must be a positive number' );
		await expect(
			fetchLastFmTracks( 'api-key', 'username', 'invalid' )
		).rejects.toThrow( 'Number of tracks must be a positive number' );
	} );

	it( 'should handle API errors', async () => {
		global.fetch.mockResolvedValueOnce( {
			json: () =>
				Promise.resolve( {
					error: 6,
					message: 'Invalid parameters',
				} ),
		} );

		await expect(
			fetchLastFmTracks( 'invalid-key', 'username' )
		).rejects.toThrow( 'Invalid parameters' );
	} );

	it( 'should handle no tracks found', async () => {
		global.fetch.mockResolvedValueOnce( {
			json: () =>
				Promise.resolve( {
					recenttracks: {
						'@attr': { total: '0' },
					},
				} ),
		} );

		await expect(
			fetchLastFmTracks( 'api-key', 'username' )
		).rejects.toThrow( 'No Last.fm tracks found from user "username".' );
	} );

	it( 'should return empty array when track data is missing', async () => {
		global.fetch.mockResolvedValueOnce( {
			json: () =>
				Promise.resolve( {
					recenttracks: {
						'@attr': { total: '1' },
					},
				} ),
		} );

		const tracks = await fetchLastFmTracks( 'api-key', 'username' );
		expect( tracks ).toEqual( [] );
	} );

	it( 'should limit number of tracks to requested amount', async () => {
		const mockTracks = [
			{ name: 'Track 1' },
			{ name: 'Track 2' },
			{ name: 'Track 3' }, // Extra track
		];

		global.fetch.mockResolvedValueOnce( {
			json: () =>
				Promise.resolve( {
					recenttracks: {
						track: mockTracks,
						'@attr': { total: '3' },
					},
				} ),
		} );

		const tracks = await fetchLastFmTracks( 'api-key', 'username', '2' );
		expect( tracks ).toHaveLength( 2 );
		expect( tracks ).toEqual( [ mockTracks[ 0 ], mockTracks[ 1 ] ] );
	} );
} );
