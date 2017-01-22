/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            WEDDING_DATE: 'July 26, 2018',
            SKILL_NAME: 'Wedding Date Info',
            GET_DATE_MESSAGE_SELF: "Your wedding date is: ",
            GET_DATE_MESSAGE: "Jeffrey and Ellen's wedding day is: ",
            COUNTDOWN_MESSAGEpStart: "There are: ",
            COUNTDOWN_MESSAGEpEnd_Self: " days before your wedding",
            COUNTDOWN_MESSAGEpEnd: " days before Jeffrey and Ellen's wedding",
            COUNTDOWN_MESSAGEsStart: "There is: ",
            COUNTDOWN_MESSAGEsEnd_Self: " day before your wedding",
            COUNTDOWN_MESSAGEsEnd: " day before Jeffrey and Ellen's wedding",
            TODAYISTHEDAY_MESSAGE_Self: "Today is your wedding day!",
            TODAYISTHEDAY_MESSAGE: "Today is Jeffrey and Ellen's wedding day!",
            HELP_MESSAGE: 'You can say when is my wedding date, or, you can say how long time my wedding, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

 var getDaysLeft = function(IsShana) {

        if (IsShana === true)
        {
            var weddingDate = new Date("07/14/2017");
            var currentDate = new Date();
            var timeDiff = weddingDate - currentDate;
            var diffDays = Math.round(timeDiff / (1000 * 60* 60 * 24));
            return diffDays;
        }
        else
        {
            var weddingDate = new Date("07/26/2018");
            var currentDate = new Date();
            var timeDiff = weddingDate - currentDate;
            var diffDays = Math.round(timeDiff / (1000 * 60* 60 * 24));
            return diffDays;
        }       
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetDate');
     },
     'GetWeddingDateIntentSelf': function() {
         this.emit('GetDateSelf');
     },
    'GetWeddingDateIntent': function () {
        this.emit('GetDate');
    },
    'GetDate': function () {
        // Gets wedding date
        // Use this.t() to get corresponding language data
        const weddingDate = this.t('WEDDING_DATE');

        // Create speech output
        const speechOutput = this.t('GET_DATE_MESSAGE') + weddingDate;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), weddingDate);
    },
    'GetDateSelf': function () {
        // Gets wedding date
        // Use this.t() to get corresponding language data
        const weddingDate = this.t('WEDDING_DATE');

        // Create speech output
        const speechOutput = this.t('GET_DATE_MESSAGE_SELF') + weddingDate;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), weddingDate);
    },
    'GetWeddingDateCountDownIntent': function () {
        this.emit('GetDateCountDown');
    },
     'GetWeddingDateCountDownIntentSelf': function () {
        this.emit('GetDateCountDownSelf');
    },
    'GetDateCountDown': function() {
        var diffDays = getDaysLeft(false);
        
        var speechOutput = "";
        if (diffDays > 1)
        {
            speechOutput = this.t('COUNTDOWN_MESSAGEpStart') + diffDays + this.t('COUNTDOWN_MESSAGEpEnd');
        }
        else if (diffDays == 1)
        {
            speechOutput = this.t('COUNTDOWN_MESSAGEsStart') + diffDays + this.t('COUNTDOWN_MESSAGEsEnd');
        }
        else
        {
            speechOutput = this.t('TODAYISTHEDAY_MESSAGE');
        }
        
        this.emit(':tell', speechOutput);
    },
    'GetDateCountDownSelf': function() {

        var diffDays = getDaysLeft(false);
        
        var speechOutput = "";
        if (diffDays > 1)
        {
            speechOutput = this.t('COUNTDOWN_MESSAGEpStart') + diffDays + this.t('COUNTDOWN_MESSAGEpEnd_Self');
        }
        else if (diffDays == 1)
        {
            speechOutput = this.t('COUNTDOWN_MESSAGEsStart') + diffDays + this.t('COUNTDOWN_MESSAGEsEnd_Self');
        }
        else
        {
            speechOutput = this.t('TODAYISTHEDAY_MESSAGE_Self');
        }
        
        this.emit(':tell', speechOutput);
    },
    'GetShanaWeddingDate': function() {
        this.emit('GetShanaDate');
    },
    'GetShanaDate': function() {
        var speechOutput = "Shana's wedding date is July 14, 2017";

        this.emit(':tell', speechOutput);
    },
    'GetDaysTilShanaWedding': function() {

         var diffDays = getDaysLeft(true);
        
        var speechOutput = "";

        if (diffDays > 1)
        {
            speechOutput = "There are: "+ diffDays + " days till Shana and David's wedding";
        }
        else if (diffDays == 1)
        {
            speechOutput = "There is: "+ diffDays + " day till Shana and David's wedding";
        }
        else
        {
            speechOutput = "Today is Shana and David's wedding!";
        }

        this.emit(':tell', speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
