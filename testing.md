## To test a new build
### You will need docker on your machine

Create a new docker container based on latest Node-RED (0.19.5 currently) with Node v8

`docker run -itd -p 1880:1880 --name [NAME] nodered/node-red-docker:0.19.5-v8`

Install the latest build of Nexmo Nodered from GitHub
`docker exec -it [NAME] npm install git+https://git@github.com/nexmo/nexmo-nodered.git`

(To test a specific branch add `#branchName` to the end of the url)

Restart the docker container
`docker restart [NAME]`

Check the logs to make sure there were no errors on NodeRED startup with the new package
`docker logs`

Now open http://127.0.0.1:1880 and create test flows