#!/bin/bash

for FOLDER in "_actions" "_api" "_constants" "_services" "_helpers" "_reducers" "_styles" "_components";
do
        cd ..

        mkdir  "${FOLDER}"
        
        cd "${FOLDER}"

        echo "export * from './'" > index.js

done

# Rollback code
# for FOLDER in "_actions" "_api" "_constants" "_services" "_helpers" "_reducers" "_styles";                             
# do                          
#  rm -rvf "${FOLDER}"      
# done