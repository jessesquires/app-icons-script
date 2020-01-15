# app-icons-script

*Photoshop script to generate all iOS and macOS app icons*

Make one 1024x1024 App Icon, let this script [automate](http://xkcd.com/1319/) the rest.

This script will create all of your app icon images from a single 1024x1024 "iTunesArtwork" PNG. It saves icons in **PNG-24** using *Save For Web* and removes metadata. The generated PNGs are named with the following scheme: `Icon-<size><density>.png`, for example `Icon-60@2x.png`.

> 💡 **Note:** 
>
> These instructions (and install script) are for **Photoshop CC 2019**. 
>
> For a different version, simply edit the `VERSION` [variable in the script](https://github.com/jessesquires/app-icons-script/blob/master/install.sh#L3).

## Installation

```bash
$ git clone https://github.com/jessesquires/app-icons-script.git
$ cd app-icons-script/
$ [sudo] ./install.sh
```

## Usage

1. Open Photoshop CC (may require restart if open during install)
2. Select script from `File > Scripts` menu
3. Follow the dialog prompts
4. :tada: :beer:

## :warning: Warning! :warning:

This script **does not handle naming collisions**, it will overwrite any existing files with the same names in the destination directory.

## Additional script for Asset Catalog Creation.

An additional bash script has been added that you can use to take the output from either the iOS or watchOS photoshop script, and create a complete AppIcon asset catalog, ready to import directly into your Xcode project.

So, once you've run the photoshop script to create your iOS or watchOS icons, you can create an asset catalog like this:

** iOS Asset Catalog **

Assuming you're in the same directory as the directory containing the icons (which, for this example, we've called `iosicons`), and the script is in the same directory:

`./createIconCatalog.sh iosicons . phoneAppIcon ios`

This will create an asset catalog called `phoneAppIcon.xcassets` in the same directory, having copied all of the icons into the right place, and generating the appropriate JSON files.

** watchOS Asset Catalog **

Assuming you're in the same directory as the directory containing the icons (which, for this example, we've called `watchosicons`), and the script is in the same directory:

`./createIconCatalog.sh watchosicons . watchAppIcon watch`

This will create an asset catalog called `watchAppIcon.xcassets` in the same directory, having copied all of the icons into the right place, and generating the appropriate JSON files.

## Documentation

* Adobe [Photoshop JavaScript Reference](http://www.adobe.com/devnet/photoshop/scripting.html)

* Apple Human Interface Guidelines: 
    * [iOS Icon and Image Sizes](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/)
    * [macOS Icon and Image Sizes](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/app-icon/)

## Credits

Modified and maintained by [@jessesquires](https://github.com/jessesquires)

Original [script](https://gist.github.com/mattdipasquale/711203) by [@mattdipasquale](https://github.com/mattdipasquale)

Later [modified](https://gist.github.com/appsbynight/3681050) by [@appsbynight](https://github.com/appsbynight)
