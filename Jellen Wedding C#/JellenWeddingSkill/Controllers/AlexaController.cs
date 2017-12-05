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

        public AlexaController(IConfiguration config, ISkillLogic JellenWeddingSkill)
        {
            _config = config;
            _jellenWedding = JellenWeddingSkill;
            _appid = _config.GetValue<string>("SkillApplicationId");
        }

        [HttpPost]
        public IActionResult HandleSkillRequest([FromBody]SkillRequest input)
        {
            // Security check
            if (input.Session.Application.ApplicationId != _appid)
                return BadRequest();

            var requestType = input.GetRequestType();

            if (requestType == typeof(IntentRequest))
            {
                var response = HandleIntentsAsync(input);

                return Ok(response);
            }

            if (requestType == typeof(LaunchRequest))
            {
                var launchResponse = _jellenWedding.GetWeddingDateCountDown(PersonType.Self);
                var speech = new SsmlOutputSpeech { Ssml = launchResponse };
                var finalResponse = ResponseBuilder.Tell(speech);

                return Ok(finalResponse);
            }

            return Ok(ErrorResponse());
        }

        /// <summary>
        /// Handles different intents of the Alexa skill.
        /// </summary>
        /// <param name="input">current skill request</param>
        /// <returns></returns>
        private SkillResponse HandleIntentsAsync(SkillRequest input)
        {
            if (!(input.Request is IntentRequest intentRequest))
                return ErrorResponse();

            var speech = new SsmlOutputSpeech();

            // check the name to determine what you should do
            var intentName = intentRequest.Intent.Name;
            var soltName = intentRequest.Intent.Slots["Name"];
            PersonType person = _jellenWedding.GetPersonType(soltName);
            
            if ((intentName.Equals(Intents.GetWeddingDateCountDownIntent) || intentName.Equals(Intents.GetMarriageDateCountIntent)) && person != PersonType.Unknown)
            {
                speech.Ssml = _jellenWedding.GetWeddingDateCountDown(person);

                // create the response using the ResponseBuilder
                var finalResponse = ResponseBuilder.Tell(speech);
                return finalResponse;
            }

            if (intentName.Equals(Intents.GetWeddingDateIntent) && person != PersonType.Unknown)
            {
                speech.Ssml = _jellenWedding.GetWeddingDate(person);
                // create the response using the ResponseBuilder
                var finalResponse = ResponseBuilder.Tell(speech);
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
