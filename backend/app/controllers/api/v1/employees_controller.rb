module Api
  module V1
    class EmployeesController < ApplicationController
      before_action :set_employee, only: [:show, :update, :destroy]

      # GET /api/v1/employees
      def index
        employees = Employee.all

         # 🔍 Search by full name (case-insensitive)
        if params[:name].present?
          employees = employees.where("LOWER(full_name) LIKE ?", "%#{params[:name].downcase}%")
        end

        # 🎯 Filters
        employees = employees.where(country: params[:country]) if params[:country].present?
        employees = employees.where(job_title: params[:job_title]) if params[:job_title].present?

        employees = employees.order(:full_name)

        page = (params[:page] || 1).to_i
        per_page = (params[:per_page] || 10).to_i

        paginated = employees.page(page).per(per_page)

        render json: {
          employees: paginated,
          meta: {
            current_page: paginated.current_page,
            total_pages: paginated.total_pages,
            total_count: paginated.total_count
          }
        }
      end

      # GET /api/v1/employees/:id
      def show
        render json: @employee
      end

      # POST /api/v1/employees
      def create
        employee = Employee.new(employee_params)

        if employee.save
          render json: employee, status: :created
        else
          render json: { errors: employee.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT /api/v1/employees/:id
      def update
        if @employee.update(employee_params)
          render json: @employee
        else
          render json: { errors: @employee.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/employees/:id
      def destroy
        @employee.destroy
        head :no_content
      end

      private

      def set_employee
        @employee = Employee.find(params[:id])
      end

      def employee_params
        params.require(:employee).permit(
          :full_name,
          :job_title,
          :country,
          :salary,
          :department,
          :email,
          :hire_date,
          :employment_type
        )
      end
    end
  end
end