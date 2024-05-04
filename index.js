import batteryLevel from "battery-level";

batteryLevel().then((level) => {
  console.log(`Battery level: ${level * 100}%`);
});
