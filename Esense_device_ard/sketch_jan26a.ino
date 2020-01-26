//This code will allow you to run the pulse sensor and the temperature sensor simultaenously


#define USE_ARDUINO_INTERRUPTS true //set up low level interrupts for most accruate BPM math
# include <PulseSensorPlayground.h> //includes the pulsesensor playground library
 
 ///Temperature Sensor 
int sensePin = A0;  //This is the Arduino Pin that will read the sensor output
int sensorInput;    //The variable we will use to store the sensor input
double temp;        //The variable we will use to store temperature in degrees celcius. High body temperatures are 40+, sensor accuracry is +/- 2 degrees 


//Pulse Sensor
int beatPin=A2; //programming the pulse sensor 
int beatInput;
int Threshold= 550; //Determine which signal to count as a beat and which to ignore 
PulseSensorPlayground pulseSensor; //creates an instance of the PulseSensorPlayground object called "pulseSensor"

//averaging
double temp_avg = 0;
//double pres_avg = 0;  
int samples = 0;

//communication
char dataString[50] = {0};


void setup() {
    pinMode(A0, INPUT);
    pinMode(A2, INPUT);
    // put your setup code here, to run once:
    Serial.begin(9600); //Start the Serial Port at 9600 baud (default)
    //configure the Pulsensor Object by assigning variables to it 
    pulseSensor.analogInput(A2);
    pulseSensor.setThreshold(Threshold);
}
 void loop() {
    // The temperature
    sensorInput=analogRead(A0);
    temp=(double)sensorInput / 1024;       //find percentage of input reading
    temp=temp*5;
    temp=temp-0.5;
    temp=temp*100; 
    
    //averaging
    if (samples < 20){
      temp_avg += temp;
      samples++;
    }
    else {
      int t = temp_avg/20;
      sprintf(dataString,"%02X",(int)t); // convert a value to hexa 
      Serial.println(dataString);
      temp_avg=0;
      samples=0;
    }

    //Pulse sensor
//    int myBPM=pulseSensor.getBeatsPerMinute(); //Calls function on our pulse sensor 
//    if (pulseSensor.sawStartOfBeat())
//    { //Constantly test to see if a beat "happened"
//      Serial.println(myBPM);
//    }
//    Serial.print("HeatBeat") ;  
//    Serial.println(beatInput);  
    
    delay(50); //wait fifty millisecond 
}
