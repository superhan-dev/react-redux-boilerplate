#!/bin/bash

PATH="../_services"

DOMAIN=$1

FILENAME="${DOMAIN}.service.js"
EXPORT="export * from ./${DOMAIN}.service"

API="${DOMAIN}Api"
SERVICE="${DOMAIN}Service"

#src로 시작해서 _services폴더에 다음 서비스를 생성한다.
cd "$PATH"

echo "
import { "$API", handleResponse } from "../_apis";

export const "$SERVICE" = {
    getList,
    getOne,
    createOne,
    updateOne,
    deleteOne
}

function getList(params){
   return "$API"
      .getList(params)
      .then( handleResponse )
      .then( contents => {  
          return contents;
      });
}

function getOne(url,id){
  return "$API"
      .getOne(id)
      .then( handleResponse )
      .then( content => {  
          return content;
      });
}

/*
        * options로 formdata와 같은 설정을 할 수 있다.
        * ex)
        * options: {
        *   headers: {
        *     'Content-Type' : 'multipart/form-data'
        *   }
        * }
 */
function createOne(data,options){
	return "$API"
      .createOne(data,options)
      .then( handleResponse )
      .then( result => {  
          return result;
      });
}

function updateOne(id, data, options){
	return "$API"
      .updateOne(id, data, options)
      .then( handleResponse )
      .then( result => {  
          return result;
      });
}

function deleteOne(id){
 
	return "$API"
      .deleteOne(id)
      .then( handleResponse )
      .then( result => {  
          return result;
      });
}

" > "$FILENAME"

echo "$EXPORT" >> index.js