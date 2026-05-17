=== Last.fm Blocks ===
Contributors:      mikachan
Tags:              block, lastfm, scrobble, music, recently played
Requires at least: 6.7
Requires PHP:      7.2
Tested up to:      6.7
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A collection of blocks for Last.fm.

== Description ==

A collection of WordPress blocks that use the Last.fm API to display data from a user's Last.fm account.

The plugin includes the following blocks:

*Recently Played Tracks*
Display a list of the most recently played tracks from a Last.fm user.

This block has the following settings:
- Last.fm Username: The Last.fm username to fetch data for.
- Number of Tracks: The number of tracks to display. Defaults to 1.
- Include Album Art: Whether to include the album art for each track. Disabled by default.
- Artwork Type: The type of artwork to display. Options are Default, Vinyl Record, CD, and Cassette Tape.
- Include Link to Track: Whether to include a link to the track on Last.fm.

Set the Last.fm API key once in Settings > Last.fm Blocks.

== External Services ==

This plugin connects to the Last.fm API to fetch recently played track data. When a page containing the Recently Played Tracks block is rendered, the plugin sends the saved Last.fm API key, the configured Last.fm username, and the requested number of tracks to `https://ws.audioscrobbler.com/2.0/`.

The response can include track names, artist names, Last.fm track URLs, and artwork URLs. Responses are cached in WordPress transients for five minutes. The plugin stores the Last.fm API key in the WordPress options table and stores the Last.fm username in block attributes.

Last.fm API documentation: https://www.last.fm/api
Last.fm API Terms of Service: https://www.last.fm/api/tos
Last.fm Privacy Policy: https://www.last.fm/legal/privacy

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/lastfm-blocks` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Add your Last.fm API key in Settings > Last.fm Blocks.
4. Add your Last.fm username in the block settings.

== Source Code ==

The distributed plugin includes compiled block assets in the `build` directory. The human-readable source code and build tools are available at:
https://github.com/mikachan/lastfm-recently-played-block

To build the plugin assets from source, run `npm install` and `npm run build`.

== Changelog ==

= 1.0.0 =
* Initial release

== Licenses ==

Image of vinyl record from rawpixel.com.
Source: https://www.rawpixel.com/image/6338463/png-sticker-vintage

Image of CD from rawpixel.com.
Source: https://www.rawpixel.com/image/7672268/disk-png-sticker-transparent-background

Image of cassette tape from rawpixel.com.
Source: https://www.rawpixel.com/image/7709394/png-sticker-vintage
