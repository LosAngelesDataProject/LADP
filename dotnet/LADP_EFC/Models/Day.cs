using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LADP_EFC.Models;
public class Day
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<BusinessHours> BusinessHours { get; set; } = []; // One-to-Many relationship with BusinessHours
}