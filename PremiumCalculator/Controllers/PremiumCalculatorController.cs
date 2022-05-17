using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services;
using Services.Models;

namespace PremiumCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PremiumCalculatorController : ControllerBase
    {
        #region Properties

        private readonly ILogger<PremiumCalculatorController> _logger;
        private readonly IPremiumCalculatorService _premiumCalculatorService;

        #endregion

        #region Constructor

        public PremiumCalculatorController(ILogger<PremiumCalculatorController> logger, IPremiumCalculatorService premiumCalculatorService)
        {
            _logger = logger;
            _premiumCalculatorService = premiumCalculatorService;
        }

        #endregion

        [HttpGet]
        public async Task<ActionResult<double>> Get(string age, string occupationRating, string sumInsured)
        {
            try
            {
                var customerDetails = new CustomerDetails()
                {
                    Age = Convert.ToInt32(age),
                    OccupationRating = occupationRating,
                    SumInsured = Convert.ToDouble(sumInsured)
                };
                var calculatedPremium = await _premiumCalculatorService.CalculatePremium(customerDetails);
                return Ok(100);
            }
            catch (Exception ex)
            {
                // Logging to Default for now.
                _logger.LogError($"Something went wrong inside the CalculatePremium action: {ex}");
                return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong in the server while calculating the premium.");
            }
        }
    }
}
