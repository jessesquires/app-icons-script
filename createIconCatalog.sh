# $1 = source path of files
# $2 = destination where assets catalog should be created
# $3 = name of the assets catalog
# #4 = destination OS (ios | watch)
#

# $1 = additional message
#
function showUsage {
  echo "createIconCatalog usage: ${1}"
  echo ""
  echo "createIconCatalog <source path> <destination path> <catalog name> [ios | watch]"
  echo ""
  echo "where:"
  echo "  <source path> is the path where the existing icon assets are located"
  echo "  <destination path> is where you want to create your icon asset catalog"
  echo "  <catalog name> is the name of your catalog. e.g. \"Assets\""
  echo "  ios | watch identifies for which OS the icon catalog is being generated"
  echo ""
}

# $1 = a relative path
function absolutePathOf {
    local target="$1"

    if [ "$target" == "." ]; then
        echo "$(pwd)"
    elif [ "$target" == ".." ]; then
        echo "$(dirname "$(pwd)")"
    else
        echo "$(cd "$(dirname "$1")"; pwd)/$(basename "$1")"
    fi
}

# check the input parameters.
#
if [ ".${#}" != ".4" ]; then
  showUsage "missing parameter(s)"
  exit
fi

if [ "${4}" != "ios" ] && [ "${4}" != "watch" ]; then
  showUsage "destination must be \"ios\" or \"watch\""
  exit
fi

if [ ! -d "${1}" ]; then
  showUsage "source path for icon assets can not be found."
  exit
fi

if [ ! -d "${2}" ]; then
  showUsage "destination path for asset catalog can not be found."
  exit
fi

# copy the source path so that its available throughout this script.
ASSET_SOURCEPATH=`absolutePathOf "${1}"`

function createContents {
  echo "{"
  echo "  \"info\" : {"
  echo "    \"version\" : 1,"
  echo "    \"author\" : \"xcode\""
  echo "  }"
  echo "}"
}

# $1 = the size of one side of the icon
# $2 = the multiplier for this icon
# $3 = the idiom (ipad | iphone | ios-marketing)
# $4 = the name of the JSON file to which we append an entry for the file.
function copyIOSAsset {
  if [ "${3}" == "ios-marketing" ]; then
    filename="Icon-${1}.png"
  elif [ "${2}" == "1x" ]; then
  	filename="Icon-${1}.png"
  else
    filename="Icon-${1}@${2}.png"
  fi

  if [ -f "${ASSET_SOURCEPATH}/${filename}" ]; then
    cp "${ASSET_SOURCEPATH}/${filename}" .
    echo "  {"                                 >> ${4}
    echo "    \"size\" : \"${1}x${1}\","       >> ${4}
    echo "    \"idiom\" : \"${3}\","           >> ${4}
    echo "    \"filename\" : \"${filename}\"," >> ${4}
    echo "    \"scale\" : \"${2}\""            >> ${4}
    if [ "${3}" == "ios-marketing" ]; then
      echo "  }"                               >> ${4}
    else
      echo "  },"                              >> ${4}
    fi
  else
    echo "Unable to find ${filename}"
  fi
}

# $1 = the size of one side of the icon
# $2 = the multiplier for this icon
# $3 = the idiom (watch | watch-marketing)
# $4 = the role
# $5 = the subtype
# $6 = the name of the JSON file to which we append an entry for the file.
function copyWatchAsset {
  if [ "${3}" == "watch-marketing" ]; then
    filename="Icon-${1}.png"
  elif [ "${2}" == "1x" ]; then
  	filename="Icon-${1}.png"
  else
    filename="Icon-${1}@${2}.png"
  fi

  if [ -f "${ASSET_SOURCEPATH}/${filename}" ]; then
    cp "${ASSET_SOURCEPATH}/${filename}" .
    echo "  {"                                 >> ${6}
    echo "    \"size\" : \"${1}x${1}\","       >> ${6}
    echo "    \"idiom\" : \"${3}\","           >> ${6}
    echo "    \"filename\" : \"${filename}\"," >> ${6}
    if [ "${3}" == "watch-marketing" ]; then
      echo "    \"scale\" : \"${2}\""          >> ${6}
      echo "  }"                               >> ${6}
    else
      echo "    \"scale\" : \"${2}\","         >> ${6}
      if [ "${5}" != "ignored" ]; then
        echo "    \"role\" : \"${4}\","        >> ${6}
        echo "    \"subtype\" : \"${5}\""      >> ${6}
      else
        echo "    \"role\" : \"${4}\""         >> ${6}
      fi
      echo "  },"                              >> ${6}
    fi
  else
    echo "Unable to find ${filename}"
  fi
}

