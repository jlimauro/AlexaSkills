/**
Jeffrey Limauro 
LimauroDev Software

Alexa skill Jellen Wedding invocation wedding info
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
            ErrMessage: 'Please try again, I did not get that.'
        },
    },
};

var getDaysLeft = function(index) {

    var weddingDate;
    var currentDate;
    var timeDiff;
    var diffDays;

    if (index == 1) {
        weddingDate = new Date("July 14, 2017 16:00");
        currentDate = new Date();
        timeDiff = weddingDate - currentDate;
        diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        return diffDays;
    } else if (index == 2) {
        weddingDate = new Date("September 29, 2018 12:00");
        currentDate = new Date();
        timeDiff = weddingDate - currentDate;
        diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        return diffDays;
    } else {
        weddingDate = new Date("July 26, 2018 16:00");
        currentDate = new Date();
        timeDiff = weddingDate - currentDate;
        diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        return diffDays;
    }
};

var getDaysMarried = function(index) {

    var weddingDate;
    var currentDate;
    var timeDiff;
    var diffDays;

    if (index == 1) {
        weddingDate = new Date("July 14, 2017 16:00");
        currentDate = new Date();
        timeDiff = currentDate - weddingDate ;
        diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        return diffDays;
    } else if (index == 2) {
        weddingDate = new Date("September 29, 2018 12:00");
        currentDate = new Date();
        timeDiff = currentDate - weddingDate ;
        diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        return diffDays;
    } else if (index == 3) {
        weddingDate = new Date("July 26, 2018 16:00");
        currentDate = new Date();
        timeDiff = currentDate - weddingDate ;
        diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        return diffDays;
    } else {
        weddingDate = new Date("May 22, 2015 16:00");
        currentDate = new Date();
        timeDiff = currentDate - weddingDate ;
        diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        return diffDays;
    }
};

const handlers = {
    'LaunchRequest': function() {
        this.emit('GetMarriageDateCount', 'my');
    },
    'GetWeddingDateIntent': function() {

        var personSlot = this.event.request.intent.slots.Name;
        var personItem;
        if (personSlot && personSlot.value) {
            personItem = personSlot.value.toLowerCase();
        }
        this.emit('GetDate', personItem);
    },
    'GetWeddingDateCountDownIntent': function() {
        var personSlot = this.event.request.intent.slots.Name;
        var personItem;

        if (personSlot && personSlot.value) {
            personItem = personSlot.value.toLowerCase();
        }
        this.emit('GetDateCountDown', personItem);
    },
    'GetMarriageDateCountIntent': function() {
        var personSlot = this.event.request.intent.slots.Name;
        var personItem;

        if (personSlot && personSlot.value) {
            personItem = personSlot.value.toLowerCase();
        }
        this.emit('GetMarriageDateCount', personItem);
    },
    'AMAZON.HelpIntent': function() {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function() {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

var getDateHandlers = {
    'GetDate': function(personItem) {

        var speechOutput;
        // Gets wedding date
        // Use this.t() to get corresponding language data
        if (personItem !== null) {

            if (personItem === 'my'  || personItem === 'our') {
                const weddingDate = this.t('WEDDING_DATE');

                // Create speech output for self
                speechOutput = this.t('GET_DATE_MESSAGE_SELF') + weddingDate;
                this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), weddingDate);
            } else if (personItem.includes('jeff') || personItem.includes('ellen') || personItem.includes('jellen')) {
                const weddingDate = this.t('WEDDING_DATE');

                // Create speech output for Jeffrey and Ellen or Jellen
                speechOutput = this.t('GET_DATE_MESSAGE') + weddingDate;
                this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), weddingDate);
            } else if (personItem.includes('shan') || personItem.includes('david')) {
                // Create speech output for Shana and David
                speechOutput = "Shana and David's wedding date is July 14, 2017";
                this.emit(':tell', speechOutput);
            } else if (personItem.includes('eric') || personItem.includes('katie')) {
                // Create speech output for Shana and David
                speechOutput = "Eric and Katie's wedding date is September 29, 2018";
                this.emit(':tell', speechOutput);
            } else if (personItem.includes('heather') || personItem.includes('alex')) {
                 speechOutput = "Alex and Heather's wedding date was May 22nd, 2015";
                this.emit(':tell', speechOutput);
            } else {
                speechOutput = this.t('ErrMessage');
                this.emit(':tell', speechOutput);
            }
        } else {
            speechOutput = this.t('ErrMessage');
            this.emit(':tell', speechOutput);
        }
    },
    'GetDateCountDown': function(personItem) {

        var speechOutput;
        var diffDays;
        var daysMarried;

        if (personItem !== null) {
            if (personItem === 'my' || personItem === 'i' || personItem == 'me' || personItem == 'our') {

                diffDays = getDaysLeft(3);

                if (diffDays > 1) {
                    speechOutput = this.t('COUNTDOWN_MESSAGEpStart') + diffDays + this.t('COUNTDOWN_MESSAGEpEnd_Self');
                } else if (diffDays == 1) {
                    speechOutput = this.t('COUNTDOWN_MESSAGEsStart') + diffDays + this.t('COUNTDOWN_MESSAGEsEnd_Self');
                } else if (diffDays === 0) {
                    speechOutput = this.t('TODAYISTHEDAY_MESSAGE_Self');
                } else {
                    daysMarried = getDaysMarried(3);
                    
                    if (daysMarried == 1){
                        speechOutput = "You have been married for " + daysMarried + " day";
                    } else {
                        speechOutput = "You have been married for " + daysMarried + " days";
                    }                    
                }   

            } else if (personItem.includes('jeff') || personItem.includes('ellen') || personItem.includes('jellen')) {
                diffDays = getDaysLeft(3);

                if (diffDays > 1) {
                    speechOutput = this.t('COUNTDOWN_MESSAGEpStart') + diffDays + this.t('COUNTDOWN_MESSAGEpEnd');
                } else if (diffDays == 1) {
                    speechOutput = this.t('COUNTDOWN_MESSAGEsStart') + diffDays + this.t('COUNTDOWN_MESSAGEsEnd');
                } else if (diffDays === 0) {
                    speechOutput = this.t('TODAYISTHEDAY_MESSAGE');
                } else {
                    daysMarried = getDaysMarried(3);
                    
                    if (daysMarried == 1){
                        speechOutput = "Jeffrey and Ellen have been married for " + daysMarried + " day";
                    } else {
                        speechOutput = "Jeffrey and Ellen have been married for " + daysMarried + " days";
                    }                    
                }   
            } else if (personItem.includes('shan') || personItem.includes('david')) {

                diffDays = getDaysLeft(1);

                if (diffDays > 1) {
                    speechOutput = "There are: " + diffDays + " days till Shana and David's wedding";
                } else if (diffDays == 1) {
                    speechOutput = "There is: " + diffDays + " day till Shana and David's wedding";
                } else if (diffDays === 0) {
                    speechOutput = "Today is Shana and David's wedding!";
                } else {
                    daysMarried = getDaysMarried(1);
                    
                    if (daysMarried == 1){
                        speechOutput = "Shana and David have been married for " + daysMarried + " day";
                    } else {
                        speechOutput = "Shana and David have been married for " + daysMarried + " days";
                    }                    
                }                
            } else if (personItem.includes('eric') || personItem.includes('katie')) {

                diffDays = getDaysLeft(2);

                if (diffDays > 1) {
                    speechOutput = "There are: " + diffDays + " days till Eric and Katie's wedding";
                } else if (diffDays == 1) {
                    speechOutput = "There is: " + diffDays + " day till Eric and Katie's wedding";
                } else if (diffDays === 0) {
                    speechOutput = "Today is till Eric and Katie's wedding!";
                } else {
                    daysMarried = getDaysMarried(2);
                    
                    if (daysMarried == 1){
                        speechOutput = "Eric and Katie have been married for " + daysMarried + " day";
                    } else {
                        speechOutput = "Eric and Katie have been married for " + daysMarried + " days";
                    }                    
                }                
            } else {
                speechOutput = this.t('ErrMessage');
            }
        } else {
            speechOutput = this.t('ErrMessage');            
        }

        this.emit(':tell', speechOutput);
    },
    'GetMarriageDateCount': function(personItem) {

        var speechOutput;
        var daysMarried;

        if (personItem !== null) {
            if (personItem == 'my' || personItem == 'i' || personItem == 'me' || personItem == 'our') {
                
                daysMarried = getDaysMarried(3);
                   
                if (daysMarried < 0 || daysMarried === 0) {
                    this.emit('GetDateCountDown', 'my');
                } else if (daysMarried == 1){
                    speechOutput = "You have been married for " + daysMarried + " day";
                } else {
                    speechOutput = "You have been married for " + daysMarried + " days";
                }          
            } else if (personItem.includes('jeff') || personItem.includes('ellen') || personItem.includes('jellen')) {
                
                 daysMarried = getDaysMarried(3);

                if (daysMarried < 0 || daysMarried === 0) {
                    this.emit('GetDateCountDown', personItem);
                } else if (daysMarried == 1) {
                        speechOutput = "Jeffrey and Ellen have been married for " + daysMarried + " day";
                    } else {
                        speechOutput = "Jeffrey and Ellen have been married for " + daysMarried + " days";
                    }
                              
            } else if (personItem.includes('shan') || personItem.includes('david')) {

                daysMarried = getDaysMarried(1);
                    
                 if (daysMarried < 0 || daysMarried === 0) {
                    this.emit('GetDateCountDown', personItem);
                } else if (daysMarried == 1) {
                        speechOutput = "Shana and David have been married for " + daysMarried + " day";
                    } else {
                        speechOutput = "Shana and David have been married for " + daysMarried + " days";
                    }            
            } else if (personItem.includes('eric') || personItem.includes('katie')) {

                    daysMarried = getDaysMarried(2);

                     if (daysMarried < 0 || daysMarried === 0) {
                         this.emit('GetDateCountDown', personItem);
                    } else if (daysMarried == 1) {
                        speechOutput = "Eric and Katie have been married for " + daysMarried + " day";
                    } else {
                        speechOutput = "Eric and Katie have been married for " + daysMarried + " days";
                    }            
            } else if (personItem.includes('alex') || personItem.includes('heather')) {
                daysMarried = getDaysMarried(4);  
                speechOutput = "Alex and Heather have been married for " + daysMarried + " days";
            }  else {
                speechOutput = this.t('ErrMessage');
            }
        } else {
            speechOutput = this.t('ErrMessage');            
        }

        this.emit(':tell', speechOutput);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers, getDateHandlers);
    alexa.execute();
};