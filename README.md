# Architecture of Application
 For to view an image of architecture of application, you can see https://drive.google.com/open?id=1ZbhRVMi4hDBapIARPaA0Umzky96fPe1f

# Steps to follow for the lifting of the application PapinotasStudents

## Requirements

- Ruby: `v2.6.1`
- Rails: `v5.2.2`
- PG: `v9.6+`
- Elasticsearch `v6.7`
- Redis `v5.0.5`

In the case of not having installed the specified versions of ruby, rails and postgresql, you can follow the installation steps from the following url https://gorails.com/setup/ubuntu/19.04

## Instalation of Elasticsearch & Redis

### 1. Elasticsearch

- Elasticsearch requires at least Java 8. Specifically as of this writing, it is recommended that you use the Oracle JDK version 1.8.0_131. Java installation varies from platform to platform so we won’t go into those details here. Oracle’s recommended installation documentation can be found on Oracle’s website. Suffice to say, before you install Elasticsearch, please check your Java version first by running (and then install/upgrade accordingly if needed):
- java -version
- If you do not have installed Java, you can follow the instalations steps from https://websiteforstudents.com/how-to-install-oracle-java-jdk8-on-ubuntu-16-04-17-10-18-04-desktops/

##### Once installed java, we continue with the installation of elasticsearch

In a console, run the following commands

- `curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.7.2.tar.g`
- `tar -xvf elasticsearch-6.7.2.tar.gz`
- `cd elasticsearch-6.7.2/bin`
- `./elasticsearch`
- visit in the browser localhost:9200, the following should appear

```json
{
  "name": "6okLiKK",
  "cluster_name": "elasticsearch",
  "cluster_uuid": "jF0-QxrqRhmwRre77aPxuQ",
  "version": {
    "number": "6.7.0",
    "build_flavor": "default",
    "build_type": "deb",
    "build_hash": "8453f77",
    "build_date": "2019-03-21T15:32:29.844721Z",
    "build_snapshot": false,
    "lucene_version": "7.7.0",
    "minimum_wire_compatibility_version": "5.6.0",
    "minimum_index_compatibility_version": "5.0.0"
  },
  "tagline": "You Know, for Search"
}
```

### 2. Redis

- download redis from http://download.redis.io/releases/redis-5.0.5.tar.gz
- unzip the downloaded file
- in a console access the path of the redis folder
- inside the redis folder, run `src/redis-server`

## Cloning and project preparation

- cloning project with `git clone git@github.com:eliascaceresy/PapinotaStudents.git`
- In a console access to the project folder
- run `bundle install`
- run `rails db:create db:migrate`
- run `gem install mailcatcher`
- run `mailcatcher`
- in a browser visit http://127.0.0.1:1080/ to see some emails that are sent from the platform

## Raising the server

- In a new console, access to the project folder and run `rails s`
- In a new console, access to the project folder and run `./bin/webpack-dev-server`
- In a new console, access to the project folder and run `bundle exec sidekiq`
- In a browser visit http://localhost:3000/
