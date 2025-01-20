# Last.fm Recently Played Block

A WordPress block that displays tracks scrobbled from Last.fm. It uses the [Last.fm API](https://www.last.fm/api) to fetch the data, and requires a Last.fm username and valid API key.

### Block Settings

The block has the following settings:

- The number of tracks to display (between 1-50)
- Include album artwork
- Choose between vinyl, cassette, or CD artwork
- Include link to track on Last.fm

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
