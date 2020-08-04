#!/bin/bash

COMPATIBLE_VERSIONS=(
  'CC 2019'
  '2020'
)

matched=false
valid_dirs=()
for version in "${COMPATIBLE_VERSIONS[@]}"; do
  DIR="/Applications/Adobe Photoshop ${version}/Presets/Scripts/"
  if [[ -d $DIR ]];then
    matched=true
    valid_dirs+=("$DIR")
  fi
done

if [ $matched == false ];then
  echo "ERROR: Could not find a compatible Photoshop directory"
  exit 1
fi

for dir in "${valid_dirs[@]}"; do 
  if [ -w "$dir" ]; then 
    echo "Copying scripts to $dir ..."
    cp *.jsx "$dir"
  else
    echo "ERROR: Unable to write to $dir"
  fi
done

echo "Done! 🎉"
