export const generatePayslip = (employee, attendance) => {
  const workingDays = attendance.filter((a) => a.status === "Present").length;
  const hoursWorked = workingDays * 8;
  const hourlyRate = employee.salary / 160;

  const grossSalary = hoursWorked * hourlyRate;
  const tax = grossSalary * 0.2;
  const netSalary = grossSalary - tax;

  return {
    employeeName: employee.name,
    position: employee.position,
    department: employee.department,
    period: `${attendance[0]?.date} - ${
      attendance[attendance.length - 1]?.date
    }`,
    workingDays,
    hoursWorked,
    grossSalary: grossSalary.toFixed(2),
    tax: tax.toFixed(2),
    netSalary: netSalary.toFixed(2),
  };
};
