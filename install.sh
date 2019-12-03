#!/bin/bash

VERSIONS=(
  'CC 2019'
  '2020'
)

for v in "${VERSIONS[@]}";do
  VERSION=$v
  DIR="/Applications/Adobe Photoshop $VERSION/Presets/Scripts/"
  if [[ -d $DIR ]];then
    break
  fi
done

if [[ ! -d $DIR ]];then
  echo "ERROR: Could not find Photoshop directory"
  exit 1
fi

echo "Copying scripts to $DIR ..."

cp *.jsx "$DIR"

echo "Done! 🎉"
