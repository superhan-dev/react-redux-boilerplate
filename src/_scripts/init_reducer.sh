#!/bin/bash

PATH="../_reducers"

DOMAIN=$1
CONSTANTS="${DOMAIN}Constants"
FILENAME="${DOMAIN}.reducer.js"


EXPORT="import { $DOMAIN } from './$DOMAIN.reducer'"

cd "$PATH"

echo "
import { "$CONSTANTS" } from '../_constants';

export function "$DOMAIN"(state = {}, action)
  switch(action.type){
    case "$CONSTANTS".GET_LIST_REQUEST: 
      return {};
    case "$CONSTANTS".GET_LIST_SUCCESS: 
      return {};
    case "$CONSTANTS".GET_LIST_FAILURE: 
      return {};
    case "$CONSTANTS".GET_ONE_REQUEST: 
      return {};
    case "$CONSTANTS".GET_ONE_SUCCESS: 
      return {};
    case "$CONSTANTS".GET_ONE_FAILURE: 
      return {};
    case "$CONSTANTS".CREATE_ONE_REQUEST: 
      return {};
	  case "$CONSTANTS".CREATE_ONE_SUCCESS: 
			return {};
		case "$CONSTANTS".CREATE_ONE_FAILURE: 
			return {};
		case "$CONSTANTS".UPDATE_ONE_REQUEST: 
			return {};
		case "$CONSTANTS".UPDATE_ONE_SUCCESS: 
			return {};
		case "$CONSTANTS".UPDATE_ONE_FAILURE: 
			return {};
		case "$CONSTANTS".DELETE_ONE_REQUEST: 
			return {};
		case "$CONSTANTS".DELETE_ONE_SUCCESS: 
			return {};
		case "$CONSTANTS".DELETE_ONE_FAILURE: 
			return {};
    default:
	    return state;
  }
}
" > "$FILENAME"

echo "${EXPORT}" > index.js