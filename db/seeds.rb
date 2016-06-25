# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

10.times do |i|
  Bench.create!(lat: 37.7 + rand(1000) / 10000.0,
                lng: -122.4 - rand(1000) / 10000.0,
                description: "this is bench number: #{i}!")
end
