#!/bin/bash

DIR_PATH="../Pages"

PAGE_NAME=$1
FILE_NAME="$PAGE_NAME.jsx"

EXPORT="export * from './$PAGE_NAME';"

cd "$DIR_PATH"

mkdir "$PAGE_NAME"

cd "$PAGE_NAME"

echo "import React from 'react';

function "${PAGE_NAME}"() {
  return <div>$PAGE_NAME has been created by gen_script</div>;
}

export { "${PAGE_NAME}" };

" > "$FILE_NAME"

# index js file을 생성하고 생성된파일에 jsx file을 export 한다.
echo "$EXPORT" > index.js

# 상위폴더로 올라간다.
cd ..

# Pages folder의 index.js에 생성된 페이지를 등록한다.
echo "$EXPORT" >> index.js