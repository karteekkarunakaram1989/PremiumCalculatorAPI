using Services;
using Services.CommonData;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace PremiumCalculatorTests
{
    public class PremiumCalculatorServiceTests
    {
        protected PremiumCalculatorService sut;

        public PremiumCalculatorServiceTests()
        {
            sut = new PremiumCalculatorService();
        }
    }

    public class PremiumCalculatorService_CalculatePremium_Tests: PremiumCalculatorServiceTests
    {
        [Theory]
        [InlineData(25, OccupationRating.Heavy_Manual, 30000, 15750)]
        [InlineData(35, OccupationRating.Light_Manual, 40000, 25200)]
        [InlineData(45, OccupationRating.Professional, 50000, 27000)]
        [InlineData(55, OccupationRating.White_Collar, 60000, 49500)]
        public async Task Test_Output_PremiumCalculatorServiceService_CalculatePremium(int age, string occupationRating, double sumInsured, double expectedResult)
        {
            //Arrange
            var customerDetails = new CustomerDetails()
            {
                Age = age,
                OccupationRating = occupationRating,
                SumInsured = sumInsured
            };

            //Act
            var actualResult = await sut.CalculatePremium(customerDetails);

            //Assert
            Assert.Equal(expectedResult, actualResult);
        }

        [Fact]
        public async Task Test_PremiumCalculatorServiceService_CalculatePremium_Throws_Exception_For_Invalid_OccupationRating()
        {
            //Arrange
            var customerDetails = new CustomerDetails()
            {
                Age = 25,
                OccupationRating = "Test",
                SumInsured = 20000
            };

            //Act

            //Assert
            await Assert.ThrowsAsync<Exception>(async () => await sut.CalculatePremium(customerDetails));
        }
    }
}
