namespace :elasticsearch do
  desc "Create elasticsearch index for students"
  task student_index: :environment do
    Student.inrefresh
  end

  desc "Delete all indexes from elasticsearch"
  task delete_all_index: :environment do
    puts "Delete all indexes..."
    [
      Student
    ].each do |class_name|
      puts "Delete #{class_name.index_name}..."
      system("curl -XDELETE '#{Rails.application.config.elastic_server}/#{class_name.index_name}'")
    end
  end

  desc "Refresh all indexes"
  task refresh_all: :environment do
    [
      "student_index"
    ].each do |task|
      puts "Refreshing #{task}..."
      Rake::Task["elasticsearch:" + task].invoke
    end
  end

  desc "Deletes and refreshes all indexes"
  task recreate_all: :environment do
    Rake::Task["elasticsearch:delete_all_index"].invoke
    Rake::Task["elasticsearch:refresh_all"].invoke
  end
end
