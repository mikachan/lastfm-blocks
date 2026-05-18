/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
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
import { RawHTML, useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import metadata from './block.json';

export default function Edit( { attributes, setAttributes } ) {
	const {
		username,
		numberOfTracks,
		showTrackArtwork,
		imageStyle,
		includeLinkToTrack,
		textAlign,
	} = attributes;
	const blockEditingMode = useBlockEditingMode();
	const blockProps = useBlockProps();
	const [ isLoading, setIsLoading ] = useState( false );
	const [ preview, setPreview ] = useState( '' );
	const [ previewError, setPreviewError ] = useState( '' );

	useEffect( () => {
		let isMounted = true;

		if ( ! username ) {
			setIsLoading( false );
			setPreview( '' );
			setPreviewError( '' );

			return () => {
				isMounted = false;
			};
		}

		setIsLoading( true );
		setPreviewError( '' );

		apiFetch( {
			path: `/wp/v2/block-renderer/${ metadata.name }?context=edit`,
			method: 'POST',
			data: {
				attributes: {
					username,
					numberOfTracks,
					showTrackArtwork,
					imageStyle,
					includeLinkToTrack,
					textAlign,
				},
			},
		} )
			.then( ( response ) => {
				if ( isMounted ) {
					setPreview( response?.rendered || '' );
				}
			} )
			.catch( ( error ) => {
				if ( isMounted ) {
					setPreview( '' );
					setPreviewError(
						error?.message ||
							__(
								'Unable to render Last.fm preview.',
								'groovelog-blocks-for-last-fm'
							)
					);
				}
			} )
			.finally( () => {
				if ( isMounted ) {
					setIsLoading( false );
				}
			} );

		return () => {
			isMounted = false;
		};
	}, [
		imageStyle,
		includeLinkToTrack,
		numberOfTracks,
		showTrackArtwork,
		textAlign,
		username,
	] );

	const renderPreview = () => {
		if ( ! username ) {
			return (
				<div className="groovelog-blocks-for-last-fm-error">
					<strong>
						{ __(
							'Error: Recently Played Tracks',
							'groovelog-blocks-for-last-fm'
						) }
					</strong>
					<p>
						<span>
							{ __(
								'Please provide a valid Last.fm username.',
								'groovelog-blocks-for-last-fm'
							) }
						</span>
					</p>
				</div>
			);
		}

		if ( isLoading ) {
			return <Spinner />;
		}

		if ( previewError ) {
			return (
				<div className="groovelog-blocks-for-last-fm-error">
					<strong>
						{ __(
							'Error: Recently Played Tracks',
							'groovelog-blocks-for-last-fm'
						) }
					</strong>
					<p>
						<span>{ previewError }</span>
					</p>
				</div>
			);
		}

		return <RawHTML>{ preview }</RawHTML>;
	};

	return (
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
			<InspectorControls>
				<PanelBody
					title={ __( 'Display', 'groovelog-blocks-for-last-fm' ) }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Include links to tracks',
							'groovelog-blocks-for-last-fm'
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
							'groovelog-blocks-for-last-fm'
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
							'Show track artwork',
							'groovelog-blocks-for-last-fm'
						) }
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
							label={ __(
								'Image Style',
								'groovelog-blocks-for-last-fm'
							) }
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
					title={ __(
						'Last.fm User Details',
						'groovelog-blocks-for-last-fm'
					) }
				>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Last.fm Username',
							'groovelog-blocks-for-last-fm'
						) }
						help={ __(
							'Set the API key in Settings > GrooveLog Blocks for Last.fm.',
							'groovelog-blocks-for-last-fm'
						) }
						value={ username || '' }
						onChange={ ( value ) =>
							setAttributes( { username: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>{ renderPreview() }</div>
		</>
	);
}
