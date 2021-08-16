#!/bin/bash

PATH="../_actions"

DOMAIN=$1
DOMAIN_LOWERCASE=""

API="${DOMAIN}Api"
SERVICE="${DOMAIN}Service"
CONSTANTS="${DOMAIN}Constants"

FILENAME="${DOMAIN_LOWERCASE}.actions.js"
EXPORT="export * from './${DOMAIN_LOWERCASE}.actions'"

cd "$PATH"

echo "
import { "$CONSTANTS" } from "../_constants";
import { "$SERVICE" } from "../_services";

export const "$ACTION" = {
    getList,
    getOne,
    createOne,
    updateOne,
    deleteOne
}

function getList(params) {
    return dispatch => {
        dispatch(request());

        "$SERVICE".getList(params)
            .then(
                contents => {
                    dispatch(success(contents));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: "$CONSTANTS".GET_LIST_REQUEST } }
    function success(contents) { return { type: "$CONSTANTS".GET_LIST_SUCCESS, contents } }
    function failure(error) { return { type: schoolnoteConstants.GET_LIST_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        "$SERVICE".getOne(id)
            .then(
                content => {
                    dispatch(success(content));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: "$CONSTANTS".GET_ONE_REQUEST } }
    function success(content) { return { type: "$CONSTANTS".GET_ONE_SUCCESS, content } }
    function failure(error) { return { type: "$CONSTANTS".GET_ONE_FAILURE, error } }
}

function createOne(data,options) {
    return dispatch => {
        dispatch(request());

        "$SERVICE".createOne(data,options)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: "$CONSTANTS".CREATE_ONE_REQUEST } }
    function success(result) { return { type: "$CONSTANTS".CREATE_ONE_SUCCESS, noteDetails } }
    function failure(error) { return { type: "$CONSTANTS".CREATE_ONE_FAILURE, error } }
}

function updateOne(id, data) {
    return dispatch => {
        dispatch(request());

        "$SERVICE".updateOne(id,data)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: "$CONSTANTS".UDATE_ONE_REQUEST } }
    function success(result) { return { type: "$CONSTANTS".UDATE_ONE_SUCCESS, result } }
    function failure(error) { return { type: "$CONSTANTS".UDATE_ONE_FAILURE, error } }
}

function deleteOne(id) {
    return dispatch => {
        dispatch(request());

        "$SERVICE".deleteOne(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: "$CONSTANTS".DELETE_ONE_REQUEST } }
    function success(result) { return { type: "$CONSTANTS".DELETE_ONE_SUCCESS, result } }
    function failure(error) { return { type: "$CONSTANTS".DELETE_ONE_FAILURE, error } }
}
" > "$FILENAME"

echo "$EXPORT" >> index.js