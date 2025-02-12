/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	AlignmentControl,
	BlockControls,
	useBlockProps,
	useBlockEditingMode,
} from '@wordpress/block-editor';
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
import { fetchLastFmTracks } from '../../api/lastfm-resolvers';
import { TracksList } from '../../components/tracks-list';

export default function Edit( { attributes, setAttributes } ) {
	const {
		apiKey,
		username,
		numberOfTracks,
		showTrackArtwork,
		imageStyle,
		includeLinkToTrack,
		textAlign,
	} = attributes;
	const blockEditingMode = useBlockEditingMode();
	const [ isLoading, setIsLoading ] = useState( false );
	const [ tracks, setTracks ] = useState( [] );
	const { createErrorNotice, removeNotice } = useDispatch( noticesStore );

	useEffect( () => {
		if ( ! apiKey || ! username ) {
			createErrorNotice(
				__(
					'Please provide a valid Last.fm API key and username.',
					'lastfm-blocks'
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
				<PanelBody title={ __( 'Display', 'lastfm-blocks' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Include links to tracks',
							'lastfm-blocks'
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
						label={ __( 'Number of Tracks', 'lastfm-blocks' ) }
						value={ numberOfTracks || 1 }
						onChange={ ( value ) =>
							setAttributes( { numberOfTracks: value } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Show track artwork', 'lastfm-blocks' ) }
						checked={ showTrackArtwork }
						onChange={ () =>
							setAttributes( {
								showTrackArtwork: ! showTrackArtwork,
							} )
						}
					/>
					{ showTrackArtwork && (
						<SelectControl
							__next40pxDefaultSize
							label={ __( 'Image Style', 'lastfm-blocks' ) }
							value={ imageStyle || 'default' }
							options={ [
								{ label: 'Default', value: 'default' },
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
					title={ __( 'Last.fm User Details', 'lastfm-blocks' ) }
				>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Last.fm Username', 'lastfm-blocks' ) }
						value={ username || '' }
						onChange={ ( value ) =>
							setAttributes( { username: value } )
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Last.fm API Key', 'lastfm-blocks' ) }
						help={ __(
							'Create a last.fm API key at last.fm/api.',
							'lastfm-blocks'
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
				{ ! isLoading && ( ! apiKey || ! username ) && (
					<div className="lastfm-blocks-error">
						<strong>
							{ __(
								'Error: Last.fm Recently Played Block',
								'lastfm-blocks'
							) }
						</strong>
						<p>
							{ ! apiKey && (
								<span>
									{ __(
										'Please provide a valid Last.fm API key.',
										'lastfm-blocks'
									) }
								</span>
							) }
							{ ! username && (
								<span>
									{ __(
										'Please provide a valid Last.fm username.',
										'lastfm-blocks'
									) }
								</span>
							) }
						</p>
					</div>
				) }
				{ ! isLoading && apiKey && username && (
					<>
						{ blockEditingMode === 'default' && (
							<BlockControls group="block">
								<AlignmentControl
									value={ textAlign }
									onChange={ ( nextAlign ) => {
										setAttributes( {
											textAlign: nextAlign,
										} );
									} }
								/>
							</BlockControls>
						) }
						<TracksList
							tracks={ tracks }
							showTrackArtwork={ showTrackArtwork }
							imageStyle={ imageStyle }
							includeLinkToTrack={ includeLinkToTrack }
							textAlign={ textAlign }
						/>
					</>
				) }
			</div>
		</>
	);
}
