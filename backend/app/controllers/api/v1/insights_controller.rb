module Api
  module V1
    class InsightsController < ApplicationController

      # GET /api/v1/insights/country?country=India
      def country
        result = SalaryInsightsService.by_country(params[:country])
        render json: result
      end

      # GET /api/v1/insights/job_title?country=India&job_title=Engineer
      def job_title
        avg = SalaryInsightsService.by_job_title(params[:country], params[:job_title])
        render json: { avg: avg }
      end

      # GET /api/v1/insights/department?country=India
      def department
        result = SalaryInsightsService.by_department(params[:country])
        render json: result
      end
    end
  end
end