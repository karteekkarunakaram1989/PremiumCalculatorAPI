using Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IPremiumCalculatorService
    {
        public Task<double> CalculatePremium(CustomerDetails customerDetails);
    }
}
