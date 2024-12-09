/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	SelectControl,
	PanelBody,
	TextControl,
	ToggleControl,
	Spinner,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { fetchLastFmTracks } from './lastfm-resolvers';
import { TracksList } from './tracks-list';

export default function Edit( { attributes, setAttributes } ) {
	const {
		apiKey,
		username,
		numberOfTracks,
		showTrackImage,
		imageStyle,
		includeLinkToTrack,
	} = attributes;
	const [ isLoading, setIsLoading ] = useState( false );
	const [ tracks, setTracks ] = useState( [] );
	const { createErrorNotice, removeNotice } = useDispatch( noticesStore );

	useEffect( () => {
		if ( ! apiKey || ! username ) {
			createErrorNotice(
				__(
					'Please provide a valid Last.fm API key and username.',
					'lastfm-recently-played-block'
				),
				{
					id: 'lastfm-recently-played-error',
				}
			);
		}

		if ( apiKey && username ) {
			setIsLoading( true );

			fetchLastFmTracks( apiKey, username, numberOfTracks )
				.then( ( data ) => {
					setTracks( data );
					removeNotice( 'lastfm-recently-played-error' );
				} )
				.catch( ( error ) => {
					setTracks( [] );
					createErrorNotice( error, {
						id: 'lastfm-recently-played-error',
					} );
				} )
				.finally( () => {
					setIsLoading( false );
				} );
		}
	}, [
		apiKey,
		createErrorNotice,
		numberOfTracks,
		removeNotice,
		setAttributes,
		setIsLoading,
		username,
	] );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Display', 'lastfm-recently-played-block' ) }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Include links to tracks',
							'lastfm-recently-played-block'
						) }
						checked={ includeLinkToTrack }
						onChange={ () =>
							setAttributes( {
								includeLinkToTrack: ! includeLinkToTrack,
							} )
						}
					/>
					<NumberControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						min={ 1 }
						max={ 50 }
						label={ __(
							'Number of Tracks',
							'lastfm-recently-played-block'
						) }
						value={ numberOfTracks || 1 }
						onChange={ ( value ) =>
							setAttributes( { numberOfTracks: value } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Show track images',
							'lastfm-recently-played-block'
						) }
						checked={ showTrackImage }
						onChange={ () =>
							setAttributes( {
								showTrackImage: ! showTrackImage,
							} )
						}
					/>
					{ showTrackImage && (
						<SelectControl
							__next40pxDefaultSize
							label={ __(
								'Image Style',
								'lastfm-recently-played-block'
							) }
							value={ imageStyle || 'vinyl' }
							options={ [
								{ label: 'Vinyl', value: 'vinyl' },
								{ label: 'Cassette', value: 'cassette' },
								{ label: 'CD', value: 'cd' },
							] }
							onChange={ ( value ) =>
								setAttributes( { imageStyle: value } )
							}
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __(
						'Last.fm User Details',
						'lastfm-recently-played-block'
					) }
				>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Last.fm Username',
							'lastfm-recently-played-block'
						) }
						value={ username || '' }
						onChange={ ( value ) =>
							setAttributes( { username: value } )
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Last.fm API Key',
							'lastfm-recently-played-block'
						) }
						help={ __(
							'Create a last.fm API key at last.fm/api.',
							'lastfm-recently-played-block'
						) }
						value={ apiKey || '' }
						onChange={ ( value ) =>
							setAttributes( { apiKey: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ isLoading && <Spinner /> }
				{ ! isLoading && apiKey && username && (
					<>
						<TracksList
							tracks={ tracks }
							showTrackImage={ showTrackImage }
							imageStyle={ imageStyle }
							includeLinkToTrack={ includeLinkToTrack }
						/>
					</>
				) }
			</div>
		</>
	);
}
