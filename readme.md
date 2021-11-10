# Campaign management demo app

This repo is a part of a bigger app whose purpose is to build a dynamic advertising campaigns management service.
Whole app consists of a back office where the campaign entities are created and configurated and a dynamic public website.
The target is to let the users visit that public websites to introduce their personal data and a code fetched from a purchased brand product, 
for example, a pin code in the back side of a Heineken bottle tag.
Those web pages are template configured through the back office and dynamically deployed at firebase hosting with a customized domain.
This repo contains the code for this customized web pages.

## Demo app
As for demo purpose, this repository does not connect to the firebase project but takes template data from a mock json.

## Tech stack
This app uses React/next stack for SSR content, and its wrapped into a firebase configuration to be deployed at firebase hosting.

## Run application
Just install dependencies with npm  
```npm i```  

And run next service with  
```npm run dev```

App will be available at http://localhost:3000
Note that app uses domain to fetch campaign data, localhost:3000 is needed to fetch demo
data so ensure you can run this app at this port.

## Tests
e2e tests setup is built through cypress and testing library. To run suite just run application
and then run  
```npm run e2e```  
As first run may be slower, the timeout may be exhausted. Increase the testing library
timeout or run again the test.
