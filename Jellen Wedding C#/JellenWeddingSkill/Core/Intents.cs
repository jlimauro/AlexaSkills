namespace JellenWeddingSkill.Core
{
    public static class Intents
    {
       public const string GetWeddingDateIntent = "GetWeddingDateIntent";
       public const string GetWeddingDateCountDownIntent = "GetWeddingDateCountDownIntent";
       public const string GetMarriageDateCountIntent = "GetMarriageDateCountIntent";
    }

    public static class AmazonBaseIntents 
    {
        public const string AmazonHelpIntent = "AMAZON.HelpIntent";
        public const string AmazonStopIntent = "AMAZON.StopIntent";
        public const string AmazonCancelIntent = "AMAZON.CancelIntent";
    }
}