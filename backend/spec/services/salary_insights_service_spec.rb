require 'rails_helper'

RSpec.describe SalaryInsightsService do
  let!(:emp1) do
    Employee.create!(
      full_name: "A",
      job_title: "Engineer",
      country: "India",
      salary: 100,
      department: "Engineering",
      email: "a@test.com",
      hire_date: Date.today,
      employment_type: "Full-time"
    )
  end

  let!(:emp2) do
    Employee.create!(
      full_name: "B",
      job_title: "Engineer",
      country: "India",
      salary: 200,
      department: "Engineering",
      email: "b@test.com",
      hire_date: Date.today,
      employment_type: "Full-time"
    )
  end

  it "calculates min, max, avg salary by country" do
    result = SalaryInsightsService.by_country("India")

    expect(result[:min]).to eq(100)
    expect(result[:max]).to eq(200)
    expect(result[:avg]).to eq(150.0)
  end

  it "returns 0 avg when no data" do
    result = SalaryInsightsService.by_country("USA")

    expect(result[:avg]).to eq(0.0)
  end

  it "calculates avg salary by job title" do
    result = SalaryInsightsService.by_job_title("India", "Engineer")

    expect(result).to eq(150.0)
  end
end