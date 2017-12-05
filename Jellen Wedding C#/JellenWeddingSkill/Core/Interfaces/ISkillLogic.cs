using Alexa.NET.Request;
using JellenWeddingSkill.Core;

namespace JellenWeddingSkill.Interfaces
{
    public interface ISkillLogic
    {
        string GetWeddingDate(PersonType personType);
        string GetWeddingDateCountDown(PersonType personType);
        PersonType GetPersonType(Slot soltName);
    }
}