require 'rails_helper'

RSpec.describe "Api::V1::Insights", type: :request do
  before do
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

  describe "GET /insights/country" do
    it "returns min, max, avg salary" do
      get "/api/v1/insights/country", params: { country: "India" }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json["min"]).to eq(100)
      expect(json["max"]).to eq(200)
      expect(json["avg"]).to eq(150.0)
    end
  end

  describe "GET /insights/job_title" do
    it "returns avg salary for job title" do
      get "/api/v1/insights/job_title", params: {
        country: "India",
        job_title: "Engineer"
      }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json["avg"]).to eq(150.0)
    end
  end

  describe "GET /insights/department" do
    it "returns avg salary by department" do
      get "/api/v1/insights/department", params: { country: "India" }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json["Engineering"]).to eq(150.0)
    end
  end
end