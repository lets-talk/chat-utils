# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Release [0.10.0] - 2020-10-16
### Added
- Add new app mode=self useful for integration tests

## Release [0.9.0] - 2020-03-12
### Added
- Add public method executeAppMethod

## Release [0.8.0] - 2020-01-23
### Added
- Add method `on` allowing apps to subscribe to window events

## Hoxfix [0.7.0] - 2020-01-18
### Added
- Add method `getContainerInfo` allowing apps now about container props

## Hoxfix [0.6.2] - 2019-12-16
### Added
- Support for `getContextObject` public sdk function

## Release [0.6.1] - 2019-08-01
### Added
- Remove console.log() call function

## Release [0.6.0] - 2019-08-01
### Added
- Support for `executeAppMethod()`

## Release [0.5.2] - 2019-07-22
### Added
- Support passing initialData as url params to the apps 
- Support settings mode parameter (either popup or iframe)

## Release [0.4.1] - 2019-06-02
### Added
- Relese version 0.4.1

## Release [0.4.x] - 2018-12-06
### Added
- Undo upgrade of postRobot. Downgrade to version 0.8.x.
- Release this version to npm.

## Release [0.3.x] - 2018-12-05
### Added
- Upgrade postRobot to version 0.9.x

## Release [0.2.3] - 2018-12-03
### Added
- Better release strategy

## Release [0.2.1] - 2018-11-30
### Added
- Allow executeAppSDKMethod available

## Release [0.1.3] - 2018-11-26
### Fixed
- Fix bug with query-string library. Downgreded it from 6->5
- query-string does not compile to es5 (since version 6)

## Release [0.1.1] - 2018-11-15
### Fixed
- Fix bug with getAppSetting sending message to more than one app

## Release [0.1.0] - 2018-11-12
### Added
- Initial release of the AppsSDK project