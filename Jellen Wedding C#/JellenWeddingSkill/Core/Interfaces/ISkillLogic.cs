using Alexa.NET.Request;
using JellenWeddingSkill.Core;

namespace JellenWeddingSkill.Interfaces
{
    public interface ISkillLogic
    {
        JellenSkillResponse GetWeddingDate(PersonType personType);
        JellenSkillResponse GetWeddingDateCountDown(PersonType personType);
        PersonType GetPersonType(Slot soltName);
    }
}