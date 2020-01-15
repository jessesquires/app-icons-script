/*
    Photoshop script to generate all iOS App Icon PNGs
    https://github.com/jessesquires/iOS-icons-script

    See included README and LICENSE for details.

    Modifications
        Copyright (c) 2014 Jesse Squires
        Copyright (c) 2012 Josh Jones

    Copyright (c) 2010 Matt Di Pasquale
*/

//  Turn debugger on
//  0 is off.
//  $.level = 1;

var initialPrefs = app.preferences.rulerUnits;

function main() {
    //  prompt user to select source file, cancel returns null
    var sourceFile = File.openDialog("Select a 1:1 sqaure PNG file that is at least 618x618.", "*.png", false);
    if (sourceFile == null)  {
        // user canceled
        return;
    }

    var doc = open(sourceFile, OpenDocumentType.PNG);
    if (doc == null) {
        alert("Oh shit!\nSomething is wrong with the file. Make sure it is a valid PNG file.");
        return;
    }

    app.preferences.rulerUnits = Units.PIXELS;

    if (doc.width != doc.height || doc.width < 618 || doc.height < 618) {
        alert("What the fuck is this?!\nImage failed validation. Please select a 1:1 sqaure PNG file that is at least 618x618.");
        restorePrefs();
        return;
    }

    //  folder selection dialog
    var destFolder = Folder.selectDialog("Choose an output folder.\n*** Warning! ***\nThis will overwrite any existing files with the same name in this folder.");
    if (destFolder == null) {
        // user canceled
        restorePrefs();
        return;
    }

    //  save icons in PNG-24 using Save for Web
    var saveForWeb = new ExportOptionsSaveForWeb();
    saveForWeb.format = SaveDocumentType.PNG;
    saveForWeb.PNG8 = false;
    saveForWeb.transparency = false;

    //  delete metadata
    doc.info = null;

    var icons = [
        {"name": "sticker_100@3x", "size":300},
        {"name": "sticker_136@3x", "size":408},
        {"name": "sticker_206@3x", "size":618},
    ];

    var initialState = doc.activeHistoryState;

    for (var i = 0; i < icons.length; i++) {
        var eachIcon = icons[i];

        doc.resizeImage(eachIcon.size, eachIcon.size, null, ResampleMethod.BICUBICSHARPER);

        var destFileName = eachIcon.name + ".png";

        if (eachIcon.name == "iTunesArtwork@2x" || eachIcon.name == "iTunesArtwork") {
            // iTunesArtwork files don't have an extension
            destFileName = eachIcon.name;
        }

        doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, saveForWeb);

        // undo resize
        doc.activeHistoryState = initialState;
    }

    alert("Success!\nAll iOS icons created and saved. Fuck yeah.");

    doc.close(SaveOptions.DONOTSAVECHANGES);

    restorePrefs();
}

function restorePrefs() {
    app.preferences.rulerUnits = initialPrefs;
}

main();
