#!/usr/bin/env bash
cd ./src/SlowSlothBudget.Web/publish
zip -r publish.zip .
curl -X POST -u $AZURE_WA_USERNAME:$AZURE_WA_PASSWORD --data-binary @"./publish.zip" https://$AZURE_WA_SITE.scm.azurewebsites.net/api/zipdeploy