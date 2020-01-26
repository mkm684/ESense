Inspiration:

Esense is the outcome of our inspiration from the link between body temperature changes and getting sick.

What it does:

A temperature sensor will measure your surface body temperature and then transmits the information to a web app for real time monitoring.

How we did it:

We used a TMP36 sensor and connected it to an Arduino UNO. The UNO was connected to a computer through a USB cable. Using the code on the Arduino software, we prompted the sensor to start measuring the temperature. The data was sent back to the computer. The webapp was developed to read the output temperature readings from the Arduino software and sent to the user interface "front-end".

Challenges we faced:

We were not able to connect a raspberry pi for reliable wireless communication between an an arduino and computer interface. Hardware limitations with a pressure sensor made it difficult to connect two sensors simultaneously.

Future Work:

The future of this technology is headed towards using surface body temperature to predict core body temperature. This will allow us to predict future body temperature diseases. This sensor is to be incorporated into a wireless system (i.e. arduino nano with RF/WIFI transmission) to allow for remote temperature monitoring.
