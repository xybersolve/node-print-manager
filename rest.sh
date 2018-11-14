#!/usr/bin/env bash
# ================================================================
# -*- mode: bash -*-
# vi: set ft=sh
# ****************************************************************
#
# DESCRIPTION
#    Script template for full bodied script
#
# SYNTAX & EXAMPLES
#    See 'SYNTAX' (below)
#
# ----------------------------------------------------------------
# IMPLEMENTATION
#    version         script 0.1.1
#    author          Greg Milligan
#    copyright       Copyright (c) 2018 http://xybersolve.io
#    license         GNU General Public License
#
# ================================================================
#  DEBUG OPTION
#    set -n  # Uncomment to check your syntax, without execution.
#    set -x  # Uncomment to debug this shell script
#
# ---------------------------------------------------------------
#
# TODO:
# ****************************************************************


# ---------------------------------------
# CONFIGFURATION
# ---------------------------------------
# strict environment
set -o errexit  # exit on command error status
set -o nounset  # no unreadonlyd variables
set -o pipefail # failr on pipe failures
trap 'echo "Aborting due to errexit on line $LINENO. Exit code: ${?}" >&2' ERR

# ---------------------------------------
# GLOBAL VARIABLES
# ---------------------------------------
# booleans
declare -ir TRUE=1
declare -ir FALSE=0
# script info

declare -r PROGNAME="$(basename ${0})"
declare -r VERSION=0.0.1
declare -r SUBJECT=""
declare -r KEYS=""
declare -ri MIN_ARG_COUNT=1
declare -r SYNTAX=$(cat <<EOF

    Script: ${PROGNAME}
    Purpose:
    Usage: ${PROGNAME} [options]

    Options:
      --help:  help and usage
      --version: show version info

      --images: Get all images
      --image[=id]: Get image by id (or default)

EOF
)
# files & directories
declare -r SCRIPT_DIR="$( dirname ${0} )"

# actions
declare -i IMAGES=${FALSE}

# script globals
# immutable
declare -r HTTP_PORT=7070
declare -r REST_BASE='api/v1'
declare -r HTTP_URL="http://localhost:${HTTP_PORT}"
declare -r REST_URL="${HTTP_URL}/${REST_BASE}"

# mutable
declare IMAGE_ID=63

# ---------------------------------------
# COMMON FUNCTIONS
# ---------------------------------------
usage() {
  echo "${SYNTAX}"
}

error() {
  printf "\n%s\n" "Error: ${1}"
}

die() {
  error "${1}"
  usage
  printf "\n\n"
  exit "${2:-1}"
}

show_version() {
  printf "\n\n%s  %s\n\n\n" "${PROGNAME}" "${VERSION}"
  exit 0
}

show_help() {
  printf "\n\n"
  usage
  printf "\n\n"
  exit 0
}

# ---------------------------------------
# MAIN ROUTINES
# ---------------------------------------
#
# -D-: indlcude headers
#
__get_images() {

  curl \
    --header "Content-type: application/json" \
    --request GET \
    -D- \
    "${REST_URL}/images/"
}

__get_image() {

  curl \
    --header "Content-type: application/json" \
    --request GET \
    -D- \
    "${REST_URL}/images/${IMAGE_ID}"

}

__add_image() {
  curl \
    --header "Content-type: application/json" \
    --request POST \
    --data '{"title": "Test Title", "note": "Test note"}' \
    -D- \
    "${REST_URL}/images/"
}
__delete_image() {
  local id=3
  curl \
    --header "Content-type: application/json" \
    --request DELETE \
    -D- \
    "${REST_URL}/images/${id}"
}

__update_image() {
  curl \
    --header "Content-type: application/json" \
    --request PUT \
    --data '{"id": 100, "title": "Test Title", "note": "Test note"}' \
    -D- \
    "${REST_URL}/images"
}

__get_opts() {
  while (( $# > 0 )); do
    local arg="${1}"; shift;
    case ${arg} in
      --help)    show_help                ;;
      --version) show_version             ;;
      --images)          IMAGES=${TRUE}   ;;
      --image*)
        IMAGE=${TRUE}
        [[ ${arg} =~ '=' ]] && IMAGE_ID="${arg#*=}"
        ;;
      --data*)
        [[ ${arg} =~ '=' ]] && DATA="${arg#*=}"
        ;;
      *) die "Unknown option: ${arg}" ;;
   esac
  done
  return 0
}

__dispatch() {
  (( IMAGES )) && __get_images
  (( IMAGE )) && __get_image
  return 0
}

main() {
  (( ${#} < MIN_ARG_COUNT )) && die "Expects at least ${MIN_ARG_COUNT} arguments" 1
  (( $# > 0 )) && __get_opts "$@"

  __dispatch

  return 0
}
(( ${#} > 0 )) && main "${@}" || main