import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import './editor.scss';

/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
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
		lastFmTracks( lastFmUrl ).then( ( tracks ) => {
			setTracks( tracks );
		} );
	}, [ apiKey, username, numberOfTracks ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Display', 'lastfm-recently-played' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Show Track Images',
							'lastfm-recently-played'
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
						label={ __(
							'Number of Tracks',
							'lastfm-recently-played'
						) }
						value={ numberOfTracks || 1 }
						onChange={ ( value ) =>
							setAttributes( { numberOfTracks: value } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Settings', 'lastfm-recently-played' ) }>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Last.fm API Key',
							'lastfm-recently-played'
						) }
						help={ __(
							'Create a last.fm API key at last.fm/api.',
							'lastfm-recently-played'
						) }
						value={ apiKey || '' }
						onChange={ ( value ) =>
							setAttributes( { apiKey: value } )
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Last.fm Username',
							'lastfm-recently-played'
						) }
						value={ username || '' }
						onChange={ ( value ) =>
							setAttributes( { username: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<ul>
					{ tracks.map( ( track ) => (
						<li key={ track.date.uts }>
							{ showTrackImage && (
								<img src={ track.image[ 0 ][ '#text' ] } />
							) }
							{ track.artist[ '#text' ] } - { track.name }
						</li>
					) ) }
				</ul>
			</div>
		</>
	);
}
