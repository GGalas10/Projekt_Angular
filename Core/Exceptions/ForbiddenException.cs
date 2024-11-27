﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Exceptions
{
    public class ForbiddenException : Exception
    {
        public ForbiddenException():base() { }
        public ForbiddenException(string message) : base(message) { }
    }
}
