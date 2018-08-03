#Build stage
FROM microsoft/dotnet:2.1-sdk AS build-env
WORKDIR /build

COPY SlowSlothBudget.Api.csproj .
RUN dotnet restore

COPY . .
RUN dotnet publish -o /publish

#Runtime image stage
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /publish
COPY --from=build-env /publish .
ENTRYPOINT [ "dotnet", "SlowSlothBudget.Api.dll" ]