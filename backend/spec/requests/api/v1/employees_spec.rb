require 'rails_helper'

RSpec.describe "Api::V1::Employees", type: :request do
  let(:valid_attributes) do
    {
      full_name: "John Doe",
      job_title: "Engineer",
      country: "India",
      salary: 50000,
      department: "Engineering",
      email: "john@test.com",
      hire_date: Date.today,
      employment_type: "Full-time"
    }
  end

  describe "GET /index" do
    it "returns employees" do
      Employee.create!(valid_attributes)

      get "/api/v1/employees"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json.length).to eq(1)
    end
  end

  describe "GET /show" do
    it "returns employee" do
      emp = Employee.create!(valid_attributes)

      get "/api/v1/employees/#{emp.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json["id"]).to eq(emp.id)
    end
  end

  describe "POST /create" do
    it "creates employee" do
      expect {
        post "/api/v1/employees", params: { employee: valid_attributes }
      }.to change(Employee, :count).by(1)

      expect(response).to have_http_status(:created)
    end

    it "returns error for invalid data" do
      post "/api/v1/employees", params: { employee: valid_attributes.merge(email: nil) }

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "PUT /update" do
    it "updates employee" do
      emp = Employee.create!(valid_attributes)

      put "/api/v1/employees/#{emp.id}", params: {
        employee: { full_name: "Updated Name" }
      }

      expect(response).to have_http_status(:ok)
      expect(emp.reload.full_name).to eq("Updated Name")
    end
  end

  describe "DELETE /destroy" do
    it "deletes employee" do
      emp = Employee.create!(valid_attributes)

      expect {
        delete "/api/v1/employees/#{emp.id}"
      }.to change(Employee, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end