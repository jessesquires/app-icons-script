/*
    Photoshop script to generate all iOS app icon PNGs
    https://github.com/jessesquires/app-icons-script

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
    var sourceFile = File.openDialog("Select a 1:1 sqaure PNG file that is at least 1024x1024.", "*.png", false);
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

    if (doc.width != doc.height || doc.width < 1024 || doc.height < 1024) {
        alert("What the fuck is this?!\nImage failed validation. Please select a 1:1 sqaure PNG file that is at least 1024x1024.");
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
        {"name": "icon_1024", "size":1024},
        {"name": "icon_512", "size":512},

        {"name": "icon_29", "size":29},
        {"name": "icon_29@2x", "size":58},
        {"name": "icon_29@3x", "size":87},

        {"name": "icon_20", "size":20},
        {"name": "icon_20@2x", "size":40},
        {"name": "icon_20@3x", "size":60},

        {"name": "icon_40", "size":40},
        {"name": "icon_40@2x", "size":80},
        {"name": "icon_40@3x", "size":120},

        {"name": "icon_50", "size":50},
        {"name": "icon_50@2x", "size":100},

        {"name": "icon_57", "size":57},
        {"name": "icon_57@2x", "size":114},

        {"name": "icon_60@2x", "size":120},
        {"name": "icon_60@3x", "size":180},

        {"name": "icon_72", "size":72},
        {"name": "icon_72@2x", "size":144},

        {"name": "icon_76", "size":76},
        {"name": "icon_76@2x", "size":152},

        {"name": "icon_120", "size":120},

        {"name": "icon_83.5@2x", "size":167},
    ];

    var initialState = doc.activeHistoryState;

    for (var i = 0; i < icons.length; i++) {
        var eachIcon = icons[i];

        doc.resizeImage(eachIcon.size, eachIcon.size, null, ResampleMethod.BICUBICSHARPER);

        var destFileName = eachIcon.name + ".png";

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
