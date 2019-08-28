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

## Documentation

* Adobe [Photoshop JavaScript Reference](http://www.adobe.com/devnet/photoshop/scripting.html)

* Apple Human Interface Guidelines: 
    * [iOS Icon and Image Sizes](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/)
    * [macOS Icon and Image Sizes](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/app-icon/)

## Credits

Modified and maintained by [@jessesquires](https://github.com/jessesquires)

Original [script](https://gist.github.com/mattdipasquale/711203) by [@mattdipasquale](https://github.com/mattdipasquale)

Later [modified](https://gist.github.com/appsbynight/3681050) by [@appsbynight](https://github.com/appsbynight)
