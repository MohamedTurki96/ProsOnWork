#!/bin/bash

script_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

FOLDER="$script_dir/../src/api/"
TARGET="${1:-main}"
NAME="index"
URL="http://localhost:4000/docs/docs.json"

# TARGET aliases
case "$TARGET" in
    main)
        URL="http://localhost:4000/docs/docs.json"
        NAME="index"
        ;;
    file)
        URL="http://localhost:4002/docs/docs.json"
        NAME="file"
        ;;
    *)
        echo "Error: Invalid TARGET argument. Use 'main', or 'file'."
        exit 1
        ;;
esac


npx swagger-typescript-api -p "$URL" -o "$FOLDER" -n "$NAME.ts" --extract-enums --unwrap-response-data --single-http-client --module-name-first-tag
npx prettier --write "$FOLDER"
