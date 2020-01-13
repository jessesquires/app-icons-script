/*
	Photoshop script to generate all iOS App Icon PNGs
	https://github.com/jessesquires/iOS-icons-script

	See included README and LICENSE for details.

	Modifications 
		Copyright (c) 2014 Jesse Squires
		Copyright (c) 2012 Josh Jones

	Copyright (c) 2010 Matt Di Pasquale
*/

//	Turn debugger on
//	0 is off.
// 	$.level = 1;

var initialPrefs = app.preferences.rulerUnits;

function main() {
	//	prompt user to select source file, cancel returns null
	var sourceFile = File.openDialog("Select a PNG file that is 1024x768.", "*.png", false);
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

	if (doc.width < 1024 || doc.height < 768) {
		alert("What the fuck is this?!\nImage failed validation. Please select a PNG file that is at least 1024x768.");
		restorePrefs();
		return;
	}

	//	folder selection dialog
	var destFolder = Folder.selectDialog("Choose an output folder.\n*** Warning! ***\nThis will overwrite any existing files with the same name in this folder.");
	if (destFolder == null) {
		// user canceled
		restorePrefs();
		return;
	}

	//	save icons in PNG-24 using Save for Web
	var saveForWeb = new ExportOptionsSaveForWeb();
	saveForWeb.format = SaveDocumentType.PNG;
	saveForWeb.PNG8 = false;
	saveForWeb.transparency = false;

	//	delete metadata
	doc.info = null;
	
	var icons = [
	   {"name": "icon", "w":1024, "h":768},
        
	   {"name": "messages", "w":27, "h":20},
	   {"name": "messages@2x", "w":54, "h":40},
	   {"name": "messages@3x", "w":81, "h":60},
        
	   {"name": "messages-2", "w":32, "h":24},
	   {"name": "messages-2@2x", "w":64, "h":48},
	   {"name": "messages-2@3x", "w":96, "h":72},
        
	   {"name": "iphone-settings@2x", "w":58, "h":58},
	   {"name": "iphone-settings@3x", "w":87, "h":87},
        
	   {"name": "iphone@2x", "w":120, "h":90},
	   {"name": "iphone@3x", "w":180, "h":135},
        
       {"name": "ipad-settings", "w":29, "h":29},
	   {"name": "ipad-settings@2x", "w":58, "h":58},
        
	   {"name": "ipad", "w":67, "h":50},
	   {"name": "ipad@2x", "w":134, "h":100},
        
	   {"name": "ipad-pro@2x", "w":148, "h":110},
	];

	var initialState = doc.activeHistoryState; 

	for (var i = 0; i < icons.length; i++) {
		var eachIcon = icons[i];

		doc.resizeImage(eachIcon.w, eachIcon.h, null, ResampleMethod.BICUBICSHARPER);

		var destFileName = eachIcon.name + ".png";

		if (eachIcon.name == "iTunesArtwork@2x" || eachIcon.name == "iTunesArtwork") {
			// iTunesArtwork files don't have an extension
			destFileName = eachIcon.name;
		}

		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, saveForWeb);

		// undo resize
		doc.activeHistoryState = initialState;
	}

	alert("Success!\nAll iOS icons created and saved. Fuck yeah. 🎉 🍺");

	doc.close(SaveOptions.DONOTSAVECHANGES);
	
	restorePrefs();
}

function restorePrefs() {
	app.preferences.rulerUnits = initialPrefs;
}

main();

