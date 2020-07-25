using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moviemarker.Models
{
    public class Movie
    {

        public string Title { get; set; }
        public string Desc { get; set; }
        public string Rating { get; set; }

        public Movie()
        {

        }

        public Movie(string title, string desc, string rating)
        {
            Title = title;
            Desc = desc;
            Rating = rating;
        }
    }
}
