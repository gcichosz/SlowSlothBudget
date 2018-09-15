#!/usr/bin/env bash
dotnet build -c Release ./src/SlowSlothBudget.Web.sln
cd ./src/SlowSlothBudget.Web/ClientApp
npm run build
cd $TRAVIS_BUILD_DIR
dotnet test -c Release ./src/SlowSlothBudget.Web.Test/SlowSlothBudget.Web.Test.csproj
cd ./src/SlowSlothBudget.Web/ClientApp
npm test