#!/bin/bash

PATH="../_apis"

DOMAIN=$1
FILENAME="${DOMAIN}.api.js"

EXPORT="export * from './${DOMAIN}.api'"
API="${DOMAIN}Api"


#src로 시작해서 _api폴더에 다음 서비스를 생성한다.
cd "$PATH"

echo "
import BaseApi from './base.api';

// 변수로 받은 이름을 넣어 api를 생성한다.
export const "$API" = {
    getList,
    getOne,
    createOne,
    updateOne,
    deleteOne
}

function getList(url,params){
  return BaseApi.get(url, {params: params});
}

function getOne(url,id){
  return BaseApi.get(`${url}/${id}`);
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
function createOne(url,data,options){
  return BaseApi.post(`${url}`, data, options);
}

function updateOne(url, id, data, options){
  return BaseApi.put(`${url}/${id}`, data, options);
}

function deleteOne(url,id){
  return BaseApi.delete(`${url}/${id}`);
}
" > "$FILENAME"

echo "$EXPORT" > index.js