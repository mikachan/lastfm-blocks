/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { apiKey, username, numberOfTracks, showTrackImage } = attributes;
	const [ tracks, setTracks ] = useState( [] );
	const lastFmUrlPrefix =
		'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';

	const lastFmTracks = async ( lastFmUrl ) => {
		const response = await fetch( lastFmUrl );
		const data = await response.json();
		return data.recenttracks.track;
	};

	useEffect( () => {
		const lastFmUrl = `${ lastFmUrlPrefix }&user=${ username }&api_key=${ apiKey }&format=json&limit=${ numberOfTracks }`;
		lastFmTracks( lastFmUrl ).then( ( _tracks ) => {
			setTracks( _tracks );
		} );
	}, [ apiKey, username, numberOfTracks ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Display', 'create-block-theme' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Show Track Images',
							'create-block-theme'
						) }
						checked={ showTrackImage }
						onChange={ () =>
							setAttributes( {
								showTrackImage: ! showTrackImage,
							} )
						}
					/>
					<NumberControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Number of Tracks', 'create-block-theme' ) }
						value={ numberOfTracks || 1 }
						onChange={ ( value ) =>
							setAttributes( { numberOfTracks: value } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Settings', 'create-block-theme' ) }>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Last.fm API Key', 'create-block-theme' ) }
						help={ __(
							'Create a last.fm API key at last.fm/api.',
							'create-block-theme'
						) }
						value={ apiKey || '' }
						onChange={ ( value ) =>
							setAttributes( { apiKey: value } )
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Last.fm Username', 'create-block-theme' ) }
						value={ username || '' }
						onChange={ ( value ) =>
							setAttributes( { username: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ ! apiKey && (
					<p>
						{ __(
							'Please enter your Last.fm API key in the block settings.',
							'create-block-theme'
						) }
					</p>
				) }
				{ ! username && (
					<p>
						{ __(
							'Please enter your Last.fm username in the block settings.',
							'create-block-theme'
						) }
					</p>
				) }
				<ul>
					{ tracks.map( ( track ) => (
						<li key={ track.date.uts }>
							{ showTrackImage && (
								<img
									src={ track.image[ 0 ][ '#text' ] }
									alt={ `${ track.artist[ '#text' ] } - ${ track.name }` }
								/>
							) }
							{ track.artist[ '#text' ] } - { track.name }
						</li>
					) ) }
				</ul>
			</div>
		</>
	);
}
