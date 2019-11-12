# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Hotfix [1.1.1] - 2019-11-12
- Remove initialData from url when mounting an app

## Released [1.1.0] - 2019-07-22
- Add support for urlParams in app.settings
- Support mode (popup and iframe) so apps are created on new window or iframe

## Release [1.0.1] - 2019-06-25
- Fix log error that was shown whenever the screen changed size

## Release [1.0.0] - 2019-06-04
- 'relative-to-position' position strategy changes format
- **BREAKING CHANGES**: Format for relative to postion changes from:
  - { offset: Position } to { offsetX: offsetX, offsetY: offsetY }

## Release [0.7.0] - 2018-12-12
### Release
- Suport new type lt-webrtc

## Release [0.5.0] - 2018-11-13
### Release
- Use slug for naming the apps
- Mounting strategy depends on the position
- Added new position top center

## HotFix [0.4.5] - 2018-10-16
### Release
- Version supporting lt-basic-container

## HotFix [0.4.4] - 2018-09-28
### Fixed
- New version bump for npm publish

## HotFix [0.4.3] - 2018-09-28
### Fixed
- Removed unused console log statments

## Release [0.4.2] - 2018-09-28
### Fixed
- Fixes having multiple listeners after unmounting app
- Fixes overwritting app id

## Release [0.4.0] - 2018-09-27
### Added
- Listen for Dom changes on element to allow apps position to react to changes
- Use MutationObserver web api

## Release [0.3.3] - 2018-09-25
### Fixed
- Updated widgets-manager version to handle markdown type