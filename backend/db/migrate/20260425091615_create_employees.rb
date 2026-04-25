class CreateEmployees < ActiveRecord::Migration[8.1]
  def change
    create_table :employees do |t|
      t.string  :full_name,       null: false
      t.string  :job_title,       null: false
      t.string  :country,         null: false
      t.decimal :salary,          null: false, precision: 10, scale: 2
      t.string  :department,      null: false
      t.string  :email,           null: false
      t.date    :hire_date,       null: false
      t.string  :employment_type, null: false, default: 'Full-time'

      t.timestamps
    end

    add_index :employees, :email, unique: true
  end
end
