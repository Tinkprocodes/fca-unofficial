/**
 * @copyright artemegion
 */

declare namespace Facebook
{
    interface ICredentials
    {
        email: string;
        password: string;
    }

    interface IAppStateCredentials
    {
        appState: any;
    }

    interface IOptions
    {
        logLevel?: 'silly' | 'verbose' | 'info' | 'http' | 'warn' | 'error' | 'silent';

        selfListen?: boolean;
        listenEvents?: boolean;
        updatePresence?: boolean;

        forceLogin?: boolean;

        pageID?: string;
        userAgent?: string;
    }

    interface IError
    {
        error: string;
    }

    interface ILoginError extends IError
    {
        continue?: (code: string | number) => void;
    }

    interface IUser
    {
        userID: string;

        fullName: string;
        firstName: string;

        alternateName: string;
        vanity: string;

        gender: string;

        isBirthday: boolean;
        isFriend: boolean;

        profilePicture: string;
        profileUrl: string;

        type: string;
    }

    interface IUserInfo
    {
        name: string;
        firstName: string;

        alternateName: string;
        vanity: string;

        thumbSrc: string;
        profileUrl: string;

        gender: string;
        type: string;

        isFriend: boolean;
        isBirthday: boolean;

        searchTokens?: string[];
    }

    interface IMessage
    {
        body: string;
    }

    interface IStickerMessage extends IMessage
    {
        sticker: string;
    }

    interface IAttachmentMessage extends IMessage
    {
        attachment: ReadableStream | ReadableStream[];
    }

    interface IUrlMessage extends IMessage
    {
        url: string;
    }

    interface IEmojiMessage extends IMessage
    {
        emoji: string;
        emojiSize: 'small' | 'medium' | 'large';
    }

    interface IMentionsMessage extends IMessage
    {
        mentions: IMention[];
    }

    interface IMention
    {
        id: string;
        tag: string;
        fromIndex?: number;
    }

    interface IMessageInfo
    {
        threadID: string;
        messageID: string;

        timestamp: number;
    }

    interface IThreadInfo
    {
        threadID: string;
        participantIDs: Array<string>;
        formerParticipants: Array<string>;
        name: string;
        nicknames?: Array<string>;
        snippet: string;
        snippetHasAttachment: boolean;
        snippetAttachments: Array<IAttachment>;
        snippedSender: string;
        unreadCount: number;
        messageCount: number;
        imageSrc?: string;
        timestamp: number;
        serverTimestamp: number;
        muteSettings: any;
        isCanonicalUser: boolean;
        isCanonical: boolean;
        canonicalFbid: string;
        isSubscribed: boolean;
        rootMessageThreadingID: string;
        folder: string;
        isArchived: boolean;
        recipientsLoadable: boolean;
        hasEmailParticipant: boolean;
        readOnly: boolean;
        canReply: boolean;
        composerEnabled: boolean;
        blockedParticipants: Array<string>;
        lastMessageID: string;
        emoji?: string;
        color?: string;
        lastReadTimestamp: number;
    }

    interface IReceived
    {
        type: 'message' | 'event' | 'typ' | 'read_receipt' | 'read' | 'message_reaction' | 'presence';
    }

    interface IReceivedMessage extends IReceived
    {
        type: 'message';

        threadID: string;
        senderID: string;
        messageID: string;

        isGroup: boolean;
        args: string[];
        body: string;
        command: string;
        attachments: IAttachment[];
        participantIDs: string[];
    }

    interface IReceivedEvent extends IReceived
    {
        type: 'event';
        logMessageType: 
        'log:subscribe' | 
        'log:unsubscribe' | 
        'log:thread-name' | 
        'log:thread-color' | 
        'log:thread-icon' | 
        'log:user-nickname' |
        'log:thread-admins' | 
        'log:thread-approval-mode' | 
        'log:thread-call' |
        'log:thread-poll';

        logMessageData: string;
        logMessageBody: string;
        author: string;
        threadID: string;
        participantIDs: string[];
    }

    interface IReceivedTyp extends IReceived
    {
        type: 'typ';
        isTyping: boolean;
        from: string;
        threadID: string;
        fromMobile: boolean;
    }

    interface IReceivedReadReceipt extends IReceived
    {
        type: 'read_receipt';
        reader: string;
        time: number;
        threadID: string;
    }

    interface IReceivedRead extends IReceived
    {
        type: 'read';
        threadID: string;
        time: number;
    }

    interface IReceivedMessageReaction extends IReceived
    {
        type: 'message_reaction';
        reaction: string;
        threadID: string;
        userID: string;
        senderID: string;
        messageID: string;
        offlineThreadingID?: string;
        timestamp: number;
    }

