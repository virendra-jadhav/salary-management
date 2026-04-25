class SalaryInsightsService
  def self.by_country(country)
    employees = Employee.where(country: country)

    {
      min: employees.minimum(:salary)&.to_f,
      max: employees.maximum(:salary)&.to_f,
      avg: employees.average(:salary)&.to_f || 0.0
    }
  end

  def self.by_job_title(country, job_title)
    Employee.where(country: country, job_title: job_title)
            .average(:salary)&.to_f || 0.0
  end
  def self.by_department(country)
       Employee.where(country: country)
            .group(:department)
            .average(:salary)
            .transform_values { |v| v.to_f }
  end
end