# Try now Canvas Plus
The canvas-plus project contains a ready to use Canvas application with few cool components such as a Calendar and a multi-sheet Excel uploader.

# How to contribute to the project
* This is an open source project, any Canvas developer can contribute to it. Just Fork it and when you want to contribute, create a merge request, we will review it and then merge it.

# Prerequisites
* Canvas v3.2.0
* [TM1py](https://github.com/cubewise-code/TM1py-samples)
* All new pages added to this project should use the Canvas Sample TM1 instance

# To install it
1. Stop the Cubewise Application Server
1. Copy the **C:\CWAS\canvas_base** and paste it into the **C:\CWAS\webapps**
1. Rename it to "canvas-plus" for example
1. Download the canvas-plus folder from [github](https://github.com/cubewise-code/canvas-plus)
1. Unzip the folder and paste all files into your new canvas_plus folder (created above)
1. This application contains a TM1py scripts to get weather data. Once TM1py is installed you will need to install the **geocoder** library (python install geocoder).
1. To store the weather data, you will have to copy the new cube **User Weather** from the **canvas-plus\files\WeatherCubeFiles** folder to your TM1 instance data folder.
1. Start the Cubewise Application Server and you should be ready to go!

<img src="https://s3.amazonaws.com/cubewise-downloads/web_assets/canvas-assets/canvas-plus.png"/>
