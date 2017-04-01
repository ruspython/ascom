#!/bin/bash

# Use: command.bash [branchName|revision]

# This script used for load latest changed for landing project and restart node

# It's have 1 argument - branch name for fetch checkout and pull latest changes
# for update repos and start project on latest master branch: command.bash master
# Like argument you can use revision too, errors can happends but it's ok. error in git pull revision
#
# It's not done yet, but work on server to easy restart
#
# Use only on landing server. not for local use.
# Project on server must consist of:
# ~projects/proxy-landing
# ~projects/soshace
# ~projects/soshace-ru
# And script must be in ~/ directory
# Script use ssh keys for have access to github without passwords
# and use ~/.ssh/config file with host github.com and user, key properties

if ! [[ -z $1 ]]; then
	_REVISION=$1
	echo "Git will be checkout using revision: $_REVISION"
fi

_PROJECT_FOLDER="projects"
_ROOT_PROJECT_FOLDER="$(pwd)/$_PROJECT_FOLDER"
_PROXY_FOLDER="proxy-landing"
_FOLDERS_TO_PULL="soshace soshace-ru"

_REPO="git@github.com:soshace/soshace-landing-keystone"

_FETH_COMMAND="git fetch --all"
_PULL_LANDING_COMMAND="git pull"
_CHECKOUT_LANDING_COMMAND="git checkout $_REVISION"
_GULP_COMMAND="./node_modules/.bin/gulp prod"
_FOREVER_PROXY_COMMAND="forever start app.js"
_FOREVER_KEYSTONE_COMMAND="forever start keystone.js"

cd $_PROJECT_FOLDER

# pull landing projects
for repo_folder in $_FOLDERS_TO_PULL; do
	cd $repo_folder

	eval $_FETH_COMMAND 2>/dev/null

	echo -e "\n>>>>>>>>>>>>>>\nCurrent revision:\n$(git log -1)\n>>>>>>>>>>>>>>>>>>\n"
	if ! [[ -z $_REVISION ]]; then
		eval $_CHECKOUT_LANDING_COMMAND 2>/dev/null
		eval $_PULL_LANDING_COMMAND 2>/dev/null
		echo -e "\n>>>>>>>>>>>>>>\nCurrent revision after checkout:\n$(git log -1)\n>>>>>>>>>>>>>>>>>>\n"
	fi

	eval $_GULP_COMMAND
	cd $_ROOT_PROJECT_FOLDER
done

forever stopall

# start proxy
cd $_PROXY_FOLDER
# sudo -k $_FOREVER_PROXY_COMMAND
eval $_FOREVER_PROXY_COMMAND

cd $_ROOT_PROJECT_FOLDER

# start landing projects
for repo_folder in $_FOLDERS_TO_PULL; do
	cd $repo_folder

	eval $_FOREVER_KEYSTONE_COMMAND

	cd $_ROOT_PROJECT_FOLDER
done

