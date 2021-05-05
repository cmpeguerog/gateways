#!/bin/bash

if [ -f "/.exit" ]; then
  echo "Data already imported into MongoDB"
  exit 0
elif [ -f "./.exist" ]; then
  echo "Data already imported into MongoDB"
  exit 0
fi

for file in /tmp/scripts/*.json; do
  echo "Inserting file " $file
  mongoimport --host mongo --db gateway --collection peripherals --type json --file $file --jsonArray
done

echo "data imported" >> .exist

