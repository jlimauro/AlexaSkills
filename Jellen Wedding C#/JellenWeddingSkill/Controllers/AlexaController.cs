using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Alexa.NET;
using Alexa.NET.Request;
using Alexa.NET.Request.Type;
using Alexa.NET.Response;
using JellenWeddingSkill.Core;
using JellenWeddingSkill.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace JellenWeddingSkill.Controllers
{
    [Produces("application/json")]
    [Route("api/Alexa")]
    public class AlexaController : Controller
    {
        private readonly IConfiguration _config;
        private readonly string _appid;
        private readonly ISkillLogic _jellenWedding;
        private JellenSkillResponse _skillResponse;

        public AlexaController(IConfiguration config, ISkillLogic JellenWeddingSkill)
        {
            _config = config;
            _jellenWedding = JellenWeddingSkill;
            _appid = _config.GetValue<string>("SkillApplicationId");
            _skillResponse = new JellenSkillResponse();
        }

        [HttpPost]
        public async Task<IActionResult> HandleSkillRequest([FromBody]SkillRequest alexaRequest)
        {
            // Security check   
            bool result = await CheckSecurityAsync(alexaRequest);

            if (!result)
                return BadRequest();

            var requestType = alexaRequest.GetRequestType();

            if (requestType == typeof(IntentRequest))
            {
                var response = await HandleIntentsAsync(alexaRequest);

                return Ok(response);
            }

            if (requestType == typeof(LaunchRequest))
            {
                _skillResponse = _jellenWedding.GetWeddingDateCountDown(PersonType.Self);
                SkillResponse finalResponse = ResponseBuilder.TellWithCard(_skillResponse.Speech, "Wedding Info", _skillResponse.Message);

                return Ok(finalResponse);
            }

            return Ok(ErrorResponse());
        }

        private async Task<bool> CheckSecurityAsync(SkillRequest alexaRequest)
        {
            if (alexaRequest.Session.Application.ApplicationId != _appid)
                return false;

            var totalSeconds = (DateTime.UtcNow - alexaRequest.Request.Timestamp).TotalSeconds;
            if(totalSeconds <=0 || totalSeconds > 150)
                return false;          

            return true;
        }

        /// <summary>
        /// Handles different intents of the Alexa skill.
        /// </summary>
        /// <param name="alexaRequest">current skill request</param>
        /// <returns></returns>
        private async Task<SkillResponse> HandleIntentsAsync(SkillRequest alexaRequest)
        {
            if (!(alexaRequest.Request is IntentRequest intentRequest))
                return ErrorResponse();

            // check the name to determine what you should do
            var intentName = intentRequest.Intent.Name;
            var soltName = intentRequest.Intent.Slots["Name"];
            PersonType person = _jellenWedding.GetPersonType(soltName);
            
            if ((intentName.Equals(Intents.GetWeddingDateCountDownIntent) || intentName.Equals(Intents.GetMarriageDateCountIntent)) && person != PersonType.Unknown)
            {
                _skillResponse = _jellenWedding.GetWeddingDateCountDown(person);

                // create the response using the ResponseBuilder
                SkillResponse finalResponse = ResponseBuilder.TellWithCard(_skillResponse.Speech, "Wedding Info", _skillResponse.Message);
                return finalResponse;
            }

            if (intentName.Equals(Intents.GetWeddingDateIntent) && person != PersonType.Unknown)
            {
                _skillResponse = _jellenWedding.GetWeddingDate(person);
                
                // create the response using the ResponseBuilder
                SkillResponse finalResponse = ResponseBuilder.TellWithCard(_skillResponse.Speech, "Wedding Info", _skillResponse.Message);
                return finalResponse;
            }

            return ErrorResponse();
        }

        /// <summary>
        /// Creates an error skill response.
        /// </summary>
        /// <returns></returns>
        private static SkillResponse ErrorResponse()
        {
            var speech = new SsmlOutputSpeech { Ssml = "<speak>An error has occurred, please try again.</speak>" };
            return ResponseBuilder.Tell(speech);
        }
    }
}
