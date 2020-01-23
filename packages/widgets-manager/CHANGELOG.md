# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased [2.3.0] - 2020-01-23
### Added
- Added method `getMountedApps` to the manager

## Hotfix [2.2.1, 2.2.2, 2.2.3, 2.2.4] - 2020-01-05
### Fixed
- Disable the Sync of firebase with redux -> Make a TODO to figure out corner
cases and enable in the future

## Hotfix [2.2.0] - 2019-12-12
### Fixed
- Save the initial_data { appSlug: {} } for each app in the store
- All functions that deals with apps receives string appName as parameter instead of id

## Hotfix [2.1.1] - 2019-12-06
### Fixed
- Fix typescript definitions

## Hotfix [2.1.0] - 2019-12-06
### Added
- When updating Apps setting due to changes on related container (MutationObserver)
change the correct app container (app-frame).
- Breaking change: Apps appStyle should have default key.

## Hotfix [2.0.3] - 2019-12-04
### Fixed
- Use created app in the services firestore and auth 

## Hotfix [2.0.2] - 2019-12-04
- Fix error warning FirebaseError: Firebase: Firebase App named already exists

## Hotfix [2.0.1] - 2019-12-02
### Fixed
- Removing app should remove the whole container not just the iframe

## Release [2.0.0] - 2019-12-02
### Added
- Added redux and firebase
- New way of mounting apps (create container div with full width iframe inside)

## Hotfix [1.1.1] - 2019-11-12
### Fixed
- Remove initialData from url when mounting an app

## Released [1.1.0] - 2019-07-22
### Added
- Add support for urlParams in app.settings
- Support mode (popup and iframe) so apps are created on new window or iframe

## Release [1.0.1] - 2019-06-25
### Added
- Fix log error that was shown whenever the screen changed size

## Release [1.0.0] - 2019-06-04
### Added
- 'relative-to-position' position strategy changes format
- **BREAKING CHANGES**: Format for relative to postion changes from:
  - { offset: Position } to { offsetX: offsetX, offsetY: offsetY }

## Release [0.7.0] - 2018-12-12
### Added
- Suport new type lt-webrtc

## Release [0.5.0] - 2018-11-13
### Added
- Use slug for naming the apps
- Mounting strategy depends on the position
- Added new position top center

## HotFix [0.4.5] - 2018-10-16
### Added
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