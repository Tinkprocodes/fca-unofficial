# Documentation

* [`login`](#login)
* [`api.addUserToGroup`](#addUserToGroup)
* [`api.changeAdminStatus`](#changeAdminStatus)
* [`api.changeArchivedStatus`](#changeArchivedStatus)
* [`api.changeBlockedStatus`](#changeBlockedStatus)
* [`api.changeGroupImage`](#changeGroupImage)
* [`api.changeNickname`](#changeNickname)
* [`api.changeThreadColor`](#changeThreadColor)
* [`api.changeThreadEmoji`](#changeThreadEmoji)
* [`api.createNewGroup`](#createNewGroup)
* [`api.createPoll`](#createPoll)
* [`api.deleteMessage`](#deleteMessage)
* [`api.deleteThread`](#deleteThread)
* [`api.forwardAttachment`](#forwardAttachment)
* [`api.getAppState`](#getAppState)
* [`api.getCurrentUserID`](#getCurrentUserID)
* [`api.getEmojiUrl`](#getEmojiUrl)
* [`api.getFriendsList`](#getFriendsList)
* [`api.getThreadHistory`](#getThreadHistory)
* [`api.getThreadInfo`](#getThreadInfo)
* [`api.getThreadList`](#getThreadList)
* [`api.getThreadPictures`](#getThreadPictures)
* [`api.getUserID`](#getUserID)
* [`api.getUserInfo`](#getUserInfo)
* [`api.handleMessageRequest`](#handleMessageRequest)
* [`api.listenMqtt`](#listenMqtt)
* [`api.logout`](#logout)
* [`api.markAsDelivered`](#markAsDelivered)
* [`api.markAsRead`](#markAsRead)
* [`api.markAsReadAll`](#markAsReadAll)
* [`api.markAsSeen`](#markAsSeen)
* [`api.muteThread`](#muteThread)
* [`api.removeUserFromGroup`](#removeUserFromGroup)
* [`api.resolvePhotoUrl`](#resolvePhotoUrl)
* [`api.searchForThread`](#searchForThread)
* [`api.sendMessage`](#sendMessage)
* [`api.sendTypingIndicator`](#sendTypingIndicator)
* [`api.setMessageReaction`](#setMessageReaction)
* [`api.setOptions`](#setOptions)
* [`api.setTitle`](#setTitle)
* [`api.threadColors`](#threadColors)
* [`api.unsendMessage`](#unsendMessage)

---------------------------------------

### Password safety

**Read this** before you _copy+paste_ examples from below.

You should not store Facebook password in your scripts.
There are few good reasons:
* People who are standing behind you may look at your "code" and get your password if it is on the screen
* Backups of source files may be readable by someone else. "_There is nothing secret in my code, why should I ever password protect my backups_"
* You can't push your code to Github (or any onther service) without removing your password from the file.  Remember: Even if you undo your accidential commit with password, Git doesn't delete it, that commit is just not used but is still readable by everybody.
* If you change your password in the future (maybe it leaked because _someone_ stored password in source file… oh… well…) you will have to change every occurrence in your scripts

Preferred method is to have `login.js` that saves `AppState` to a file and then use that file from all your scripts.
This way you can put password in your code for a minute, login to facebook and then remove it.

If you want to be even more safe:  _login.js_ can get password with `require("readline")` or with environment variables like this:
```js
var credentials = {
    email: process.env.FB_EMAIL,
    password: process.env.FB_PASSWORD
}
```
```bash
FB_EMAIL="john.doe@example.com"
FB_PASSWORD="MySuperHardP@ssw0rd"
nodejs login.js
```

---------------------------------------
<a name="login"></a>
### login(credentials[, options][, callback])

This function is returned by `require(...)` and is the main entry point to the API.

It allows the user to log into facebook given the right credentials.

Return a Promise that will resolve if logged in successfully, or reject if failed to login. (will not resolve or reject if callback is supplied!)

If `callback` is supplied:

* `callback` will be called with a `null` object (for potential errors) and with an object containing all the available functions if logged in successfully.

* `callback` will be called with an error object if failed to login.

If `login-approval` error was thrown: Inside error object is `continue` function, you can call that function with 2FA code. The behaviour of this function depends on how you call `login` with:

* If `callback` is not supplied (using `Promise`), this function will return a `Promise` that behaves like `Promise` received from `login`.

* If `callback` is supplied, this function will still return a `Promise`, but it will not resolve. Instead, the result is called to `callback`.

__Arguments__

* `credentials`: An object containing the fields `email` and `password` used to login, __*or*__ an object containing the field `appState`.
* `options`: An object representing options to use when logging in (as described in [api.setOptions](#setOptions)).
* `callback(err, api)`: A callback called when login is done (successful or not). `err` is an object containing a field `error`.

__Example (Email & Password)__

```js
const login = require("fca-unofficial");

login({email: "FB_EMAIL", password: "FB_PASSWORD"}, (err, api) => {
    if(err) return console.error(err);
    // Here you can use the api
});
```

__Example (Email & Password then save appState to file)__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({email: "FB_EMAIL", password: "FB_PASSWORD"}, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});
```

__Example (AppState loaded from file)__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    // Here you can use the api
});
```

__Login Approvals (2-Factor Auth)__: When you try to login with Login Approvals enabled, your callback will be called with an error `'login-approval'` that has a `continue` function that accepts the approval code as a `string` or a `number`.

__Example__:

```js
const fs = require("fs");
const login = require("fca-unofficial");
const readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const obj = {email: "FB_EMAIL", password: "FB_PASSWORD"};
login(obj, (err, api) => {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }

    // Logged in!
});
```

__Review Recent Login__: Sometimes Facebook will ask you to review your recent logins. This means you've recently logged in from a unrecognized location. This will will result in the callback being called with an error `'review-recent-login'` by default. If you wish to automatically approve all recent logins, you can set the option `forceLogin` to `true` in the `loginOptions`.


---------------------------------------

<a name="addUserToGroup"></a>
### api.addUserToGroup(userID, threadID[, callback])

Adds a user (or array of users) to a group chat.

__Arguments__

* `userID`: User ID or array of user IDs.
* `threadID`: Group chat ID.
* `callback(err)`: A callback called when the query is done (either with an error or with no arguments).

---------------------------------------

<a name="changeAdminStatus"></a>
### api.changeAdminStatus(threadID, adminIDs, adminStatus)

Given a adminID, or an array of adminIDs, will set the admin status of the user(s) to `adminStatus`.

__Arguments__
* `threadID`: ID of a group chat (can't use in one-to-one conversations)
* `adminIDs`: The id(s) of users you wish to admin/unadmin (string or an array).
* `adminStatus`: Boolean indicating whether the user(s) should be promoted to admin (`true`) or demoted to a regular user (`false`).

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, async function(err, api) {
    if (err) return console.error(err);

    let threadID = "0000000000000000";
    let newAdmins = ["111111111111111", "222222222222222"];
    await api.changeAdminStatus(threadID, newAdmins, true);

    let adminToRemove = "333333333333333";
    await api.changeAdminStatus(threadID, adminToRemove, false);

});

```

---------------------------------------

<a name="changeArchivedStatus"></a>
### api.changeArchivedStatus(threadOrThreads, archive[, callback])

Given a threadID, or an array of threadIDs, will set the archive status of the threads to `archive`. Archiving a thread will hide it from the logged-in user's inbox until the next time a message is sent or received.

__Arguments__
* `threadOrThreads`: The id(s) of the threads you wish to archive/unarchive.
* `archive`: Boolean indicating the new archive status to assign to the thread(s).
* `callback(err)`: A callback called when the query is done (either with an error or null).

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.changeArchivedStatus("000000000000000", true, (err) => {
        if(err) return console.error(err);
    });
});
```

---------------------------------------

<a name="changeBlockedStatus"></a>
### api.changeBlockedStatus(userID, block[, callback])

Prevents a user from privately contacting you. (Messages in a group chat will still be seen by both parties).

__Arguments__

* `userID`: User ID.
* `block`: Boolean indicating whether to block or unblock the user (true for block).
* `callback(err)`: A callback called when the query is done (either with an error or with no arguments).

---------------------------------------

<a name="changeGroupImage"></a>
### api.changeGroupImage(image, threadID[, callback])

Will change the group chat's image to the given image.

__Arguments__
* `image`: File stream of image.
* `threadID`: String representing the ID of the thread.
* `callback(err)`: A callback called when the change is done (either with an error or null).

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.changeGroupImage(fs.createReadStream("./avatar.png"), "000000000000000", (err) => {
        if(err) return console.error(err);
    });
});
```

---------------------------------------

<a name="changeNickname"></a>
### api.changeNickname(nickname, threadID, participantID[, callback])

Will change the thread user nickname to the one provided.

__Arguments__
* `nickname`: String containing a nickname. Leave empty to reset nickname.
* `threadID`: String representing the ID of the thread.
* `participantID`: String representing the ID of the user.
* `callback(err)`: An optional callback called when the change is done (either with an error or null).

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.changeNickname("Example", "000000000000000", "000000000000000", (err) => {
        if(err) return console.error(err);
    });
});
```

---------------------------------------

<a name="changeThreadColor"></a>
### api.changeThreadColor(color, threadID[, callback])

Will change the thread color to the given hex string color ("#0000ff"). Set it
to empty string if you want the default.

Note: the color needs to start with a "#".

__Arguments__
* `color`: String representing a theme ID (a list of theme ID can be found at `api.threadColors`).
* `threadID`: String representing the ID of the thread.
* `callback(err)`: A callback called when the change is done (either with an error or null).

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.changeThreadColor("#0000ff", "000000000000000", (err) => {
        if(err) return console.error(err);
    });
});
```

---------------------------------------

<a name="changeThreadEmoji"></a>
### api.changeThreadEmoji(emoji, threadID[, callback])

Will change the thread emoji to the one provided.

Note: The UI doesn't play nice with all emoji.

__Arguments__
* `emoji`: String containing a single emoji character.
* `threadID`: String representing the ID of the thread.
* `callback(err)`: A callback called when the change is done (either with an error or null).

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.changeThreadEmoji("💯", "000000000000000", (err) => {
        if(err) return console.error(err);
    });
});
```

---------------------------------------

<a name="createNewGroup"></a>
### api.createNewGroup(participantIDs[, groupTitle][, callback])

Create a new group chat.

__Arguments__
* `participantIDs`: An array containing participant IDs. (*Length must be >= 2*)
* `groupTitle`: The title of the new group chat.
* `callback(err, threadID)`: A callback called when created.

---------------------------------------

<a name="createPoll"></a>
### api.createPoll(title, threadID[, options][, callback]) (*temporary deprecated because Facebook is updating this feature*)

Creates a poll with the specified title and optional poll options, which can also be initially selected by the logged-in user.

__Arguments__
* `title`: String containing a title for the poll.
* `threadID`: String representing the ID of the thread.
* `options`: An optional `string : bool` dictionary to specify initial poll options and their initial states (selected/not selected), respectively.
* `callback(err)`: An optional callback called when the poll is posted (either with an error or null) - can omit the `options` parameter and use this as the third parameter if desired.

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.createPoll("Example Poll", "000000000000000", {
        "Option 1": false,
        "Option 2": true
    }, (err) => {
        if(err) return console.error(err);
    });
});
```

---------------------------------------

<a name="deleteMessage"></a>
### api.deleteMessage(messageOrMessages[, callback])

Takes a messageID or an array of messageIDs and deletes the corresponding message.

__Arguments__
* `messageOrMessages`: A messageID string or messageID string array
* `callback(err)`: A callback called when the query is done (either with an error or null).

__Example__
```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.listen((err, message) => {
        if(message.body) {
            api.sendMessage(message.body, message.threadID, (err, messageInfo) => {
                if(err) return console.error(err);

                api.deleteMessage(messageInfo.messageID);
            });
        }
    });
});
```

---------------------------------------

<a name="deleteThread"></a>
### api.deleteThread(threadOrThreads[, callback])

Given a threadID, or an array of threadIDs, will delete the threads from your account. Note that this does *not* remove the messages from Facebook's servers - anyone who hasn't deleted the thread can still view all of the messages.

__Arguments__

* `threadOrThreads` - The id(s) of the threads you wish to remove from your account.
* `callback(err)` - A callback called when the operation is done, maybe with an object representing an error.

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.deleteThread("000000000000000", (err) => {
        if(err) return console.error(err);
    });
});
```

---------------------------------------

<a name="forwardAttachment"></a>
### api.forwardAttachment(attachmentID, userOrUsers[, callback])

Forwards corresponding attachment to given userID or to every user from an array of userIDs

__Arguments__
* `attachmentID`: The ID field in the attachment object. Recorded audio cannot be forwarded.
* `userOrUsers`: A userID string or usersID string array
* `callback(err)`: A callback called when the query is done (either with an error or null).

---------------------------------------

<a name="getAppState"></a>
### api.getAppState()

Returns current appState which can be saved to a file or stored in a variable.

---------------------------------------

<a name="getCurrentUserID"></a>
### api.getCurrentUserID()

Returns the currently logged-in user's Facebook user ID.

---------------------------------------

<a name="getEmojiUrl"></a>
### api.getEmojiUrl(c, size[, pixelRatio])

Returns the URL to a Facebook Messenger-style emoji image asset.

__note__: This function will return a URL regardless of whether the image at the URL actually exists.
This can happen if, for example, Messenger does not have an image asset for the requested emoji.

__Arguments__

* `c` - The emoji character
* `size` - The width and height of the emoji image; supported sizes are 32, 64, and 128
* `pixelRatio` - The pixel ratio of the emoji image; supported ratios are '1.0' and '1.5' (default is '1.0')

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    // Prints https://static.xx.fbcdn.net/images/emoji.php/v8/z9c/1.0/128/1f40d.png
    console.log('Snake emoji, 128px (128x128 with pixel ratio of 1.0');
    console.log(api.getEmojiUrl('\ud83d\udc0d', 128));

    // Prints https://static.xx.fbcdn.net/images/emoji.php/v8/ze1/1.5/128/1f40d.png
    console.log('Snake emoji, 192px (128x128 with pixel ratio of 1.5');
    console.log(api.getEmojiUrl('\ud83d\udc0d', 128, '1.5'));
});
```

---------------------------------------

<a name="getFriendsList"></a>
### api.getFriendsList(callback)

Returns an array of objects with some information about your friends.

__Arguments__

* `callback(err, arr)` - A callback called when the query is done (either with an error or with an confirmation object). `arr` is an array of objects with the following fields: `alternateName`, `firstName`, `gender`, `userID`, `isFriend`, `fullName`, `profilePicture`, `type`, `profileUrl`, `vanity`, `isBirthday`.

__Example__

```js
const fs = require("fs");
const login = require("fca-unofficial");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.getFriendsList((err, data) => {
        if(err) return console.error(err);

        console.log(data.length);
    });
});
```

---------------------------------------

<a name="getThreadHistory"></a>
### api.getThreadHistory(threadID, amount, timestamp, callback)

Takes a threadID, number of messages, a timestamp, and a callback.

__note__: if you're getting a 500 error, it's possible that you're requesting too many messages. Try reducing that number and see if that works.

__Arguments__
* `threadID`: A threadID corresponding to the target chat
* `amount`: The amount of messages to *request*
* `timestamp`: Used to described the time of the most recent message to load. If timestamp is `undefined`, facebook will load the most recent messages.
* `callback(error, history)`: If error is null, histor
