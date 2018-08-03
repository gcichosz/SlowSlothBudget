#Build stage
FROM microsoft/dotnet:2.1-sdk AS build-env
WORKDIR /build

RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

COPY SlowSlothBudget.Web.csproj .
RUN dotnet restore

COPY . .
RUN ls ClientApp -a
RUN dotnet publish -o /publish

#Runtime image stage
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /publish
COPY --from=build-env /publish .
ENTRYPOINT [ "dotnet", "SlowSlothBudget.Web.dll" ]