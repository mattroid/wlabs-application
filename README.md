# Walmart Challenge!
### What is the challenge?
Given a list of product Id's

Produce a REST API to search keywords on product descriptions

Get information on products from the Walmart Product API. 

Don't make parallel requests to the api due to rate limiting 


### Solution
##### The API Service
simple hapi server 

GET /search?query=backpack

Returns JSON:
```javascript
{
  items: [
    { id: 35613901 }
  ]
}
```

Querying requires searching on product meta data. This means that the API needs
to have access to the meta data objects being indexed. Pulling down meta data
from the list of products and indexing it.

This list is guaranteed to be update to date because of our cache sync mechanism

The API is protected from rate limiting because of the request queuing service

##### The UI

The API is published with a UI written in a simple react Progressive Web Application (PWA).
Used create-react-app --typescript to create a simple PWA with typescript. 


##### SaI Docker compose
NOTE: might not set this up. Really just need a node server to do the api and the ui...
Run our services
```bash
$ docker-compose up 
```
Sets up and runs Redis, API Server, and UI Server


