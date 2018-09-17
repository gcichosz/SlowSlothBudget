#!/usr/bin/env bash
dotnet test -c Release ./src/SlowSlothBudget.Web.Test/SlowSlothBudget.Web.Test.csproj
cd ./src/SlowSlothBudget.Web/ClientApp
npm test
if [[ $? -ne 0 ]] ; then
    exit 1
fi
cd $TRAVIS_BUILD_DIR