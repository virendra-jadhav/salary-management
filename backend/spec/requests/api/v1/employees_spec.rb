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
    it "returns employees with meta" do
      Employee.create!(valid_attributes)

      get "/api/v1/employees"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json["employees"].length).to eq(1)
      expect(json["meta"]).to be_present
    end
  end

  # 🔥 NEW PAGINATION TEST
  describe "GET /index with pagination" do
    before do
      15.times do |i|
        Employee.create!(
          valid_attributes.merge(email: "user#{i}@test.com")
        )
      end
    end

    it "returns paginated employees" do
      get "/api/v1/employees", params: { page: 1, per_page: 10 }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json["employees"].length).to eq(10)
      expect(json["meta"]["total_count"]).to eq(15)
      expect(json["meta"]["current_page"]).to eq(1)
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