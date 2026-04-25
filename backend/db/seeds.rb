# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'securerandom'

puts "🌱 Seeding employees..."

# Load names
first_names = File.readlines(Rails.root.join('first_names.txt')).map(&:strip)
last_names  = File.readlines(Rails.root.join('last_names.txt')).map(&:strip)

countries = ["India", "USA", "UK"]
departments = ["Engineering", "HR", "Finance", "Sales"]
job_titles = ["Engineer", "Manager", "Analyst", "Designer"]
employment_types = ["Full-time", "Part-time", "Contract"]

data = []

10000.times do |i|
  first = first_names.sample
  last  = last_names.sample

  data << {
    full_name: "#{first} #{last}",
    job_title: job_titles.sample,
    country: countries.sample,
    salary: rand(30000..150000),
    department: departments.sample,
    email: "user#{i}_#{SecureRandom.hex(3)}@example.com", # ensures uniqueness
    hire_date: Date.today - rand(0..2000),
    employment_type: employment_types.sample,
    created_at: Time.now,
    updated_at: Time.now
  }
end

# Bulk insert (VERY IMPORTANT for performance)
Employee.insert_all(data)

puts "✅ Seeded #{Employee.count} employees successfully"
