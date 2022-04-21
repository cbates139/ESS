using Newtonsoft.Json;

namespace Test.API.Helpers
{
    public static class VerifyHelper
    {
        public static bool AreEqualObjects(object expected, object actual)
        {
            var expectedJson = JsonConvert.SerializeObject(expected);
            var actualJson = JsonConvert.SerializeObject(actual);

            return expectedJson == actualJson;
        }
    }
}
