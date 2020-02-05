#!/usr/bin/env bash
figlet "code review"
#npm i
CURRENT_TAG=$(echo $CI_COMMIT_REF_NAME | sed -e 's/\//-/g')
echo '$$$$$$$$$$$$$$$$$$$$ sonarqube token' $SONARQUBE_TOKEN
sonar-scanner -Dproject.settings=./sonar-project.properties -Dsonar.login=$SONARQUBE_TOKEN -Dsonar.projectName=CIO-FORUM-BACKEND[$CI_COMMIT_REF_NAME] -Dsonar.projectKey=CIO-FORUM-BACKEND-$CURRENT_TAG