# go to the destination path, and create (if needed) the top level asset catalog folder.
cd "${2}"
mkdir -p "${3}.xcassets/AppIcon.appiconset"

# now move into the new catalog.
cd "${3}.xcassets"

# create the top level contents for xcode.
createContents > Contents.json

# move down to our iconset
cd "AppIcon.appiconset"

# create the empty JSON file for the app icon set.
OUTFILE=Contents.json

echo "{"                           > ${OUTFILE}
echo "  \"images\" : ["           >> ${OUTFILE}

# now we need to copy each icon file from the source directory, into the icon set, and
# add an image entry to the contents file for it.
#
if [ "${4}" == "ios" ]; then
  copyIOSAsset "20" "2x" "iphone" ${OUTFILE}
  copyIOSAsset "20" "3x" "iphone" ${OUTFILE}
  copyIOSAsset "29" "2x" "iphone" ${OUTFILE}
  copyIOSAsset "29" "3x" "iphone" ${OUTFILE}
  copyIOSAsset "40" "2x" "iphone" ${OUTFILE}
  copyIOSAsset "40" "3x" "iphone" ${OUTFILE}
  copyIOSAsset "60" "2x" "iphone" ${OUTFILE}
  copyIOSAsset "60" "3x" "iphone" ${OUTFILE}
  copyIOSAsset "20" "1x" "ipad"   ${OUTFILE}
  copyIOSAsset "20" "2x" "ipad"   ${OUTFILE}
  copyIOSAsset "29" "1x" "ipad"   ${OUTFILE}
  copyIOSAsset "29" "2x" "ipad"   ${OUTFILE}
  copyIOSAsset "40" "1x" "ipad"   ${OUTFILE}
  copyIOSAsset "40" "2x" "ipad"   ${OUTFILE}
  copyIOSAsset "76" "1x" "ipad"   ${OUTFILE}
  copyIOSAsset "76" "2x" "ipad"   ${OUTFILE}
  copyIOSAsset "83.5" "2x" "ipad" ${OUTFILE}
  copyIOSAsset "1024" "1x" "ios-marketing" ${OUTFILE}
else
  copyWatchAsset "24" "2x" "watch" "notificationCenter" "38mm" ${OUTFILE}
  copyWatchAsset "27.5" "2x" "watch" "notificationCenter" "42mm" ${OUTFILE}
  copyWatchAsset "29" "2x" "watch" "companionSettings" "ignored" ${OUTFILE}
  copyWatchAsset "29" "3x" "watch" "companionSettings" "ignored" ${OUTFILE}
  copyWatchAsset "40" "2x" "watch" "appLauncher" "38mm" ${OUTFILE}
  copyWatchAsset "44" "2x" "watch" "appLauncher" "40mm" ${OUTFILE}
  copyWatchAsset "50" "2x" "watch" "appLauncher" "44mm" ${OUTFILE}
  copyWatchAsset "86" "2x" "watch" "quickLook" "38mm" ${OUTFILE}
  copyWatchAsset "98" "2x" "watch" "quickLook" "42mm" ${OUTFILE}
  copyWatchAsset "108" "2x" "watch" "quickLook" "44mm" ${OUTFILE}
  copyWatchAsset "1024" "1x" "watch-marketing" "ignored" "ignored" ${OUTFILE}
fi

echo "  ],"                       >> ${OUTFILE}
echo "  \"info\" : {"             >> ${OUTFILE}
echo "    \"version\" : 1,"       >> ${OUTFILE}
echo "    \"author\" : \"xcode\"" >> ${OUTFILE}
echo "  }"                        >> ${OUTFILE}
echo "}"                          >> ${OUTFILE}
