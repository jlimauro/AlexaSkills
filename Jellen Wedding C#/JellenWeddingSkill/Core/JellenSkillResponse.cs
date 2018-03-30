using Alexa.NET.Response;

namespace JellenWeddingSkill.Core
{
    public class JellenSkillResponse
    {
        private SsmlOutputSpeech _speech;
        public SsmlOutputSpeech Speech
        {
            get { return _speech;}
            set { _speech = value;}
        }

        private string _message;
        public string Message
        {
            get { return _message;}
            set { _message = value;}
        }

        public string SmallImageUrl { get; set; }
        public string LargeImageUrl { get; set; }        

        public JellenSkillResponse() 
        {
            _speech = new SsmlOutputSpeech();
        }   
    }
}