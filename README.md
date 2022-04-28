# PC Watcher Application

## Preview:
![Desktop Application Preview](preview-desktop.png) ![Mobile Application Preview](preview-mobile.png)

*NOTE: image out of date, needs to be replaced*

## Function
Utilizes React and Java to create an elegant application to monitor the load, temperature, and memory usage of a PC's CPU and GPU. Can either be run entirely on the PC you wish to monitor, or the Java portion can be run on the PC, and the React portion can be run on a server within the same network.

## Installation
Currently the project folder must be downloaded in its entirety. However, work is being done on wrapping the full project as one application for simple installation.
To install the project currently, you can do one of the following: 
- Download the ZIP file and extracted into your desired location
- Navigating to your desired location in Terminal and using `git clone https://github.com/ABCaps35/pcwatcher.git`

## Execution
Currently the .war file in the src/target folder and the React app in the src/main/ui folder must be run separately, but a one-step execution method is in the works.

To run the application fully on one computer:
1. Install the package to your desired location
2. Open a Terminal window at your project and navigate to src/target
3. run `java -jar pc-watcher-0.0.1-SNAPSHOT.war` to start Java back-end
4. In another Terminal window, navigate to src/main/ui
5. run `npm run start` to get React application running

To run the application between two separate machines:
1. Install the package to your desired location on the machine you wish to monitor
2. Open a Terminal window at your project and navigate to src/target
3. Run `java -jar pc-watcher-0.0.1-SNAPSHOT.war` to start Java back-end
2. Copy the src/main/ui folder to the machine on which you want to run your React application
4. In a Terminal window on this second machine, navigate to the src/main/ui folder
5. run `npm run start` to get React application running

## Tools Used
### Main Technologies
- React.js
- Spring Boot

### Packages
- jSensors (https://github.com/profesorfalken/jSensors)
- OSHI (https://github.com/oshi/oshi)
- Material-UI (https://mui.com/)
- react-chartjs-2 (https://github.com/reactchartjs/react-chartjs-2)

### Other Dependency Notes
Open Hardware Monitor (https://openhardwaremonitor.org/) should be running concurrently to ensure that CPU temperatures are collected correctly

## Future Plans
The following items are to be worked on in the future:
- One-step installation 
- One-step execution (possibly including a .jar file or Electron wrapping)
- Adaptation for external server monitoring
- Potential migration to C# backend for faster, simpler Windows architecture