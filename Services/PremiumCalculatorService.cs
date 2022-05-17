using Services.CommonData;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PremiumCalculatorService : IPremiumCalculatorService
    {
        public async Task<double> CalculatePremium(CustomerDetails customerDetails)
        {
            var occupationRatingFactor = GetOccupationRatingFactor(customerDetails.OccupationRating);
            return customerDetails.SumInsured * occupationRatingFactor * customerDetails.Age / 1000 * 12;
        }

        private double GetOccupationRatingFactor(string occupationRating)
        {
            switch (occupationRating)
            {
                case OccupationRating.Professional: return OccupationRatingFactor.Professional;
                case OccupationRating.White_Collar: return OccupationRatingFactor.White_Collar;
                case OccupationRating.Light_Manual: return OccupationRatingFactor.Light_Manual;
                case OccupationRating.Heavy_Manual: return OccupationRatingFactor.Heavy_Manual;
                default: throw new Exception("Invalid Occupation Rating");
            }
        }
    }
}
