//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace pocAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class employee
    {
        public employee()
        {
            children = new List<employee>();
        }
        public int empNumber { get; set; }
        public string empName { get; set; }
        public string empSurname { get; set; }
        public System.DateTime empBirthDate { get; set; }
        public decimal empSalary { get; set; }
        public string empRoleDesc { get; set; }
        public Nullable<int> empReportLine { get; set; }

        public List<employee> children { get; set; }
    }
}
