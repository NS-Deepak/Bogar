#include <WiFi.h>
#include <ThingSpeak.h>

// WiFi credentials
const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_password";

// ThingSpeak credentials
const char* apiKey = "your_thingspeak_api_key";
const char* channelID = "your_thingspeak_channel_id";

WiFiClient client;

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  ThingSpeak.begin(client);
}

void loop() {
  // Read pH sensor value
  int pHValue = analogRead(A0);
  float pH = pHValue * (14.0 / 1023.0); // Convert to pH value

  // Send data to ThingSpeak
  ThingSpeak.setField(1, pH);
  ThingSpeak.writeFields(channelID, apiKey);

  delay(15000); // Send data every 15 seconds
}