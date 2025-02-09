# Last.fm Blocks

A collection of WordPress blocks that use the [Last.fm API](https://www.last.fm/api) to display data from a user's Last.fm account.

### Blocks

#### Recently Played Tracks

This block has the following settings:

| Setting | Description | Type | Default |
| --- | --- | --- | --- |
| Username | The Last.fm username to fetch data for | string | `null` |
| Number of Tracks | The number of tracks to display (between 1-50) | number | `10` |
| Include Album Artwork | Whether to include album artwork | boolean | `true` |
| Artwork Type | Choose between vinyl, cassette, or CD artwork | string | `vinyl` |
| Include Link to Track | Whether to include a link to the track on Last.fm | boolean | `true` |

## Requirements

- WordPress 6.7+
- PHP 7.4+

## Development

1. Clone this repository.
2. Run `npm install` to install the plugin's dependencies.
3. Run `composer install` to install the additional WordPress composer tools.
4. Start a local WordPress environment by running `npm run env:start`.
5. Run `npm start` to compile and watch source files for changes while developing.

Refer to package.json and composer.json for additional commands.
