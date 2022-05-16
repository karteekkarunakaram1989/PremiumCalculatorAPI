using System;
using System.Collections.Generic;
using System.Text;

namespace Services.CommonData
{
    public static class OccupationRating
    {
        public const string Professional = "Professional";
        public const string White_Collar = "White Collar";
        public const string Light_Manual = "Light Manual";
        public const string Heavy_Manual = "Heavy Manual";
    }

    public static class OccupationRatingFactor
    {
        public const double Professional = 1.0;
        public const double White_Collar = 1.25;
        public const double Light_Manual = 1.5;
        public const double Heavy_Manual = 1.75;
    }
}
