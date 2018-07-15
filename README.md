# Table Of Contents

[Problem Statement & Deliverables](#problem-statement--deliverables)

[Application Plumbing](#application-plumbing)

[Installation & dependencies](#installation-dependencies)

[Operating & testing](#Operaating)

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

-----------

## Operating & testing

-----------
