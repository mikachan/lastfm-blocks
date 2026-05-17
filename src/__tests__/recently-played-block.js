/* global describe, it, expect */

/**
 * Internal dependencies
 */
import metadata from '../blocks/recently-played/block.json';

describe( 'recently played block metadata', () => {
	it( 'does not store API keys in block attributes', () => {
		expect( metadata.attributes ).not.toHaveProperty( 'apiKey' );
	} );

	it( 'renders dynamically on the server', () => {
		expect( metadata.render ).toBe( 'file:./render.php' );
	} );
} );
