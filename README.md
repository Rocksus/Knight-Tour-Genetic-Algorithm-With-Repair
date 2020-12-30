# Knight Tour Genetic Algorithm(With-Repair)
A Knight Tour Genetic Algorithm simulation with p5js javascript library.

Some previews:
![Initial Simulation](https://user-images.githubusercontent.com/21309983/50621422-68a8f800-0f38-11e9-9f5a-2c3468285304.PNG "Initial Simulation")
![Finished Simulation](https://user-images.githubusercontent.com/21309983/50621421-68a8f800-0f38-11e9-9265-5f9bfbc50c6c.PNG "Finished Simulation")

If you would like to check it out in action:
https://editor.p5js.org/Rocksus/full/yX2ZlGZDL

# Getting Started
## Running The Program
To run the program, just access `index.html` using any browser.

## Integrating to Firebase
To add storing capabilities, I have implemented a firebase connection.
First, in `sketch.js`, change `enableDatabase` to `true`.
Then, create a new file called `constants.js` and fill them with:
```javascript
const API_KEY = "your-api-key"
const AUTH_DOMAIN = "your-firebaseapp-auth-domain"
const DATABASE_URL = "your-firebaseio-database-url"
const STORAGE_BUCKET = "your-firebase-storage-bucket-url"
const MESSAGING_SENDER_ID = "your-messaging-sender-id"
```
# Article Link
If you want to know more about it, you can read [my article post about it](https://rayantonius.com/tech/knight-tour-p5/).

# To-Do List
- Add ACO Algorithm approach
- Add pure heuristics approach
- Open to suggestions!
