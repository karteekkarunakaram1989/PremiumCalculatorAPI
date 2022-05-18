using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using PremiumCalculator.Controllers;
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
    public class PremiumCalculatorControllerTests : ControllerBase
    {
        protected Mock<ILogger<PremiumCalculatorController>> loggerMock;
        protected Mock<IPremiumCalculatorService> premiumCalculatorServiceServiceMock;
        protected PremiumCalculatorController sut;

        public PremiumCalculatorControllerTests()
        {
            loggerMock = new Mock<ILogger<PremiumCalculatorController>>();
            premiumCalculatorServiceServiceMock = new Mock<IPremiumCalculatorService>();
            sut = new PremiumCalculatorController(loggerMock.Object, premiumCalculatorServiceServiceMock.Object);
        }
    }

    #region Tests for GetAllCars Method

    public class PremiumCalculatorController_Get_Tests : PremiumCalculatorControllerTests
    {
        string age, occupationRating, sumInsured;
        CustomerDetails customerDetails;
        double calculatedPremium;
        public PremiumCalculatorController_Get_Tests()
        {
            age = "25";
            occupationRating = OccupationRating.Heavy_Manual;
            sumInsured = "20000";
            customerDetails = new CustomerDetails()
            {
                Age = 25,
                OccupationRating = OccupationRating.Heavy_Manual,
                SumInsured = 20000
            };
            calculatedPremium = 100;
            premiumCalculatorServiceServiceMock.Setup(p => p.CalculatePremium(It.IsAny<CustomerDetails>())).ReturnsAsync(calculatedPremium);
        }

        [Fact]
        public async Task Test_Calls_PremiumCalculatorServiceService_CalculatePremium()
        {
            //Arrange

            //Act
            await sut.Get(age, occupationRating, sumInsured);

            //Assert
            premiumCalculatorServiceServiceMock.Verify(p => p.CalculatePremium(It.IsAny<CustomerDetails>()), Times.Once());
        }

        [Fact]
        public async Task Test_Returns_ReturnsOkObjectResult()
        {
            //Arrange

            // Act
            var okResult = await sut.Get(age, occupationRating, sumInsured);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async Task Test_Returns_CalculatedPremium()
        {
            //Arrange

            //Act
            var result = await sut.Get(age, occupationRating, sumInsured);

            //Assert
            var actualResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.True(actualResult.Value.Equals(calculatedPremium));
        }

        [Fact]
        public async Task Test_Returns_StatusCode500_When_PremiumCalculatorServiceService_Throws_TimeoutException()
        {
            //Arrange
            string errorMessage = "Something went wrong.";
            var exception = new TimeoutException(errorMessage);
            premiumCalculatorServiceServiceMock.Setup(p => p.CalculatePremium(It.IsAny<CustomerDetails>())).ThrowsAsync(exception);
            var expectedResult = StatusCode(500, "Something went wrong in the server while calculating the premium.");

            //Act
            var result = await sut.Get(age, occupationRating, sumInsured);

            //Assert
            var actualResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(expectedResult.StatusCode, actualResult.StatusCode);
            Assert.Equal(expectedResult.Value, actualResult.Value);
        }
    }

    #endregion
}
