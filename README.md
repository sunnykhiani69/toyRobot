# Table Of Contents

[Problem Statement & Deliverables](#problem-statement--deliverables)

[Application Plumbing](#application-plumbing)

[Installation & dependencies](#installation--dependencies)

[Operating & testing](#operating--testing)

## Problem Statement & Deliverables

### Description

-----------

- The application is a simulation of a toy robot moving on a square tabletop,
  of dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be
  prevented from falling to destruction. Any movement that would result in the
  robot falling from the table must be prevented, however further valid
  movement commands must still be allowed.

Create an application that can read in commands of the following (textual) form:

    PLACE X,Y,F
    MOVE
    LEFT
    RIGHT
    REPORT

- PLACE will put the toy robot on the table in position X,Y and facing NORTH,
  SOUTH, EAST or WEST.
- The origin (0,0) can be considered to be the SOUTH WEST most corner.
- The first valid command to the robot is a PLACE command, after that, any
  sequence of commands may be issued, in any order, including another PLACE
  command. The application should discard all commands in the sequence until
  a valid PLACE command has been executed.
- MOVE will move the toy robot one unit forward in the direction it is
  currently facing.
- LEFT and RIGHT will rotate the robot 90 degrees in the specified direction
  without changing the position of the robot.
- REPORT will announce the X,Y and F of the robot. This can be in any form,
  but standard output is sufficient.

- A robot that is not on the table can choose the ignore the MOVE, LEFT, RIGHT
  and REPORT commands.
- Input can be from a file, or from standard input, as the developer chooses.
- Provide test data to exercise the application.
- The application must be a command line application.

### Constraints

-----------

- The toy robot must not fall off the table during movement. This also
  includes the initial placement of the toy robot.
- Any move that would cause the robot to fall must be ignored.

### Example Input and Output

-----------

### Example a

    PLACE 0,0,NORTH
    MOVE
    REPORT

Expected output:

    0,1,NORTH (PASS)

### Example b

    PLACE 0,0,NORTH
    LEFT
    REPORT

Expected output:

    0,0,WEST

### Example c

    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT

Expected output

    3,3,NORTH

### Deliverables

-----------

Please provide your source code, and any test code/data you using in
developing your solution.

Please engineer your solution to a standard you consider suitable for
production. It is not required to provide any graphical output showing the
movement of the toy robot.

## Application Plumbing

### Environment

-----------

- The application is a cross-platform command line executable application done in NodeJS. It is able to run on Linux, Mac OSX & Windows without configuration changes

### File structure & description

-----------

    /app/

This is the folder where the modules for the app resides

    /app/messenger.js

This is the class which communicates the messsages from the robot to the user. Tt only has one public method getMessage(msgConfigObj) which returns a parsed message to the user on start, report & robot out of table. The configutation for the messenger is stored in /config/default.json as config.messages.

    /app/tableTop.js

This is the class that represents the table top on which the robot is placed and moves. It is a 5 x 5 tile table top and is a dependency of the robot. it has only one public method which is isFalling(x,y). The x & y reresent the robots coordinates and is checked by this method. The method will not allow any x,y values lower then start & length configurations in the config file. The configutation for the table top is stored in /config/default.json as config.tableTop.

    /app/theRobot.js

This is the class that defines the robots functionalities and its actions on the tabletop along with messages send if certain condition is not met. The robots dependencies are the table top and the messages clases. The robot has five public methods as below:

- place(x,y,f)

This method places the robot on the table top with x,y ordinates and f as facing direction. No actions can be performed until a valid place command is issued.

- move()

This method moves the robot in the direction its currently facing.

- left()

This method turns the robot left from the direction its currently facing.

- right()

This method turns the robot right from the direction its currently facing.

- report()

This function displays the robots current position with cordinates x,y,f

    /app/theRobotApp.js

This module combines all of the dependencies of the robot and defines the i/o functionalities and receivers such as file ingest for movement and users i/o commands. It only has one method ToyRobotApp which enables the start file to package and run the application.

    /app/toyRobotCreator.js

This is the class that constructs the robot injecting all nevessary dependencies together to be used in the toyrobot app.

    /config/

This is the configuration folder of the application.

    /config/default.json

This file holds the configurations for the various classes.

    /spec/

This is the folder in which all the jasmine tests reside. The tests are written using the jasmine module.

    /spec/messageTest.js

This file tests the getMessage public method and checks if all keys are returned.

    /spec/robotTest.js

This is the main application testing suite. It tests the conditions in the problem as well as basic movements such as left, right report & move.

    /spec/tableTest.js

This test checks to see if the points x,y are in or out of the table.

## Installation & dependencies

### Installation

-----------

To install the application git/svn checkout with the below url:

    https://github.com/sunnykhiani69/toyRobot.git
    or git clone git@github.com:sunnykhiani69/toyRobot.git

Then cd to the directory where the project was downloaded and issue "npm install" to install the application, however the application has a few dependencies such as below:

### Dependencies

-----------

To run the application you will need:

    NodeJS - https://nodejs.org/en/download/
    npm - https://www.npmjs.com/
    jasmine-npm - https://github.com/jasmine/jasmine-npm
    mpm-config - https://www.npmjs.com/package/config

## Operating & testing

### Operating the robot

-----------

To operate the robot via command line input:

    ensure you are in the folder of the robot and all dependencies are installed

    issue "npm start" on prompt

    The robot will prompt with a welcome message and instructions to place the robot

    issue "place 1,2,west"

    The robot will place if the above command complies with the boundries of the table

    The robot accepts commands such as PLACE, MOVE, LEFT, RIGHT, REPORT. A valid PLACE command must be issued before any other commands are sent to the robot.

    The quite the robot simply issue "q" or "quit".

Sample input and outputs as below:

    > toyrobot@1.0.0 start C:\nodejs\toyRobot
    > node index.js

    Please start by issuing a PLACE command like PLACE 0,0,NORTH
    >place 1,2,west
    > move
    > move
    Please place the robot where it will not fall
    > report
    The robots position is 0 2 WEST
    >

To operate the robot text file of instructions:

    issue "npm start <filename>"

    The example text file that comes with this project has all of the tests defined in the problem statement and is located as tests.txt

    To execute the tests, issue command "npm start tests.txt"

    You may modify the text file or add any new files you want.

Sample output as below:

    PS C:\nodejs\toyRobot> npm start tests.txt

    > toyrobot@1.0.0 start C:\nodejs\toyRobot
    > node index.js "tests.txt"

    Please start by issuing a PLACE command like PLACE 0,0,NORTH
    >PLACE 0,0,NORTH
    > MOVE
    > REPORT
    The robots position is 0 1 NORTH
    > PLACE 0,0,NORTH
    > LEFT
    > REPORT
    The robots position is 0 0 WEST
    > PLACE 1,2,EAST
    > MOVE
    > MOVE
    > LEFT
    > MOVE
    > REPORT
    The robots position is 3 3 NORTH
    >
    PS C:\nodejs\toyRobot>

### Testing the robot

-----------

The robot comes with 3 main testing suites which helped to develop this application using BDD techniques.

The test suites are as:

- messageTest
- robotTest
- tableTest

They can be run individually as :

    issue "npm test .\spec\messageTest.js" to test the messages
    issue "npm test .\spec\robotTest.js" to test the robot
    issue "npm test .\spec\tableTest.js" to test the table

Ideally the whole test suite can be run upon issuing the command "npm test"

Sample output of npm test as below"

    PS C:\nodejs\toyRobot> npm test

    > toyrobot@1.0.0 test C:\nodejs\toyRobot
    > jasmine

    default
    placeFall
    noInitCommand
    welcome
    fileNotFound
    robotPosition
    x is  -1
    x is  5
    x is  -1
    x is  5
    x is  -1
    x is  5
    x is  -1
    x is  5
    x is  -1
    x is  5
    x is  0
    x is  4
    x is  0
    x is  4
    x is  0
    x is  4
    x is  0
    x is  4
    x is  0
    x is  4
    y is  -1
    y is  5
    y is  -1
    y is  5
    y is  -1
    y is  5
    y is  -1
    y is  5
    y is  -1
    y is  5
    y is  0
    y is  4
    y is  0
    y is  4
    y is  0
    y is  4
    y is  0
    y is  4
    y is  0
    y is  4
    Randomized with seed 82003
    Started
    condition robot is undefined: pass
    .noInitCommand before move: pass
    .TEST CASE B PASSES
    .TEST CASE RIGHT PASSES
    .TEST CASE C PASSES
    ..TEST CASE A PASSES
    ...............................................


    53 specs, 0 failures
    Finished in 0.043 seconds
    Randomized with seed 82003 (jasmine --random=true --seed=82003)
    PS C:\nodejs\toyRobot>

Thats all folks. For any questions or clarifications do reach out to me at webhoop@gmail.com.
