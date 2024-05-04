#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import notifier from "node-notifier";
import batteryLevel from "battery-level";
import isCharging from "is-charging";
import chalk from "chalk";
import boxen from "boxen";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function checkBatteryLevel() {
  const level = await batteryLevel(); // Get battery level
  const charging = await isCharging(); // Check if device is charging

  const plugIn = path.resolve(__dirname, "./plugIn.png");
  const unplug = path.resolve(__dirname, "./unplug.png");

  console.clear();
  console.log(chalk.yellow.bold(boxen("Plug Unplug Reminder", { padding: 1 })));
  console.log(chalk.gray("\nListening to battery level..."));
  console.log(
    chalk.green.bold(`\nCurrent Battery Percentage: ${level * 100}%`)
  );
  console.log(
    chalk.cyan(
      "\nIt will notify you when the battery percentage is below 20% and not Charging & above 80% while Charging."
    )
  );

  if (level < 0.2 && !charging) {
    notifier.notify({
      title: "Plug In Reminder",
      message:
        "Battery level is below 20%. Please plug in your device to keep the battery in optimum health.",
      icon: plugIn,
      sound: true, // Play default system notification sound
    });
    console.log(
      chalk.red.bold("Battery level is low. Reminder sent to plug in device.")
    );
  } else if (level > 0.8 && charging) {
    notifier.notify({
      title: "Unplug Reminder",
      message:
        "Battery level is above 80%. You can unplug your device to keep the battery in optimum health.",
      icon: unplug,
      sound: true, // Play default system notification sound
    });
    console.log(
      chalk.green.bold("Battery level is high. Reminder sent to unplug device.")
    );
  }
}

// Check battery level immediately and then every 60 seconds
checkBatteryLevel(); // Run immediately
const interval = setInterval(checkBatteryLevel, 60 * 1000); // Run every 60 seconds

// Log what the application is doing
process.on("SIGINT", () => {
  clearInterval(interval);
  console.log(chalk.yellow.bold("\nPlugUnplugReminder Stopped."));
});
