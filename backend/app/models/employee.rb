class Employee < ApplicationRecord
  EMPLOYMENT_TYPES = %w[Full-time Part-time Contract].freeze

  validates :full_name,  presence: true
  validates :job_title,  presence: true
  validates :country,    presence: true
  validates :salary,     presence: true, numericality: { greater_than: 0 }
  validates :department, presence: true
  validates :email,      presence: true,
                         uniqueness: true,
                         format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :hire_date,  presence: true
  validates :employment_type,
            inclusion: { in: EMPLOYMENT_TYPES }
end
