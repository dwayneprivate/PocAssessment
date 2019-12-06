using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pocAPI.Models;
using System.Dynamic;
using System.Web.Http.Cors;
using System.Text;

namespace pocAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmployeesController : ApiController
    {
        pocDBEntities db = new pocDBEntities();

        //Retrieve employee data from the database, send through as a json object
        [System.Web.Http.Route("API/Employees/RetrieveEmployees")]
        [HttpGet]
        public HttpResponseMessage RetrieveEmployees()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return RetrieveEmployeesReturn(db.employees.ToList());
        }

        public HttpResponseMessage RetrieveEmployeesReturn(List<employee> employees)
        {
            List<dynamic> EmployeeList = new List<dynamic>();
            foreach (employee emp in employees)
            {
                dynamic dyEmployees = new ExpandoObject();
                dyEmployees.empNumber = emp.empNumber;
                dyEmployees.empName = emp.empName;
                dyEmployees.empSurname = emp.empSurname;
                dyEmployees.empSalary = emp.empSalary;
                dyEmployees.empBirthDate = emp.empBirthDate;
                dyEmployees.empRoleDesc = emp.empRoleDesc;
                dyEmployees.empReportLine = emp.empReportLine;

                EmployeeList.Add(dyEmployees);
            }

            var response = Request.CreateResponse(HttpStatusCode.OK, EmployeeList);
            return response;
        }

        //Retrieve employee data from the database, send through as a json object
        [System.Web.Http.Route("API/Employees/RetrieveTreeView")]
        [HttpGet]
        public List<employee> RetrieveTreeView()
        {
            List<employee> emp = db.employees.ToList();

            Dictionary<int, employee> dict = emp.ToDictionary(e => e.empNumber);

            foreach (employee e in dict.Values)
            {
                if (e.empReportLine != e.empNumber && e.empReportLine > 0)
                {

                    employee parent = dict[(int)e.empReportLine];
                    parent.children.Add(e);
                }
            }
            List<employee> Managers = new List<employee>();
            foreach (employee e in dict.Values)
            {
                if (e.empReportLine == 0)
                {
                    Managers.Add(e);
                }
            }
            return Managers;

        }


    }
}
