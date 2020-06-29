# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#     t.string "address"
#     t.string "city"
#     t.string "state"
#     t.integer "zip"
#     t.date "date"
#     t.string "duration"
#     t.string "title"
#     t.text "description"
#     t.string "payment_type"
#     t.string "img"
#     t.integer "user_id"
users = [
    {
        email:"test2@test.com",
        password:"test222",
        password_confirmation:"test222"
    },
    {
        email:"test3@test.com",
        password:"test333",
        password_confirmation:"test333"
    }
]

users.each do |attributes|
    User.create(attributes)
end

a=User.first
b=User.second

sales = [
    {
        address:"123 Main St", 
        city:"San Diego", 
        state:"CA", 
        zip:"92101", 
        date:Date.new(2020,07,11), 
        duration:"9am-4pm", 
        title:"Selling Lots of Children's Clothes", 
        description:"My 8 children have all left the home and I want to sell off all the stuff they left behind. Come buy lots of clothes for ages 0-16 and some toys too.", 
        payment_type:"Cash only", 
        img:"https://img.thrfun.com/img/151/016/yard_sale_clothes_x3.jpg"
    },
    {
        address:"456 Other St", 
        city:"San Diego", 
        state:"CA", 
        zip:"92101", 
        date:Date.new(2020,07,14), 
        duration:"10am-11am", 
        title:"Appliances - brand new", 
        description:"Don't ask where I got them. They'll go fast. first come-first served.", 
        payment_type:"Paypal or Venmo", 
        img:"https://media1.s-nbcnews.com/j/streams/2012/April/120417/327563-biz-120417-GarageSales.fit-760w.jpg"
    }
]

sales.each do |attributes|
    a.sales.create(attributes)
end
