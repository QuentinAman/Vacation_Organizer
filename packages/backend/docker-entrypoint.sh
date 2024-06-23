#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

/usr/src/app/wait-for-it.sh "db:5432"

# Run the main container command.
exec "$@"