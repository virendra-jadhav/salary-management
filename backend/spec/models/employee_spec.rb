require 'rails_helper'

RSpec.describe Employee, type: :model do
  let(:valid_attributes) do
    {
      full_name: "John Doe",
      job_title: "Engineer",
      country: "India",
      salary: 50000,
      department: "Engineering",
      email: "john@example.com",
      hire_date: Date.today,
      employment_type: "Full-time"
    }
  end

  it "is valid with valid attributes" do
    expect(Employee.new(valid_attributes)).to be_valid
  end

  it "is invalid without email" do
    emp = Employee.new(valid_attributes.merge(email: nil))
    expect(emp).not_to be_valid
  end

  it "is invalid with duplicate email" do
    Employee.create!(valid_attributes)
    emp = Employee.new(valid_attributes)
    expect(emp).not_to be_valid
  end

  it "is invalid with negative salary" do
    emp = Employee.new(valid_attributes.merge(salary: -10))
    expect(emp).not_to be_valid
  end

  it "is invalid with wrong employment_type" do
    emp = Employee.new(valid_attributes.merge(employment_type: "Intern"))
    expect(emp).not_to be_valid
  end
end