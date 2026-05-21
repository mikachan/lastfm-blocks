=== GrooveLog Blocks for Last.fm ===
Contributors:      mikachan
Tags:              block, lastfm, scrobble, music, recently played
Requires at least: 6.7
Requires PHP:      7.2
Tested up to:      7.0
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Display Last.fm listening activity in WordPress blocks, starting with recently played tracks.

== Description ==

GrooveLog Blocks for Last.fm adds block-based Last.fm listening data to your WordPress site.

The plugin currently includes a Recently Played Tracks block that displays the latest tracks from a Last.fm user. Add a username, choose how many tracks to show, and optionally include artwork and links back to Last.fm.

= Features =

* Display 1 to 50 recently played tracks.
* Show track names and artist names.
* Link tracks to their Last.fm pages.
* Add optional artwork using default, vinyl, cassette, or CD styles.
* Configure your Last.fm API key once for all blocks.
* Cache Last.fm responses for five minutes to reduce repeat API requests.

= Recently Played Tracks =

Use this block to show a list of recently played tracks from a Last.fm profile.

Block settings:

* Last.fm Username: the Last.fm username to fetch tracks for.
* Number of Tracks: the number of tracks to display. Defaults to 1.
* Include Album Art: whether to include artwork for each track. Disabled by default.
* Artwork Type: default, vinyl record, CD, or cassette tape.
* Include Link to Track: whether to link each track to Last.fm.

Set the Last.fm API key once in Settings > GrooveLog Blocks for Last.fm, then add your Last.fm username in the block sidebar.

== External Services ==

This plugin connects to the [Last.fm API](https://www.last.fm/api) to fetch recently played track data. When a page containing the Recently Played Tracks block is rendered, the plugin sends the saved Last.fm API key, the configured Last.fm username, and the requested number of tracks to `https://ws.audioscrobbler.com/2.0/`.

The response can include track names, artist names, Last.fm track URLs, and artwork URLs. When track artwork is enabled, visitors' browsers may request the returned artwork image URLs directly. Responses are cached in WordPress transients for five minutes. The plugin stores the Last.fm API key in the WordPress options table and stores the Last.fm username in block attributes.

Last.fm service links:

* [Last.fm API documentation](https://www.last.fm/api)
* [Last.fm API Terms of Service](https://www.last.fm/api/tos)
* [Last.fm Privacy Policy](https://www.last.fm/legal/privacy)

== Installation ==

1. Install the plugin from the WordPress plugin directory, or upload the plugin files to `/wp-content/plugins/groovelog-blocks-for-last-fm`.
2. Activate the plugin from the Plugins screen in WordPress.
3. Add your Last.fm API key in Settings > GrooveLog Blocks for Last.fm.
4. Add your Last.fm username in the block settings.

== Frequently Asked Questions ==

= Do I need a Last.fm API key? =

Yes. Create an API key from [Last.fm](https://www.last.fm/api), then save it in Settings > GrooveLog Blocks for Last.fm.

= Where is the API key stored? =

The API key is stored in the WordPress options table. It is not stored in block attributes or post content.

= Does the block make an API request on every page load? =

No. Last.fm responses are cached in WordPress transients for five minutes.

= Can I show album artwork? =

Yes. Enable album artwork in the block settings and choose the default, vinyl, cassette, or CD style.

== Source Code ==

The distributed plugin includes compiled block assets in the `build` directory. The human-readable source code and build tools are available on [GitHub](https://github.com/mikachan/groovelog-blocks-for-last-fm).

To build the plugin assets from source, run `npm install` and `npm run build`.

== Changelog ==

= 1.0.0 =
* Initial release
