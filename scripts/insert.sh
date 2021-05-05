#!/bin/bash
for file in /tmp/scripts/*.json; do
  echo "Inserting file " $file
  mongoimport --host mongo --db gateway --collection peripherals --type json --file $file --jsonArray
done

