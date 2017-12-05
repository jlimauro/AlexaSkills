using System;
using Alexa.NET.Request;

namespace JellenWeddingSkill.Core
{
    public class SkillLogic : Interfaces.ISkillLogic
    {
        public string GetWeddingDate(PersonType personType)
        {
            string response = "";

            switch (personType)
            {
                case PersonType.Jellen:
                    response = $"Jeffrey and Ellen's wedding is on {WeddingData.JellenWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
                case PersonType.Alex:
                    response = $"Alex and Heather's wedding was on {WeddingData.AlexWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
                case PersonType.Eric:
                    response = $"Eric and Katie's wedding is on {WeddingData.EricWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
                case PersonType.Shana:
                    response = $"Shana and David's wedding was on {WeddingData.ShanaWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
                default:
                    response = $"Your wedding is on {WeddingData.JellenWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
            }

            return $"<speak>{response}</speak>";
        }

        public string GetWeddingDateCountDown(PersonType personType)
        {
            TimeSpan timeSpan;
            string response = "";

            switch (personType)
            {
                case PersonType.Jellen:
                    timeSpan = WeddingData.JellenWeddingDate - DateTime.Now;
                    if (timeSpan.Days > 1)
                        response = $"There are {timeSpan.Days} days til Jeffrey and Ellen's wedding.";
                    else if (timeSpan.Days == 1)
                        response = $"It's {timeSpan.Days} day til Jeffrey and Ellen's wedding.";
                    else if (timeSpan.Days == 0)
                        response = $"Today is Jeffrey and Ellen's wedding.";
                    else
                        response = $"Jeffrey and Ellen have been married for {timeSpan.Days} " + timeSpan.Days == "-1" ? "day." : "days.";
                    break;
                case PersonType.Eric:
                    timeSpan = WeddingData.EricWeddingDate - DateTime.Now;
                    if (timeSpan.Days > 1)
                        response = $"There are {timeSpan.Days} days til Eric and Katie's wedding.";
                    else if (timeSpan.Days == 1)
                        response = $"It's {timeSpan.Days} day til Eric and Katie's wedding.";
                    else if (timeSpan.Days == 0)
                        response = $"Today is Eric and Katie's wedding.";
                    else
                        response = $"Eric and Katie's have been married for {timeSpan.Days} " + timeSpan.Days == "-1" ? "day." : "days.";
                    break;
                case PersonType.Shana:
                    timeSpan = DateTime.Now - WeddingData.ShanaWeddingDate;
                    response = $"Shana and David have been married for {timeSpan.Days} days.";
                    break;
                case PersonType.Alex:
                    timeSpan = DateTime.Now - WeddingData.AlexWeddingDate;
                    response = $"Alex and Heather have been married for {timeSpan.Days} days.";
                    break;
                default:
                    timeSpan = WeddingData.JellenWeddingDate - DateTime.Now;
                    if (timeSpan.Days > 1)
                        response = $"There are {timeSpan.Days} days til your wedding.";
                    else if (timeSpan.Days == 1)
                        response = $"It's {timeSpan.Days} day til your wedding.";
                    else if (timeSpan.Days == 0)
                        response = $"Today is your wedding.";
                    else
                        response = $"You been married for {timeSpan.Days} " + timeSpan.Days == "-1" ? "day." : "days.";
                    break;
            }

            return $"<speak>{response}</speak>";
        }

        public PersonType GetPersonType(Slot soltName)
        {
            string name = soltName.Value.ToLower();

            if (name.Contains("shan") || name.Contains("dav"))
                return PersonType.Shana;

            if (name == "mine" || name == "me" || name == "my")
                return PersonType.Self;

            if (name.Contains("jeff") || name.Contains("ellen"))
                return PersonType.Jellen;

            if (name.Contains("alex") || name.Contains("heather"))
                return PersonType.Alex;

            if (name.Contains("eric") || name.Contains("katie"))
                return PersonType.Eric;
            else
                return PersonType.Unknown;
        }
    }
}