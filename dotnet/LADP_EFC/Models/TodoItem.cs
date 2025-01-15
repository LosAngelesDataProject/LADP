using System;
using System.Collections.Generic;

namespace LADP_EFC.Models
{
    public class TodoItem
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public bool IsComplete { get; set; }

        public string? SensitiveInfo { get; set; }
    }
}