    interface IReceivedPresence extends IReceived
    {
        type: 'presence';
        timestamp: number;
        userID: string;
        statuses: 0 | 2 | number;
    }

    interface IAttachment {
        /** type of attachment */
        type: 'sticker' | 'file' | 'photo' | 'animated_image' | 'share' | 'video';
    }

    interface IStickerAttachment extends IAttachment {
        /** sticker */
        type: 'sticker';
        url: string;
        stickerID: string;
    }

    interface IFileAttachment extends IAttachment {
        /** file */
        type: 'file';
        name: string;
        url: string;
        ID: string;
    }

    interface IPhotoAttachment extends IAttachment {
        /** photo */
        type: 'photo';
        ID: string;
        url?: string;
    }

    interface IAnimatedImageAttachment extends IAttachment
    {
        type: 'animated_image';
        name: string;
        ID: string | '';
        url?: string;
    }

    interface IVideoAttachment extends IAttachment {
        type: 'video';
        ID: string;
        url: string;
    }

    interface IShareAttachment extends IAttachment {
        type: 'share';
        ID: string;
        url?: string;
    }

    interface IShareSubAttachment {
        description: string;
        media: {
            animated_image: string,
            animated_image_size: { height: number, width: number },
            image: string,
            image_size: { height: number, width: number },
            duration: number,
            playable: boolean,
            source: string,
        },
        source: string;
        style_list: string[];
        title: string;
        properties: any;
        uri: string;
        forwadable: boolean;
        subattachments: IShareSubAttachment[];
        deduplication_key: string;
        action_links: string[];
        messaging_attribution: {
            attribution_type: string,
            attribution_id: string,
            name: string,
            icon_url: string
        };
        messenger_ctas: string[];
        target: {
            video_id: string;
        } | any;
    }

    export interface IThreadHistoryMessage
    {
        type: 'message';
        senderName: string;
        senderID: string;
        participantNames: string[];
        participantIDs: string[];
        args?: string[];
        body: string;
        command: string;
        threadID: string;
        threadName: string;
        location: any;
        messageID: string;
        attachments: IAttachment[];
        timestamp: number;
        timestampAbsolute?: number;
        timestampRelative?: number;
        timestampDatetime?: number;
        tags: string[];
        reactions: IDictionary<string>;
        isGroup: boolean;
    }

    export interface IDictionary<TValue>
    {
        [key: string]: TValue;
    }

