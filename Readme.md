# plugUnplugReminder Node Package

## Installation

This package provides an Executable Command

So You will have to install this package globally to be able to use this Package.

```bash
npm install g plugunplugreminder
```

**or**

To Execute Immediately

```sh
npx plugunplugreminder
```

### How to Use

Install this Globally then run this command and let it run in the Background and it will let you know to **Plug** or **Unplug** your Device

```sh
pur
```

### If you want to it run when your Device Boots follow the following steps

- Create a `pur.sh` file paste this code inside

```
#!/bin/bash

# Run the plugUnplugReminder command
pur
```

- Now paste the `pur.sh` file in the startup folder

For Windows

- Make Sure Git Bash is installed or any other Terminal which can execute Bash Code
- Make sure when you open the `pur.sh` file it **executes** instead of being opened in a text editor
- To execute the **sh** file when clicked use the `Open With` option and open with `Bash.exe` then select **always**
- Now add the **Startup Folder** path in Environment Variables

So now every time you start your windows laptop this will work.

#### Save yourself the hassle above and use [Pure Battery Add On](https://apps.microsoft.com/detail/9n3hdtncf6z8?hl=en-US&gl=US) by Medha Chaitanya

_I don't have a Mac Device so I can't help you_

### Features

- Monitors battery level and charging status in every Minute.
- Sends notifications when the battery level is below 20% and not charging, or above 80% while charging.
- Provides visual feedback in the console with clear and colorful messages.

### Source Code

```js
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
```

### License

This project is licensed under the MIT License

---

Made by Sooraj Gupta

- Email: soorajgupta00@gmail.com
- GitHub: [s54a](https://github.com/s54a)

---

### Credits for PNG Icons Used

<a target="_blank" href="https://icons8.com/icon/12025/disconnected">Unplug</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
<a target="_blank" href="https://icons8.com/icon/12088/electrical">Electrical</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
