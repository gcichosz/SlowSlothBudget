#!/usr/bin/env bash
dotnet build -c Release ./src/SlowSlothBudget.Web.sln
dotnet test -c Release ./src/SlowSlothBudget.Web.Test/SlowSlothBudget.Web.Test.csproj
cd ./src/SlowSlothBudget.Web/ClientApp
npm test
npm run build
cd $TRAVIS_BUILD_DIR