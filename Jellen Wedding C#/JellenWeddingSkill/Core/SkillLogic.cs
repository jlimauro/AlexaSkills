using System;
using Alexa.NET.Request;

namespace JellenWeddingSkill.Core
{
    public class SkillLogic : Interfaces.ISkillLogic
    {
        public JellenSkillResponse GetWeddingDate(PersonType personType)
        {
            JellenSkillResponse skillResponse = new JellenSkillResponse(); 

            switch (personType)
            {
                case PersonType.Jellen:
                    skillResponse.Message = $"Jeffrey and Ellen's wedding is on {WeddingData.JellenWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
                case PersonType.Alex:
                    skillResponse.Message = $"Alex and Heather's wedding was on {WeddingData.AlexWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
                case PersonType.Eric:
                    skillResponse.Message = $"Eric and Katie's wedding is on {WeddingData.EricWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
                case PersonType.Shana:
                    skillResponse.Message = $"Shana and David's wedding was on {WeddingData.ShanaWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
                default:
                    skillResponse.Message = $"Your wedding is on {WeddingData.JellenWeddingDate.ToString("MMM dd, yyyy")}";
                    break;
            }

            skillResponse.Speech.Ssml = $"<speak>{skillResponse.Message}</speak>";
            
            return skillResponse;
        }

        public JellenSkillResponse GetWeddingDateCountDown(PersonType personType)
        {
            JellenSkillResponse skillResponse = new JellenSkillResponse(); 
            TimeSpan timeSpan;

            switch (personType)
            {
                case PersonType.Jellen:
                    timeSpan = WeddingData.JellenWeddingDate - DateTime.Now;
                    if (timeSpan.Days > 1)
                        skillResponse.Message = $"There are {timeSpan.Days} days till Jeffrey and Ellen's wedding.";
                    else if (timeSpan.Days == 1)
                        skillResponse.Message = $"It's {timeSpan.Days} day till Jeffrey and Ellen's wedding.";
                    else if (timeSpan.Days == 0)
                        skillResponse.Message = $"Today is Jeffrey and Ellen's wedding.";
                    else
                        skillResponse.Message = $"Jeffrey and Ellen have been married for {timeSpan.Days} " + timeSpan.Days == "-1" ? "day." : "days.";
                    break;
                case PersonType.Eric:
                    timeSpan = WeddingData.EricWeddingDate - DateTime.Now;
                    if (timeSpan.Days > 1)
                        skillResponse.Message = $"There are {timeSpan.Days} days till Eric and Katie's wedding.";
                    else if (timeSpan.Days == 1)
                        skillResponse.Message = $"It's {timeSpan.Days} day till Eric and Katie's wedding.";
                    else if (timeSpan.Days == 0)
                        skillResponse.Message = $"Today is Eric and Katie's wedding.";
                    else
                        skillResponse.Message = $"Eric and Katie's have been married for {timeSpan.Days} " + timeSpan.Days == "-1" ? "day." : "days.";
                    break;
                case PersonType.Shana:
                    timeSpan = DateTime.Now - WeddingData.ShanaWeddingDate;
                    skillResponse.Message = $"Shana and David have been married for {timeSpan.Days} days.";
                    break;
                case PersonType.Alex:
                    timeSpan = DateTime.Now - WeddingData.AlexWeddingDate;
                    skillResponse.Message = $"Alex and Heather have been married for {timeSpan.Days} days.";
                    break;
                default:
                    timeSpan = WeddingData.JellenWeddingDate - DateTime.Now;
                    if (timeSpan.Days > 1)
                        skillResponse.Message = $"There are {timeSpan.Days} days till your wedding.";
                    else if (timeSpan.Days == 1)
                        skillResponse.Message = $"It's {timeSpan.Days} day till your wedding.";
                    else if (timeSpan.Days == 0)
                        skillResponse.Message = $"Today is your wedding.";
                    else
                        skillResponse.Message = $"You been married for {timeSpan.Days} " + timeSpan.Days == "-1" ? "day." : "days.";
                    break;
            }

            skillResponse.Speech.Ssml = $"<speak>{skillResponse.Message}</speak>";

            return skillResponse;
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