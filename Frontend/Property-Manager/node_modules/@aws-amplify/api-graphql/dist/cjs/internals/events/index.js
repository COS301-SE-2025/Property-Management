'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
exports.post = post;
exports.closeAll = closeAll;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const AWSAppSyncEventsProvider_1 = require("../../Providers/AWSAppSyncEventsProvider");
const appsyncRequest_1 = require("./appsyncRequest");
const utils_2 = require("./utils");
// Keeps a list of open channels in the websocket
const openChannels = new Set();
/**
 * @experimental API may change in future versions
 *
 * Establish a WebSocket connection to an Events channel
 *
 * @example
 * const channel = await events.connect("default/channel")
 *
 * channel.subscribe({
 *   next: (data) => { console.log(data) },
 *   error: (err) => { console.error(err) },
 * })
 *
 * @example // authMode override
 * const channel = await events.connect("default/channel", { authMode: "userPool" })
 *
 * @param channel - channel path; `<namespace>/<channel>`
 * @param options - request overrides: `authMode`, `authToken`
 *
 */
async function connect(channel, options) {
    const providerOptions = (0, utils_2.configure)();
    providerOptions.authenticationType = (0, utils_2.normalizeAuth)(options?.authMode, providerOptions.authenticationType);
    providerOptions.apiKey = options?.apiKey || providerOptions.apiKey;
    providerOptions.authToken = options?.authToken || providerOptions.authToken;
    await AWSAppSyncEventsProvider_1.AppSyncEventProvider.connect(providerOptions);
    const channelId = (0, utils_1.amplifyUuid)();
    openChannels.add(channelId);
    let _subscription;
    const sub = (observer, subOptions) => {
        if (!openChannels.has(channelId)) {
            throw new Error('Channel is closed');
        }
        const subscribeOptions = { ...providerOptions, query: channel };
        subscribeOptions.authenticationType = (0, utils_2.normalizeAuth)(subOptions?.authMode, subscribeOptions.authenticationType);
        subscribeOptions.apiKey = subOptions?.apiKey || subscribeOptions.apiKey;
        subscribeOptions.authToken =
            subOptions?.authToken || subscribeOptions.authToken;
        _subscription = AWSAppSyncEventsProvider_1.AppSyncEventProvider
            .subscribe(subscribeOptions)
            .subscribe(observer);
        return _subscription;
    };
    const pub = async (event, pubOptions) => {
        if (!openChannels.has(channelId)) {
            throw new Error('Channel is closed');
        }
        const publishOptions = {
            ...providerOptions,
            query: channel,
            variables: event,
        };
        publishOptions.authenticationType = (0, utils_2.normalizeAuth)(pubOptions?.authMode, publishOptions.authenticationType);
        publishOptions.apiKey = pubOptions?.apiKey || publishOptions.apiKey;
        publishOptions.authToken =
            pubOptions?.authToken || publishOptions.authToken;
        return AWSAppSyncEventsProvider_1.AppSyncEventProvider.publish(publishOptions);
    };
    const close = async () => {
        _subscription && _subscription.unsubscribe();
        openChannels.delete(channelId);
        setTimeout(() => {
            if (openChannels.size === 0) {
                AWSAppSyncEventsProvider_1.AppSyncEventProvider.closeIfNoActiveSubscription();
            }
        }, 1000);
    };
    return {
        subscribe: sub,
        close,
        publish: pub,
    };
}
/**
 * @experimental API may change in future versions
 *
 * Publish events to a channel via HTTP request
 *
 * @example
 * await events.post("default/channel", { some: "event" })
 *
 * @example // event batching
 * await events.post("default/channel", [{ some: "event" }, { some: "event2" }])
 *
 * @example // authMode override
 * await events.post("default/channel", { some: "event" }, { authMode: "userPool" })
 *
 * @param channel - channel path; `<namespace>/<channel>`
 * @param event - JSON-serializable value or an array of values
 * @param options - request overrides: `authMode`, `authToken`
 *
 * @returns void on success
 * @throws on error
 */
async function post(channel, event, options) {
    const providerOptions = (0, utils_2.configure)();
    providerOptions.authenticationType = (0, utils_2.normalizeAuth)(options?.authMode, providerOptions.authenticationType);
    providerOptions.apiKey = options?.apiKey || providerOptions.apiKey;
    providerOptions.authToken = options?.authToken || providerOptions.authToken;
    // trailing slash required in publish
    const normalizedChannelName = channel[0] === '/' ? channel : `/${channel}`;
    const publishOptions = {
        ...providerOptions,
        query: normalizedChannelName,
        variables: (0, utils_2.serializeEvents)(event),
    };
    const abortController = new AbortController();
    const res = await (0, appsyncRequest_1.appsyncRequest)(core_1.Amplify, publishOptions, {}, abortController);
    if (res.failed?.length > 0) {
        return res.failed;
    }
}
/**
 * @experimental API may change in future versions
 *
 * Close WebSocket connection, disconnect listeners and reconnect observers
 *
 * @example
 * await events.closeAll()
 *
 * @returns void on success
 * @throws on error
 */
async function closeAll() {
    await AWSAppSyncEventsProvider_1.AppSyncEventProvider.close();
}
//# sourceMappingURL=index.js.map
