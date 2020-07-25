using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moviemarker.Models
{
    public class Subscriber
    {
        public string Name { get; set; }

        public Subscriber()
        {

        }

        public Subscriber(string name)
        {
            Name = name;
        }
    }
}
