export const generatePayslip = (employee, attendance) => {
    const workingDays = attendance.filter((a) => a.status === "Present").length;
    const hoursWorked = workingDays * 8; // Assume 8 hours per day
    const hourlyRate = employee.salary / 160; // Assume 160 hours per month
  
    const grossSalary = hoursWorked * hourlyRate;
    const tax = grossSalary * 0.2; // 20% tax deduction
    const netSalary = grossSalary - tax;
  
    return {
      employeeName: employee.name,
      position: employee.position,
      department: employee.department,
      period: `${attendance[0]?.date} - ${attendance[attendance.length - 1]?.date}`,
      workingDays,
      hoursWorked,
      grossSalary: grossSalary.toFixed(2),
      tax: tax.toFixed(2),
      netSalary: netSalary.toFixed(2),
    };
  };
  