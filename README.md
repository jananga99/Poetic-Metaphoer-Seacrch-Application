# Poetic Metaphor Search Application

Welcome to the Poetic Metaphor Search Application, a Node.js application built with Express. This application provides a simple and efficient way to search for metaphors in a collection of poems stored in an Elasticsearch.

## Prerequisites
Before running the Poetic Metaphor Search Application, you need to have Elasticsearch installed and indexed with the provided data. Follow these steps to set up Elasticsearch:

### Install ElsticSearch
1. Download and install Elasticsearch following the official [Elasticsearch installation guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html).

### Index ElasticSearch
1. Set the Elasticsearch home directory and elastic search password as environment variables. Replace `ES_HOME` and `ES_HOME` with your Elasticsearch installation path:
```bash
export ES_HOME="/path/to/your/elasticsearch"
export ELASTIC_PASSWORD="your_elasticsearch_password"
```
2. Create the poems index and set up the mapping using curl. This command assumes you have the required mapping file in your project's search_data directory and you are in the search_data directory:
```bash
curl --cacert "$ES_HOME/config/certs/http_ca.crt" -u elastic:$ELASTIC_PASSWORD -X PUT "https://localhost:9200/poems?pretty" -H "Content-Type: application/json" -d @search_data/mapping_file.json
```

3. Import data into the poems index using curl. This command assumes you have the data file in your project's search_data directory and you are in that directory:
```bash
curl --cacert "$ES_HOME/config/certs/http_ca.crt" -X POST "https://localhost:9200/poems/_bulk?pretty" -H "Content-Type: application/json" -u elastic:$ELASTIC_PASSWORD --data-binary @search_data/data_file.json
```

By following these steps, you'll have Elasticsearch set up and indexed with the necessary data to use with the Poetic Metaphor Search Application.


## Installation
1. Install the required npm modules
```bash
npm install
```

## Environmental Configuration
To configure the application with your Elasticsearch credentials, you need to create a .env file based on the provided .env.example. This file will contain your Elasticsearch connection details and authentication credentials.

1. Create a .env file in the root of the project directory:
```bash
touch .env
```

2. Open the .env file using a text editor and add the following information:
```bash
ELASTIC_USERNAME=your_elasticsearch_username
ELASTIC_PASSWORD="your_elasticsearch_password"
ELASTIC_SEARCH_URL=your_elasticsearch_search_url
```
Replace your_elasticsearch_username, your_elasticsearch_password, and your_elasticsearch_search_url with your Elasticsearch credentials and the appropriate search URL.

## Running The Application
With the dependencies installed and the environment configured, you can now start the Poetic Metaphor Search Application. Run the following command to start the server:
```bash
npm start
```

The application will start and be accessible at http://localhost:3000. You can access the web application through your web browser to search for metaphors in the poems stored in your Elasticsearch.
