'use strict';

/**
 *  ArnoldAlexa - Lambda Code
 *
 *  Version 1.0.1 - 9/17/16 Copyright © 2016 Jason Choe
 * 
 *  Version 1.0.0 - Initial release
 *  Version 1.0.1 - New quotes added
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License. You may obtain a copy of the License at:
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License
 *  for the specific language governing permissions and limitations under the License.
 *
 */

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
            },
        },
        shouldEndSession,
    };
}
function buildSpeechletResponseAudio(title, output, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'SSML',
            ssml: output,
        },
        card: {
            type: 'Simple',
            title: `AudioSessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
            },
        },
        shouldEndSession,
    };
}
function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Whats up my master';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    /**const repromptText = 'Please tell me your favorite color by saying, ' +
        'my favorite color is red';
    */
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for trying the Alexa Skills Kit sample. Have a nice day!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createFavoriteColorAttributes(favoriteColor) {
    return {
        favoriteColor,
    };
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function setColorInSession(intent, session, callback) {
    const cardTitle = intent.name;
    const favoriteColorSlot = intent.slots.Color;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (favoriteColorSlot) {
        const favoriteColor = favoriteColorSlot.value;
        sessionAttributes = createFavoriteColorAttributes(favoriteColor);
        speechOutput = `I now know your favorite color is ${favoriteColor}. You can ask me ` +
            "your favorite color by saying, what's my favorite color?";
        repromptText = "You can ask me your favorite color by saying, what's my favorite color?";
    } else {
        speechOutput = "I'm not sure what your favorite color is. Please try again.";
        repromptText = "I'm not sure what your favorite color is. You can tell me your " +
            'favorite color by saying, my favorite color is red';
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getColorFromSession(intent, session, callback) {
    let favoriteColor;
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
    let speechOutput = '';

    if (session.attributes) {
        favoriteColor = session.attributes.favoriteColor;
    }
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}
function getArnoldQuote(intent, session, callback) {
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = true;
    let speechOutput = '';
    //speechOutput = `Jason is the answer.`;
    speechOutput = "<speak>Incoming Arnold quote."
                + "<audio src='https://www.choad.org/audio/whoisyourdaddy-alexa.mp3' />"
                + "</speak>";
    callback(sessionAttributes,
         buildSpeechletResponseAudio(intent.name, speechOutput, shouldEndSession));
}
function getTheBest(intent, session, callback) {
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = true;
    let speechOutput = '';
    speechOutput = `Jason is the answer.`;
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, shouldEndSession));
}
function getTheOneILove(intent, session, callback) {
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = true;
    let speechOutput = '';
    speechOutput = `Juju is your sweet baby love.`;
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, shouldEndSession));
}

function getFavNiece(intent, session, callback) {
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = true;
    let speechOutput = '';
    speechOutput = `Your favorite niece is Isabella Rebueno.`;
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, shouldEndSession));
}

function getFavNephew(intent, session, callback) {
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = true;
    let speechOutput = '';
    speechOutput = `Your favorite nephew is Jonah Rebueno.`;
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, shouldEndSession));
}

// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'MyColorIsIntent') {
        setColorInSession(intent, session, callback);
    } else if (intentName === 'WhatsMyColorIntent') {
        getColorFromSession(intent, session, callback);
    } else if (intentName === 'WhoIsMyFavNiece') {
        getFavNiece(intent, session, callback);
    } else if (intentName === 'WhoIsTheBest') {
        getTheBest(intent, session, callback);
    } else if (intentName === 'ArnoldQuote') {
        getArnoldQuote(intent, session, callback);
    } else if (intentName === 'WhoIsTheOneILove') {
        getTheOneILove(intent, session, callback);
    } else if (intentName === 'WhoIsMyFavNephew') {
        getFavNephew(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