    export class API
    {
        /**
         * adds a user or array of users to a group chat
         * @param userID user id or array of users ids
         * @param threadID group chat id
         * @param callback a callback called when the query is done
         */
        public addUserToGroup(userID: string | Array<string>, threadID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * set the archive status of the `threads` to `archive`
         * @param threads the id or array of ids to set archive status
         * @param archive the new arhive status
         * @param callback callback called when the query is done
         */
        public changeArchivedStatus(threadOrThreads: string | Array<string>, archive: boolean, callback: (err: Facebook.IError) => void): void;

        /**
         * prevents a user from privately contacting you
         * @param userID user id
         * @param block whether to block or unblock the user
         * @param callback callback called when the query is done
         */
        public changeBlockedStatus(userID: string, block: boolean, callback?: (err: Facebook.IError) => void): void;

        /**
         * change the group chat's image to the given image
         * @param image file stream of image
         * @param threadID string representing the id of the thread
         * @param callback callback called when the change is done
         */
        public changeGroupImage(image: ReadableStream, threadID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * change the thread user nickname to the one provided
         * @param nickname nickname, leave empty to reset nickname
         * @param threadID thread id
         * @param participantID user id
         * @param callback callback called when the change is done
         */
        public changeNickname(nickname: string, threadID: string, participantID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * change the thread color to the given hex string color, leave empty to reset to default
         * @param color hex color code
         * @param threadID thread id
         * @param callback callback called when the change is done
         */
        public changeThreadColor(color: string, threadID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * change the thread emoji to the one provided
         * @param emoji string containing a single emoji character
         * @param threadID thread id
         * @param callback callback called when the change is done
         */
        public changeThreadEmoji(emoji: string, threadID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * create a poll with the specified title and optional poll options
         * @param title title for the poll
         * @param threadID thread id
         * @param options optional string:bool dictionary to specify initial poll options and their states
         * @param callback callback called when the poll is posted
         */
        public createPoll(title: string, threadID: string, options: any, callback?: (err: Facebook.IError) => void): void;

        /**
         * create a poll with the specified title and optional poll options
         * @param title title for the poll
         * @param threadID thread id
         * @param callback callback called when the poll is posted
         */
        public createPoll(title: string, threadID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * deletes message or array of messages specified by their ids
         * @param messageOrMessages message id or array of ids
         * @param callback callback called when the query is done
         */
        public deleteMessage(messageOrMessages: string | Array<string>, callback?: (err: Facebook.IError) => void): void;

        /**
         * delete thread or threads from yuor account, this **does not** remove the messages from Facebook's servers
         * @param threadOrThreads thread id(s) you wish to remove from yuor account
         * @param callback callback called when the operation is done
         */
        public deleteThread(threadOrThreads: string | Array<string>, callback?: (err: Facebook.IError) => void): void;

        /**
         * forwards corresponding attachment to given user id or to every user from array of user ids
         * @param attachmentID id of attachment object, not all attachments have IDs: recorded audio and arbitrary files don't
         * @param user user id to forward attachment to
         * @param callback callback called when the query is done
         */
        public forwardAttachment(attachmentID: string, user: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * forwards corresponding attachment to given user id or to every user from array of user ids
         * @param attachmentID id of attachment object, not all attachments have IDs: recorded audio and arbitrary files don't
         * @param users user ids to forward attachment to
         * @param callback callback called when the query is done
         */
        public forwardAttachment(attachmentID: string, users: string[], callback?: (err: Facebook.IError) => void): void;


        /** returns current `appState` which can be saved to a file or stored in a variable */
        public getAppState(): any;

        /** returns the currently logged-in user's id */
        public getCurrentUserID(): string;

        /**
         * returns an array of objects with some information about your friends
         * @param callback callback called when the query is done
         */
        public getFriendsList(callback?: (err: Facebook.IError, arr: Array<Facebook.IUser>) => void): void;

        /**
         * get `amount` of messages from `threadID` starting from messages posted at `timestamp`
         * @param threadID thread is
         * @param amount amount of messages to request
         * @param timestamp used to descride the time of the most recent message to load
         * @param callback callback called when the query is done, if error is null, history will contain an array of message objects
         */
        public getThreadHistory(threadID: string, amount: number, timestamp: number, callback?: (err: Facebook.IError, history: Array<Facebook.IThreadHistoryMessage>) => void);

        /**
         * returns information about thread
         * @param threadID id of thread
         * @param callback if `err` is null, `info` will contain information about thread
         */
        public getThreadInfo(threadID: string, callback: (err: Facebook.IError, info: Facebook.IThreadInfo) => void): void;

        /**
         * returns information about threads
         * @param start start index in the list of recently used threads
         * @param end end index
         * @param type thread types
         * @param callback callback called when the query is done, either with an error or with an confirmation object
         */
        public getThreadList(start: number, end: number, type: 'inbox' | 'pending' | 'archived', callback: (err: Facebook.IError, arr: Array<Facebook.IThreadInfo>) => void): void;

        /**
         * returns pictures sent in the thread
         * @param threadID thread id
         * @param offset start index of picture to retrieve, where 0 is the most recent picture
         * @param limit number of pictures to get, incrementing from the offset index
         * @param callback callback called when the query is done, either with an error or with an confirmation object
         */
        public getThreadPictures(threadID: string, offset: number, limit: number, callback: (err: Facebook.IError, arr: Array<{ url: string, width: number, height: number }>) => void): void;

        /**
         * given the full name or vanity name of a Facebook user, event, page, group or app, the call will perform a Facebook Graph search and return all corresponding IDs
         * @param name the full name or vanity name of a Facebook user, event, page, group or app
         * @param callback called when the search is done
         */
        public getUserID(name: string, callback: (err: Facebook.IError, obj: Array<{ userID: string, photoUrl: string, indexRank: number, name: string, isVerified: boolean, profileUrl: string, category: string, score: number, type: 'user' | 'group' | 'page' | 'event' | 'app' }>) => void): void;

        /**
         * returns some information about the given users
         * @param ids user ids
         * @param callback callback called when the query is done
         */
        public getUserInfo(ids: string, callback: (err: Facebook.IError, obj: Facebook.IDictionary<IUserInfo>) => void): void;

        /**
         * returns some information about the given users
         * @param ids user id
         * @param callback callback called when the query is done
         */
        public getUserInfo(ids: string[], callback: (err: Facebook.IError, obj: Facebook.IDictionary<IUserInfo>) => void): void;

        /**
         * accept or ignore message request(s) with id `threadID`
         * @param threadID a threadID or array of threadIDs corresponding to the target thread(s)
         * @param accept the new status to assign to the message request(s), true for inbox, false otherwise
         * @param callback callback called when the query is done
         */
        public handleMessageRequest(threadID: string | Array<string>, accept: boolean, callback: (err: Facebook.IError) => void): void;

        /**
         * calls `callback` when a new message is received, by default this won't receive events but it can be activated with `api.setOptions`.
         * @returns stopListening that will stop the listen loop and is guaranteed to prevent any future calls to the callback given to listen.
         * @param callback callback called every time message/event is received
         */
        public listen(callback: (error: Facebook.IError, event: Facebook.IReceived) => void): () => void;

        /**
         * Same as api.listen but uses MQTT to recieve data.
         *
         * Will call callback when a new message is received on this account. By default this won't receive events (joining/leaving a chat, title change etc...) but it can be activated with api.setOptions({listenEvents: true}). This will by default ignore messages sent by the current account, you can enable listening to your own messages with api.setOptions({selfListen: true}). This returns stopListening that will stop the listen loop and is guaranteed to prevent any future calls to the callback given to listenMqtt. An immediate call to stopListening when an error occurs will prevent the listen function to continue.
         * @returns stopListening that will stop the listen loop and is guaranteed to prevent any future calls to the callback given to listen.
         * @param callback a callback called every time the logged-in account receives a new message
         */
        public listenMqtt(callback: (error: Facebook.IError, event: Facebook.IReceived) => void): () => void;

        /**
         * logs out the current user
         * @param callback callback called when the query is done
         */
        public logout(callback?: (err: Facebook.IError) => void): void;

        /**
         * marks all unread messages as read in thread
         * @param threadID id of the thread
         * @param callback callback called when the operation is done
         */
        public markAsRead(threadID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * mute a chat for a period of time (or unmute)
         * @param threadID thread id
         * @param muteSeconds mute the chat for this amout of seconds, use `0` to unmute a chat or `-1` to mute indefinitely
         * @param callback callback called when the operation is done
         */
        public muteThread(threadID: string, muteSeconds: number, callback?: (err: Facebook.IError) => void): void;

        /**
         * removes a user from a group chat
         * @param userID user id
         * @param threadID thread id
         * @param callback callback called when the query is done
         */
        public removeUserFromGroup(userID: string, threadID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * resolves the url to the full-size photo
         * @param photoID photo id
         * @param callback callback called when the query is done
         */
        public resolvePhotoUrl(photoID: string, callback: (err: Facebook.IError, url: string) => void): void;

        /**
         * sends the given message to the thread
         * @param message a string or a message object
         * @param threadID thread id(s)
         * @param callback callback called when sending the message is done
         * @param messageID messageID of the message being replied to
         */
        public sendMessage(message: string | Facebook.IMessage, threadID: string | Array<string>, callback?: (err: Facebook.IError, messageInfo: Facebook.IMessageInfo) => void, messageID?: string): void;

        /**
         * 
         * @param threadID thread id
         * @param callback callback called when the query is done
         * @returns `end` function that removes the *user is typing* indicator
         */
        public sendTypingIndicator(threadID: string, callback?: (err: Facebook.IError) => void): () => void;

        /**
         * sets reaction on message
         * @param reaction a string containing either an emoji, an emoji in unicode or an emoji shortcut
         * @param messageID message id
         * @param callback callback called when sending the reaction is done
         */
        public setMessageReaction(reaction: ':love:' | ':haha:' | ':wow:' | ':sad:' | ':angry:' | ':like:' | ':dislike:' | '', messageID: string, callback?: (err: Facebook.IError) => void): void;

        /**
         * sets various configurable options for the api
         * @param options an object containing the new values for the options that you want to set
         */
        public setOptions(options: Facebook.IOptions): void;

        /**
         * sets the title of the group chat with `threadID` to `newTitle`,
         * this will not work if the thread id corresponds to a single user chat 
         * or if the bot is not in the group chat
         * @param newTitle new title
         * @param threadID thread id
         * @param callback callback called when sending the message is done, either with an error or with an confirmation object
         */
        public setTitle(newTitle: string, threadID: string, callback?: (err: Facebook.IError, obj: { threadID: string }) => void): void;
    }
}

declare module "index.js"
{
    /**
     * allows the user to log into facebook given the right credentials,
     * if it succeeds, `callback` will be called with a `null` object and `api` object,
     * if it fails, `callback` will be called with an error object
     * @param credentials credentials used to log into facebook
     * @param callback callback that will be called after (successfull or not) login
     */
    function login(credentials: Facebook.ICredentials | Facebook.IAppStateCredentials, callback: (err: Facebook.ILoginError, api: Facebook.API) => void): void;

    /**
     * allows the user to log into facebook given the right credentials,
     * if it succeeds, `callback` will be called with a `null` object and `api` object,
     * if it fails, `callback` will be called with an error object
     * @param credentials credentials used to log into facebook
     * @param callback callback that will be called after (successfull or not) login
     */
    function login(credentials: Facebook.ICredentials | Facebook.IAppStateCredentials, options: Facebook.IOptions, callback: (err: Facebook.ILoginError, api: Facebook.API) => void): void;

    export = login;
}
